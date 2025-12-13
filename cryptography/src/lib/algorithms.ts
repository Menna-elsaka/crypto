// Encryption algorithm implementations and data
import { encryptVigenere, decryptVigenere } from './utils/vigenereUtils';

export interface Algorithm {
  id: string;
  name: string;
  description: string;
  speed: number; // 1-10
  security: number; // 1-10
  easeOfUse: number; // 1-10
  type: 'symmetric' | 'asymmetric' | 'hash';
  resources: {
    documentation: string;
    papers: { title: string; url: string }[];
    tutorials: { title: string; url: string }[];
  };
}

export const algorithms: Algorithm[] = [
  {
    id: 'blake2b',
    name: 'BLAKE2b',
    description: 'A cryptographic hash function faster than MD5, SHA-1, SHA-2, and SHA-3, yet is at least as secure as the latest standard SHA-3.',
    speed: 10,
    security: 9,
    easeOfUse: 8,
    type: 'hash',
    resources: {
      documentation: 'https://www.blake2.net/',
      papers: [
        { 
          title: 'BLAKE2 — simpler, smaller, fast as MD5', 
          url: 'https://www.blake2.net/blake2.pdf' 
        },
        { 
          title: 'Cryptographic Hash Function Standards (NIST)', 
          url: 'https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf' 
        }
      ],
      tutorials: [
        { 
          title: 'Introduction to BLAKE2 Hash Function', 
          url: 'https://youtu.be/uey_HFs-oVs?si=VnAGnz8nCuFJZ6_k' 
        },
        { 
          title: 'Implementing BLAKE2 in Practice', 
          url: 'https://www.blake2.net/' 
        },
        { 
          title: 'BLAKE2 Performance Analysis', 
          url: 'https://en.wikipedia.org/wiki/BLAKE_(hash_function)' 
        }
      ]
    }
  },
  {
    id: 'caesar',
    name: 'Caesar Cipher',
    description: 'One of the simplest and most widely known encryption techniques. A substitution cipher where each letter is shifted by a fixed number of positions in the alphabet.',
    speed: 10,
    security: 2,
    easeOfUse: 10,
    type: 'symmetric',
    resources: {
      documentation: 'https://en.wikipedia.org/wiki/Caesar_cipher',
      papers: [
        { 
          title: 'Classical Cryptography Methods', 
          url: 'https://www.researchgate.net/publication/282870600_Classical_Cryptography' 
        },
        { 
          title: 'History of Ancient Ciphers', 
          url: 'https://en.wikipedia.org/wiki/History_of_cryptography' 
        }
      ],
      tutorials: [
        { 
          title: 'Understanding Caesar Cipher - Video Tutorial', 
          url: 'https://youtu.be/DdGyJjMb0i8?si=NK-3QhTsd6QwONIi' 
        },
        { 
          title: 'Breaking Caesar Cipher', 
          url: 'https://crypto.interactive-maths.com/caesar-shift-cipher.html' 
        },
        { 
          title: 'Caesar Cipher Implementation Guide', 
          url: 'https://www.geeksforgeeks.org/caesar-cipher-in-cryptography/' 
        }
      ]
    }
  },
  {
    id: 'vigenere',
    name: 'Vigenère Cipher',
    description: 'A polyalphabetic substitution cipher that uses a keyword to shift letters by different amounts. More secure than Caesar cipher as it resists frequency analysis.',
    speed: 9,
    security: 4,
    easeOfUse: 8,
    type: 'symmetric',
    resources: {
      documentation: 'https://en.wikipedia.org/wiki/Vigenère_cipher',
      papers: [
        { 
          title: 'The Vigenère Cipher: A Historical Perspective', 
          url: 'https://www.tandfonline.com/doi/abs/10.1080/01611194.2018.1549452' 
        },
        { 
          title: 'Breaking Polyalphabetic Ciphers', 
          url: 'https://www.dcode.fr/vigenere-cipher' 
        }
      ],
      tutorials: [
        { 
          title: 'How Vigenère Cipher Works - Video', 
          url: 'https://youtu.be/bBnRIt-cWUw?si=5uU7jFgCzVTnAD2M' 
        },
        { 
          title: 'Kasiski Examination Method', 
          url: 'https://pages.mtu.edu/~shene/NSF-4/Tutorial/VIG/Vig-Kasiski.html' 
        },
        { 
          title: 'Implementing Vigenère Cipher', 
          url: 'https://www.geeksforgeeks.org/vigenere-cipher/' 
        }
      ]
    }
  },
  {
    id: 'stream',
    name: 'Stream Cipher',
    description: 'A symmetric key cipher where plaintext digits are combined with a pseudorandom cipher digit stream (keystream). Encrypts data one bit or byte at a time.',
    speed: 10,
    security: 8,
    easeOfUse: 7,
    type: 'symmetric',
    resources: {
      documentation: 'https://en.wikipedia.org/wiki/Stream_cipher',
      papers: [
        { 
          title: 'Stream Ciphers: Theory and Practice', 
          url: 'https://www.springer.com/gp/book/9783540001881' 
        },
        { 
          title: 'Modern Stream Cipher Design', 
          url: 'https://csrc.nist.gov/projects/block-cipher-techniques/bcm/modes-development' 
        }
      ],
      tutorials: [
        { 
          title: 'Introduction to Stream Ciphers', 
          url: 'https://www.tutorialspoint.com/cryptography/stream_ciphers.htm' 
        },
        { 
          title: 'RC4 Stream Cipher Explained', 
          url: 'https://www.youtube.com/watch?v=GSIDS_lvRv4' 
        },
        { 
          title: 'Stream vs Block Ciphers', 
          url: 'https://www.khanacademy.org/computing/computer-science/cryptography/ciphers/a/stream-ciphers' 
        }
      ]
    }
  },
  {
    id: 'hill',
    name: 'Hill Cipher',
    description: 'A polygraphic substitution cipher based on linear algebra. Uses matrix multiplication to encrypt blocks of letters, making it resistant to frequency analysis.',
    speed: 7,
    security: 5,
    easeOfUse: 5,
    type: 'symmetric',
    resources: {
      documentation: 'https://en.wikipedia.org/wiki/Hill_cipher',
      papers: [
        { 
          title: 'The Hill Cipher: A Linear Algebra Approach', 
          url: 'https://www.sciencedirect.com/topics/computer-science/hill-cipher' 
        },
        { 
          title: 'Matrix-Based Cryptography', 
          url: 'https://www.researchgate.net/publication/220620309_Matrix_Cryptography' 
        }
      ],
      tutorials: [
        { 
          title: 'Understanding Hill Cipher - Video', 
          url: 'https://youtu.be/kzRvGceSO2E?si=YcluauDboj8B8rM6' 
        },
        { 
          title: 'Matrix Operations in Cryptography', 
          url: 'https://crypto.stanford.edu/pbc/notes/crypto/hill.html' 
        },
        { 
          title: 'Hill Cipher Implementation Guide', 
          url: 'https://www.geeksforgeeks.org/hill-cipher/' 
        }
      ]
    }
  },
  {
    id: 'otp',
    name: 'One-Time Pad (OTP)',
    description: 'The only mathematically unbreakable cipher. Uses a random key that is at least as long as the message and is used only once. Perfect secrecy when used correctly.',
    speed: 8,
    security: 10,
    easeOfUse: 6,
    type: 'symmetric',
    resources: {
      documentation: 'https://en.wikipedia.org/wiki/One-time_pad',
      papers: [
        { 
          title: 'Shannon\'s Theory of Perfect Secrecy', 
          url: 'https://ieeexplore.ieee.org/document/6769090' 
        },
        { 
          title: 'One-Time Pad: Theory and Practice', 
          url: 'https://www.cs.miami.edu/home/burt/learning/Csc688.012/docs/onetimepad.pdf' 
        }
      ],
      tutorials: [
        { 
          title: 'Understanding One-Time Pad - Video', 
          url: 'https://youtu.be/kDr-vLAwWOM?si=LTu0N-KLC7s_n6DL' 
        },
        { 
          title: 'Perfect Secrecy Explained', 
          url: 'https://www.khanacademy.org/computing/computer-science/cryptography/crypt/v/one-time-pad' 
        },
        { 
          title: 'Practical Limitations of OTP', 
          url: 'https://crypto.stackexchange.com/questions/59/taking-advantage-of-one-time-pad-key-reuse' 
        }
      ]
    }
  },
  {
    id: 'substitution',
    name: 'Substitution Cipher',
    description: 'A method of encryption where each letter is replaced with another letter according to a fixed system. Includes monoalphabetic and polyalphabetic variants.',
    speed: 9,
    security: 3,
    easeOfUse: 9,
    type: 'symmetric',
    resources: {
      documentation: 'https://en.wikipedia.org/wiki/Substitution_cipher',
      papers: [
        { 
          title: 'Classical Substitution Methods', 
          url: 'https://www.sciencedirect.com/topics/computer-science/substitution-cipher' 
        },
        { 
          title: 'Frequency Analysis Attacks on Ciphers', 
          url: 'https://www.dcode.fr/frequency-analysis' 
        }
      ],
      tutorials: [
        { 
          title: 'Substitution Cipher Basics - Video', 
          url: 'https://youtu.be/9bZHlv_d-eI?si=pl1Oyp_eXDcuPdVF' 
        },
        { 
          title: 'Creating Substitution Keys', 
          url: 'https://crypto.interactive-maths.com/simple-substitution-cipher.html' 
        },
        { 
          title: 'Cryptanalysis of Substitution Ciphers', 
          url: 'https://www.geeksforgeeks.org/substitution-cipher/' 
        }
      ]
    }
  }
];

