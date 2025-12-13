export function clean(text: string): string {
  return (text || "").toLowerCase().replace(/[^a-z]/g, "");
}

export function charToNum(c: string): number {
  return c.charCodeAt(0) - 97; // a=97
}

export function numToChar(n: number): string {
  return String.fromCharCode(((n % 26) + 26) % 26 + 97);
}

export function vigenereEncrypt(plain: string, key: string): string {
  const p = clean(plain);
  const k = clean(key);
  let out = "";
  for (let i = 0; i < p.length; i++) {
    out += numToChar(charToNum(p[i]) + charToNum(k[i % k.length]));
  }
  return out;
}

export function vigenereDecrypt(cipher: string, key: string): string {
  const c = clean(cipher);
  const k = clean(key);
  let out = "";
  for (let i = 0; i < c.length; i++) {
    out += numToChar(charToNum(c[i]) - charToNum(k[i % k.length]));
  }
  return out;
}
