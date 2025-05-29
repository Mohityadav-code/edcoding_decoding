# Symbol Cipher Tool

A full-stack web application for encoding and decoding text using special Unicode symbols.

## Features

- Encode plain text to Unicode symbols
- Decode Unicode symbols back to plain text
- Preserve non-alphabetic characters (numbers, punctuation, emoji)
- Proper error handling with toast notifications
- Responsive UI design

## Symbol Mapping

The application uses the following mapping to convert characters:

| Letter | Symbol | Letter | Symbol | Letter | Symbol |
|--------|--------|--------|--------|--------|--------|
| a | α | j | ʆ | s | ѕ |
| b | β | k | κ | t | τ |
| c | ¢ | l | λ | u | υ |
| d | δ | m | ɱ | v | ν |
| e | ε | n | η | w | ω |
| f | ϝ | o | ☺ | x | х |
| g | ɡ | p | ρ | y | γ |
| h | ♄ | q | φ | z | ζ |
| i | ι | r | я | | |

### Rules

- Uppercase letters are converted to uppercase symbols when available
- Non-alphabetic characters (numbers, punctuation, emoji) remain unchanged
- Input is limited to 280 Unicode code points
- Control characters (except newline) are not allowed

## Setup

1. Clone the repository:
```
git clone https://github.com/yourusername/symbol-cipher.git
cd symbol-cipher
```

2. Install dependencies:
```
npm install
```

3. Start the development servers (backend + frontend):
```
npm run dev
```

4. Run the tests:
```
npm test
```

## Implementation Details

### Backend (Node.js/Express)

- RESTful API with `/api/encode` and `/api/decode` endpoints
- Custom encoding/decoding implementation
- Comprehensive error handling
- Unit tests with Jest

### Frontend (React/Vite)

- Clean, responsive UI with CSS
- Fetch API for backend communication
- Toast notifications for error feedback
- Encode/Decode/Swap functionality 