// Simple encryption/decryption functions (educational purposes)

// Caesar Cipher
export function encryptCaesar(text: string, shift: number = 3): string {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      const base = code >= 65 && code <= 90 ? 65 : 97;
      return String.fromCharCode(((code - base + shift) % 26) + base);
    }
    return char;
  }).join('');
}

// Vigenère Cipher - re-exported from shared utils
export { encryptVigenere } from './utils/vigenereUtils';

// Substitution Cipher (simple random substitution)
export function encryptSubstitution(text: string): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const substitution = 'QWERTYUIOPASDFGHJKLZXCVBNM'; // Fixed substitution for demo
  
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const isUpper = char === char.toUpperCase();
      const index = alphabet.indexOf(char.toUpperCase());
      const newChar = substitution[index];
      return isUpper ? newChar : newChar.toLowerCase();
    }
    return char;
  }).join('');
}

// Stream Cipher (XOR with key)
export function encryptStream(text: string, key: string = 'SECRET'): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const textCode = text.charCodeAt(i);
    const keyCode = key.charCodeAt(i % key.length);
    result += String.fromCharCode(textCode ^ keyCode);
  }
  return btoa(result); // Base64 encode for display
}

// One-Time Pad (XOR with random key same length as text)
export function encryptOTP(text: string): { encrypted: string, key: string } {
  let key = '';
  let encrypted = '';
  
  for (let i = 0; i < text.length; i++) {
    const keyChar = Math.floor(Math.random() * 256);
    key += String.fromCharCode(keyChar);
    encrypted += String.fromCharCode(text.charCodeAt(i) ^ keyChar);
  }
  
  return {
    encrypted: btoa(encrypted),
    key: btoa(key)
  };
}

