# blake2b_py
# Pure-Python reference implementation of BLAKE2b (based on the C reference)
# Author: ChatGPT (implementation)
# Not optimized for speed. For production use hashlib.blake2b

import struct
from typing import Optional

BLAKE2B_BLOCKBYTES = 128
BLAKE2B_OUTBYTES = 64
BLAKE2B_KEYBYTES = 64

_MASK64 = (1 << 64) - 1

# Initialization Vector
_blake2b_IV = [
    0x6a09e667f3bcc908, 0xbb67ae8584caa73b,
    0x3c6ef372fe94f82b, 0xa54ff53a5f1d36f1,
    0x510e527fade682d1, 0x9b05688c2b3e6c1f,
    0x1f83d9abfb41bd6b, 0x5be0cd19137e2179
]

# sigma permutation
_blake2b_sigma = [
    [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15],
    [14, 10,  4,  8,  9, 15, 13,  6,  1, 12,  0,  2, 11,  7,  5,  3],
    [11,  8, 12,  0,  5,  2, 15, 13, 10, 14,  3,  6,  7,  1,  9,  4],
    [ 7,  9,  3,  1, 13, 12, 11, 14,  2,  6,  5, 10,  4,  0, 15,  8],
    [ 9,  0,  5,  7,  2,  4, 10, 15, 14,  1, 11, 12,  6,  8,  3, 13],
    [ 2, 12,  6, 10,  0, 11,  8,  3,  4, 13,  7,  5, 15, 14,  1,  9],
    [12,  5,  1, 15, 14, 13,  4, 10,  0,  7,  6,  3,  9,  2,  8, 11],
    [13, 11,  7, 14, 12,  1,  3,  9,  5,  0, 15,  4,  8,  6,  2, 10],
    [ 6, 15, 14,  9, 11,  3,  0,  8, 12,  2, 13,  7,  1,  4, 10,  5],
    [10,  2,  8,  4,  7,  6,  1,  5, 15, 11,  9, 14,  3, 12, 13,  0],
    [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15],
    [14, 10,  4,  8,  9, 15, 13,  6,  1, 12,  0,  2, 11,  7,  5,  3]
]

def _rotr64(x: int, n: int) -> int:
    return ((x >> n) | ((x << (64 - n)) & _MASK64)) & _MASK64

def _load64(b: bytes, offset: int = 0) -> int:
    # little-endian 8 bytes -> uint64
    return struct.unpack_from('<Q', b, offset)[0]

def _store64(x: int) -> bytes:
    return struct.pack('<Q', x & _MASK64)

def _xor_iv_with_param(h: list, param_bytes: bytes):
    # param_bytes length must be 64 (8 * 8)
    for i in range(8):
        v = _load64(param_bytes, i * 8)
        h[i] ^= v

