# Cursed Fortune Teller (React + Vite + Tailwind + Appwrite Sites)

## Local dev
```bash
npm i
npm run dev
```
Create `.env` from `.env.example` and fill in your Appwrite IDs.

## Appwrite setup
Collection: `fortunes`
- `title` (string, required)
- `message` (string, required, 512-1024 chars)
- `card` (string, optional - image url or card id)

Grant read permissions to `role:all` for public draws.

## Deploy to Appwrite Sites
- Push to GitHub
- Connect repo in Appwrite Cloud -> Sites
- Build command: `npm run build`
- Output directory: `dist`
