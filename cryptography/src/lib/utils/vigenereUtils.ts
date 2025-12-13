/**
 * Shared Vigenere Cipher utilities
 * Used by both Algorithms visualizer and Cryptanalysis components
 * 
 * Rules:
 * - Alphabet: A-Z only (A=0, B=1, ..., Z=25)
 * - Encrypt: (P + K) mod 26
 * - Decrypt: (C - K + 26) mod 26
 * - Key advances only for alphabet characters
 * - Non-alphabet characters remain unchanged and don't advance key
 */

/**
 * Encrypts text using Vigenere cipher
 * @param text - Plaintext to encrypt
 * @param key - Encryption key (letters only, case-insensitive)
 * @returns Encrypted text with preserved case
 */
export function encryptVigenere(text: string, key: string = 'KEY'): string {
  // Convert key to uppercase and validate - reject non-alphabet characters
  const keyUpper = key.toUpperCase();
  if (!/^[A-Za-z]+$/.test(key)) {
    throw new Error("Key must contain letters only");
  }
  return encryptVigenereCasePreserving(text, keyUpper);
}

/**
 * Encrypts text preserving original case
 */
function encryptVigenereCasePreserving(plain: string, key: string): string {
  let result = "";
  let keyIndex = 0;

  for (let ch of plain) {
    // Non-alphabet characters: output as-is, do NOT advance key
    if (!/[A-Za-z]/.test(ch)) {
      result += ch;
      continue;
    }
    
    // Alphabet character: encrypt and advance key
    const p = ch.toUpperCase().charCodeAt(0) - 65; // A=0, B=1, ..., Z=25
    const k = key[keyIndex % key.length].charCodeAt(0) - 65;
    const c = (p + k) % 26; // Encrypt: (P + K) mod 26

    let newChar = String.fromCharCode(c + 65);
    // Preserve original case
    if (ch === ch.toLowerCase()) newChar = newChar.toLowerCase();

    result += newChar;
    keyIndex++; // Advance key only for alphabet characters
  }
  return result;
}

/**
 * Decrypts text using Vigenere cipher
 * @param text - Ciphertext to decrypt
 * @param key - Decryption key (letters only, case-insensitive)
 * @returns Decrypted text with preserved case
 */
export function decryptVigenere(text: string, key: string = 'KEY'): string {
  // Convert key to uppercase and validate - reject non-alphabet characters
  const keyUpper = key.toUpperCase();
  if (!/^[A-Za-z]+$/.test(key)) {
    throw new Error("Key must contain letters only");
  }
  return decryptVigenereCasePreserving(text, keyUpper);
}

/**
 * Decrypts text preserving original case
 */
function decryptVigenereCasePreserving(cipher: string, key: string): string {
  let result = "";
  let keyIndex = 0;

  for (let ch of cipher) {
    // Non-alphabet characters: output as-is, do NOT advance key
    if (!/[A-Za-z]/.test(ch)) {
      result += ch;
      continue;
    }
    
    // Alphabet character: decrypt and advance key
    const c = ch.toUpperCase().charCodeAt(0) - 65; // A=0, B=1, ..., Z=25
    const k = key[keyIndex % key.length].charCodeAt(0) - 65;
    const p = (c - k + 26) % 26; // Decrypt: (C - K + 26) mod 26

    let newChar = String.fromCharCode(p + 65);
    // Preserve original case
    if (ch === ch.toLowerCase()) newChar = newChar.toLowerCase();

    result += newChar;
    keyIndex++; // Advance key only for alphabet characters
  }
  return result;
}