class Blake2b:
    def __init__(self, outlen: int = 64, key: Optional[bytes] = None):
        if outlen <= 0 or outlen > BLAKE2B_OUTBYTES:
            raise ValueError("outlen must be between 1 and 64")
        if key is not None and (len(key) == 0 or len(key) > BLAKE2B_KEYBYTES):
            raise ValueError("invalid key length")

        self.outlen = outlen
        self.h = list(_blake2b_IV)  # copy IV
        self.t0 = 0  # low 64-bit counter
        self.t1 = 0  # high 64-bit counter (carry)
        self.f0 = 0  # finalization flag low
        self.f1 = 0  # finalization flag high
        self.buf = bytearray(BLAKE2B_BLOCKBYTES)
        self.buflen = 0
        self.last_node = False

        # Build parameter block P (64 bytes) like the reference
        P = bytearray(64)
        P[0] = outlen & 0xff               # digest_length
        P[1] = len(key) if key else 0      # key_length
        P[2] = 1                           # fanout
        P[3] = 1                           # depth
        # leaf_length, node_offset, xof_length set to 0 (already zeroed)
        # node_depth, inner_length zero
        # reserved, salt, personal remain zero

        # XOR IV with param block
        _xor_iv_with_param(self.h, bytes(P))

        # keyed mode: if key, we must feed a single block with key padded with zeros
        if key:
            block = bytearray(BLAKE2B_BLOCKBYTES)
            block[0:len(key)] = key
            self.update(bytes(block))
            # zero out block for safety
            for i in range(len(block)):
                block[i] = 0

    # helpers to set flags and counter
    def _set_lastnode(self):
        self.f1 = _MASK64

    def _is_lastblock(self):
        return self.f0 != 0

    def _set_lastblock(self):
        if self.last_node:
            self._set_lastnode()
        self.f0 = _MASK64

    def _increment_counter(self, inc: int):
        self.t0 = (self.t0 + inc) & _MASK64
        if self.t0 < inc:
            self.t1 = (self.t1 + 1) & _MASK64

    def _compress(self, block: bytes):
        # block must be 128 bytes
        m = [0] * 16
        v = [0] * 16
        for i in range(16):
            m[i] = _load64(block, i*8)

        for i in range(8):
            v[i] = self.h[i]
        v[8]  = _blake2b_IV[0]
        v[9]  = _blake2b_IV[1]
        v[10] = _blake2b_IV[2]
        v[11] = _blake2b_IV[3]
        v[12] = _blake2b_IV[4] ^ self.t0
        v[13] = _blake2b_IV[5] ^ self.t1
        v[14] = _blake2b_IV[6] ^ self.f0
        v[15] = _blake2b_IV[7] ^ self.f1

        def G(r, i, a_idx, b_idx, c_idx, d_idx):
            a = v[a_idx]; b = v[b_idx]; c = v[c_idx]; d = v[d_idx]
            a = (a + b + m[_blake2b_sigma[r][2*i+0]]) & _MASK64
            d = _rotr64(d ^ a, 32)
            c = (c + d) & _MASK64
            b = _rotr64(b ^ c, 24)
            a = (a + b + m[_blake2b_sigma[r][2*i+1]]) & _MASK64
            d = _rotr64(d ^ a, 16)
            c = (c + d) & _MASK64
            b = _rotr64(b ^ c, 63)
            v[a_idx] = a; v[b_idx] = b; v[c_idx] = c; v[d_idx] = d

        def ROUND(r):
            G(r,0, 0, 4, 8,12)
            G(r,1, 1, 5, 9,13)
            G(r,2, 2, 6,10,14)
            G(r,3, 3, 7,11,15)
            G(r,4, 0, 5,10,15)
            G(r,5, 1, 6,11,12)
            G(r,6, 2, 7, 8,13)
            G(r,7, 3, 4, 9,14)

        for r in range(12):
            ROUND(r)

        for i in range(8):
            self.h[i] = (self.h[i] ^ v[i] ^ v[i+8]) & _MASK64

    def update(self, data: bytes):
        if not data:
            return
        i = 0
        inlen = len(data)
        while inlen > 0:
            left = self.buflen
            fill = BLAKE2B_BLOCKBYTES - left
            if inlen > fill:
                # fill and compress
                self.buf[left:left+fill] = data[i:i+fill]
                self._increment_counter(BLAKE2B_BLOCKBYTES)
                self._compress(bytes(self.buf))
                self.buflen = 0
                i += fill
                inlen -= fill
                # compress full blocks directly from input
                while inlen > BLAKE2B_BLOCKBYTES:
                    self._increment_counter(BLAKE2B_BLOCKBYTES)
                    self._compress(data[i:i+BLAKE2B_BLOCKBYTES])
                    i += BLAKE2B_BLOCKBYTES
                    inlen -= BLAKE2B_BLOCKBYTES
            else:
                # not enough to fill block
                self.buf[left:left+inlen] = data[i:i+inlen]
                self.buflen += inlen
                i += inlen
                inlen = 0

    def final(self) -> bytes:
        if self._is_lastblock():
            raise ValueError("final() called more than once")

        # increment counter with remaining bytes
        self._increment_counter(self.buflen)
        self._set_lastblock()
        # pad buffer with zeros
        if self.buflen < BLAKE2B_BLOCKBYTES:
            self.buf[self.buflen:BLAKE2B_BLOCKBYTES] = b'\x00' * (BLAKE2B_BLOCKBYTES - self.buflen)
        self._compress(bytes(self.buf))

        # produce output (little-endian of h)
        out = bytearray()
        for v in self.h:
            out += _store64(v)
        # zero the large temp buffer for safety
        result = bytes(out[:self.outlen])
        # attempt to securely zero internal buffers (best-effort in Python)
        for i in range(len(self.buf)):
            self.buf[i] = 0
        return result

# Convenience single-shot function like reference: blake2b(out, outlen, in, inlen, key, keylen)
def blake2b(data: bytes, outlen: int = 64, key: Optional[bytes] = None) -> bytes:
    ctx = Blake2b(outlen=outlen, key=key)
    ctx.update(data)
    return ctx.final()

# Short helper to return hex digest
def blake2b_hex(data: bytes, outlen: int = 64, key: Optional[bytes] = None) -> str:
    return blake2b(data, outlen, key).hex()

# Example usage:
if __name__ == "__main__":
    # Running quick check against Python's hashlib (if available)
    try:
        import hashlib
        print("Reference blake2b (this implementation):", blake2b_hex(b"abc", 64))
        print("hashlib.blake2b:", hashlib.blake2b(b"abc", digest_size=64).hexdigest())
    except Exception:
        print("No hashlib check available. Example digest (this impl):", blake2b_hex(b"abc", 64))


