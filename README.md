# Infortic - Himafortic

A web-based application designed to aggregate and organize student competitions in Indonesia. The app focuses on national events with secondary attention to international competitions.

## Features

- Web crawler for competition data
- Region-based filtering for Indonesian students
- Auto-translation for international competitions
- Deadline alert system
- User preferences and competition tracking
- Real-time updates using Supabase

## Tech Stack

- Frontend: Next.js 14 with React 18
- Styling: Tailwind CSS with ShadCN UI
- Backend: Supabase (BaaS)
- Deployment: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your Supabase credentials
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/          # App router pages, layouts, and global styles
├── components/   # Reusable UI components
├── lib/          # Utility functions and configurations
├── providers/    # App-wide providers (Theme, Supabase, etc.)
└── types/        # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