// Hill Cipher (simplified 2x2 matrix)
export function encryptHill(text: string): string {
  // Simplified Hill cipher with fixed 2x2 matrix
  const matrix = [[3, 3], [2, 5]]; // Key matrix
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
  let result = '';
  
  for (let i = 0; i < cleanText.length; i += 2) {
    const char1 = cleanText.charCodeAt(i) - 65;
    const char2 = i + 1 < cleanText.length ? cleanText.charCodeAt(i + 1) - 65 : 23; // padding with X
    
    const enc1 = (matrix[0][0] * char1 + matrix[0][1] * char2) % 26;
    const enc2 = (matrix[1][0] * char1 + matrix[1][1] * char2) % 26;
    
    result += String.fromCharCode(enc1 + 65) + String.fromCharCode(enc2 + 65);
  }
  
  return result;
}

// Generic encryption router
export function encryptSimple(text: string, algorithmId: string, key?: string): string {
  console.log("VIGENERE FULL VISUALIZER LOGIC - encryptSimple called", { algorithmId, text, key });
  switch(algorithmId) {
    case 'caesar':
      return encryptCaesar(text, 3);
    case 'vigenere':
      console.log("VIGENERE FULL VISUALIZER LOGIC - routing to encryptVigenere");
      return encryptVigenere(text, key || 'KEY');
    case 'substitution':
      return encryptSubstitution(text);
    case 'stream':
      return encryptStream(text);
    case 'hill':
      return encryptHill(text);
    case 'otp':
      const otpResult = encryptOTP(text);
      return `${otpResult.encrypted}|KEY:${otpResult.key}`;
    default:
      // For hash and other algorithms
      const encoded = btoa(text);
      const prefix = algorithmId.slice(0, 3).toUpperCase();
      return `${prefix}:${encoded}`;
  }
}

