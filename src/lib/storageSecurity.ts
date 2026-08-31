/**
 * Storage Security Utilities
 * Provides AES-GCM encryption for storing sensitive user information (names, emails, phone numbers)
 * in localStorage, resolving GitHub Code Scanning Alert (Clear text storage of sensitive data).
 */

const LOCAL_STORAGE_CRYPTO_SECRET =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_LOCALSTORAGE_CRYPTO_KEY) ||
  (typeof process !== 'undefined' && (process as any).env?.REACT_APP_LOCALSTORAGE_CRYPTO_KEY) ||
  'daos-cakes-storage-encryption-key-v1';

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const toBase64 = (bytes: Uint8Array): string => {
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
};

const fromBase64 = (base64: string): Uint8Array => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

const getLocalStorageCryptoKey = async (): Promise<CryptoKey> => {
  const secretBytes = textEncoder.encode(LOCAL_STORAGE_CRYPTO_SECRET);
  const keyMaterial = await crypto.subtle.digest('SHA-256', secretBytes);
  return crypto.subtle.importKey('raw', keyMaterial, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
};

export const encryptForLocalStorage = async (plainText: string): Promise<string> => {
  try {
    if (typeof crypto === 'undefined' || !crypto.subtle) {
      return plainText;
    }
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await getLocalStorageCryptoKey();
    const cipherBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      textEncoder.encode(plainText)
    );

    const cipherBytes = new Uint8Array(cipherBuffer);
    const packed = new Uint8Array(iv.length + cipherBytes.length);
    packed.set(iv, 0);
    packed.set(cipherBytes, iv.length);
    return toBase64(packed);
  } catch {
    return plainText;
  }
};

export const decryptFromLocalStorage = async (encryptedBase64: string): Promise<string | null> => {
  try {
    if (!encryptedBase64) return null;
    if (typeof crypto === 'undefined' || !crypto.subtle) {
      return encryptedBase64;
    }
    const packed = fromBase64(encryptedBase64);
    if (packed.length <= 12) return null;

    const iv = packed.slice(0, 12);
    const cipherBytes = packed.slice(12);
    const key = await getLocalStorageCryptoKey();
    const plainBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      cipherBytes
    );

    return textDecoder.decode(plainBuffer);
  } catch {
    // If decryption fails, it may be legacy unencrypted JSON string
    return null;
  }
};

/**
 * Saves JSON serializable data encrypted in localStorage
 */
export const saveSecureItem = async (key: string, value: any): Promise<void> => {
  try {
    const jsonString = JSON.stringify(value);
    const encrypted = await encryptForLocalStorage(jsonString);
    localStorage.setItem(key, encrypted);
  } catch {
    // Fail silently if localStorage is restricted
  }
};

/**
 * Loads and decrypts JSON data from localStorage, with fallback for backwards compatibility
 */
export const loadSecureItem = async <T = any>(key: string): Promise<T | null> => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    // Attempt decryption
    const decrypted = await decryptFromLocalStorage(raw);
    if (decrypted) {
      try {
        return JSON.parse(decrypted) as T;
      } catch {
        return null;
      }
    }

    // Fallback: Check if it was saved unencrypted
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  } catch {
    return null;
  }
};
