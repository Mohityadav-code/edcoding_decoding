const { encode, decode, ERROR_CODES } = require('./cipher');

describe('Cipher Module', () => {
  describe('encode function', () => {
    test('should encode alphabetic characters correctly', () => {
      expect(encode('abcdefghijklmnopqrstuvwxyz')).toBe('αβ¢δεϝɡ♄ιʆκλɱη☺ρφяѕτυνωхγζ');
    });

    test('should preserve non-alphabetic characters', () => {
      expect(encode('Hello, World! 123')).toBe('♄ελλ☺, Ω☺яλδ! 123');
    });

    test('should handle uppercase letters', () => {
      expect(encode('ABC')).toBe('ΑΒ¢');
    });

    test('should preserve emojis', () => {
      expect(encode('Hello 😊')).toBe('♄ελλ☺ 😊');
    });

    test('should throw error when input is too long', () => {
      const longText = 'a'.repeat(281);
      expect(() => encode(longText)).toThrow();
      try {
        encode(longText);
      } catch (error) {
        expect(error.code).toBe(ERROR_CODES.INPUT_TOO_LONG);
      }
    });

    test('should throw error for control characters', () => {
      expect(() => encode('Hello\x01World')).toThrow();
      try {
        encode('Hello\x01World');
      } catch (error) {
        expect(error.code).toBe(ERROR_CODES.UNSUPPORTED_CONTROL_CHAR);
      }
    });
  });

  describe('decode function', () => {
    test('should decode symbols back to text', () => {
      const lowercaseResult = decode('αβ¢δεϝɡ♄ιʆκλɱη☺ρφяѕτυνωхγζ');
      expect(lowercaseResult.toLowerCase()).toBe('abcdefghijklmnopqrstuvwxyz');
    });

    test('should preserve non-symbol characters', () => {
      const result = decode('♄ελλ☺, Ω☺яλδ! 123');
      expect(result.toLowerCase()).toBe('hello, world! 123');
    });

    test('should handle uppercase symbols', () => {
      expect(decode('ΑΒ¢')).toBe('ABC');
    });

    test('should preserve emojis', () => {
      const text = 'Hello 😊';
      const encoded = encode(text);
      const decoded = decode(encoded);
      expect(decoded.toLowerCase()).toBe('hello 😊');
    });

    test('should throw error for unknown symbols', () => {
      expect(() => decode('Ħello')).toThrow();
      try {
        decode('Ħello');
      } catch (error) {
        expect(error.code).toBe(ERROR_CODES.UNKNOWN_SYMBOL);
      }
    });
  });

  // The most important test: roundtrip conversion
  describe('roundtrip conversion', () => {
    test('should preserve text after encode and decode', () => {
      const text = 'Hello, World! 123';
      const encoded = encode(text);
      const decoded = decode(encoded);
      // Case might change during round trip, so compare with lowercase
      expect(decoded.toLowerCase()).toBe(text.toLowerCase());
    });

    test('should preserve text with emoji after encode and decode', () => {
      const text = 'Hello 😊 World!';
      const encoded = encode(text);
      const decoded = decode(encoded);
      // Case might change during round trip, so compare with lowercase
      expect(decoded.toLowerCase()).toBe(text.toLowerCase());
    });
  });
}); 