// Decryption functions
export function decryptCaesar(text: string, shift: number = 3): string {
  return encryptCaesar(text, 26 - shift); // Reverse shift
}

// Vigenère Cipher decryption - re-exported from shared utils
export { decryptVigenere } from './utils/vigenereUtils';

export function decryptSubstitution(text: string): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const substitution = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const isUpper = char === char.toUpperCase();
      const index = substitution.indexOf(char.toUpperCase());
      const newChar = alphabet[index];
      return isUpper ? newChar : newChar.toLowerCase();
    }
    return char;
  }).join('');
}

export function decryptStream(encrypted: string, key: string = 'SECRET'): string {
  try {
    const decoded = atob(encrypted);
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      const textCode = decoded.charCodeAt(i);
      const keyCode = key.charCodeAt(i % key.length);
      result += String.fromCharCode(textCode ^ keyCode);
    }
    return result;
  } catch {
    return 'Invalid encrypted text';
  }
}

export function decryptOTP(encrypted: string): string {
  try {
    const parts = encrypted.split('|KEY:');
    if (parts.length !== 2) return 'Invalid format';
    
    const encryptedData = atob(parts[0]);
    const key = atob(parts[1]);
    let result = '';
    
    for (let i = 0; i < encryptedData.length; i++) {
      result += String.fromCharCode(encryptedData.charCodeAt(i) ^ key.charCodeAt(i));
    }
    return result;
  } catch {
    return 'Invalid encrypted text';
  }
}

export function decryptHill(encrypted: string): string {
  // Simplified Hill cipher decryption with inverse matrix
  const inverseMatrix = [[15, 17], [20, 9]]; // Modular inverse of [[3,3],[2,5]] mod 26
  const cleanText = encrypted.toUpperCase().replace(/[^A-Z]/g, '');
  let result = '';
  
  for (let i = 0; i < cleanText.length; i += 2) {
    const char1 = cleanText.charCodeAt(i) - 65;
    const char2 = i + 1 < cleanText.length ? cleanText.charCodeAt(i + 1) - 65 : 0;
    
    const dec1 = (inverseMatrix[0][0] * char1 + inverseMatrix[0][1] * char2) % 26;
    const dec2 = (inverseMatrix[1][0] * char1 + inverseMatrix[1][1] * char2) % 26;
    
    result += String.fromCharCode(dec1 + 65) + String.fromCharCode(dec2 + 65);
  }
  
  return result.toLowerCase();
}

export function decryptSimple(encrypted: string, algorithmId?: string, key?: string): string {
  try {
    // Detect algorithm from prefix or use provided algorithmId
    if (encrypted.includes('|KEY:')) {
      // OTP format
      return decryptOTP(encrypted);
    }
    
    const parts = encrypted.split(':');
    let detectedAlgorithm = algorithmId;
    
    if (parts.length === 2 && !detectedAlgorithm) {
      const prefix = parts[0].toLowerCase();
      if (prefix === 'bla') detectedAlgorithm = 'blake2b';
      if (prefix === 'str') detectedAlgorithm = 'stream';
      if (prefix === 'otp') detectedAlgorithm = 'otp';
      encrypted = parts[1];
    }
    
    switch(detectedAlgorithm) {
      case 'caesar':
        return decryptCaesar(encrypted, 3);
      case 'vigenere':
        return decryptVigenere(encrypted, key || 'KEY');
      case 'substitution':
        return decryptSubstitution(encrypted);
      case 'stream':
        return decryptStream(encrypted);
      case 'hill':
        return decryptHill(encrypted);
      case 'otp':
        return decryptOTP(encrypted);
      default:
        // Try base64 decode as fallback
        return atob(encrypted);
    }
  } catch (error) {
    return 'Unable to decrypt - please check the encrypted text';
  }
}

// Hash function (simplified for BLAKE2b demo)
export function hashText(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}
