# Symbol Cipher Keep-Alive Script

This script pings both the frontend and backend of the Symbol Cipher application every 10 minutes to prevent them from going to sleep on Render's free tier.

## Setup

1. Make sure you have Node.js installed on your system.
2. Install dependencies:
   ```
   npm install
   ```

## Usage

Run the script:
```
npm start
```

The script will:
- Ping the frontend URL: https://edcoding-decoding.onrender.com/
- Ping the backend URL: https://edcoding-decoding-api.onrender.com/api/encode
- Log the results to the console
- Repeat every 10 minutes

Keep this script running on a machine that stays on, such as:
- Your local computer (if it stays on)
- A cloud VM
- A service like Heroku, Glitch, or Replit

## Running on Replit

For a free always-on option:

1. Create a new Replit account at https://replit.com
2. Create a new Node.js Repl
3. Upload these files (keep-alive.js, package.json)
4. Click Run
5. Enable "Always On" in the Replit interface (may require Replit's paid plan)

## Note

This script uses a minimal amount of resources. Running it continuously will ensure your Symbol Cipher app remains responsive without the cold-start delay that happens when the services go to sleep. 