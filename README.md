# PrepAIre - AI Career Coach Agent

PrepAIre is your personalized AI career coach agent built with Next.js. Get tailored career roadmaps, expert advice, and resume analysis designed just for you.

## Features

- 🤖 **AI Career Chat**: Get personalized career advice and guidance
- 📄 **Resume Analyzer**: AI-powered resume analysis and improvement suggestions
- 🗺️ **Career Roadmap Generator**: Build step-by-step career development plans
- ✉️ **Cover Letter Generator**: Create compelling cover letters (Coming Soon)
- 🎤 **Mock Interview**: Practice interviews with AI feedback (Coming Soon)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm/bun
- Clerk account for authentication
- Inngest account for background jobs
- ImageKit account for file storage
- Google Gemini API key

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=your_database_url

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
INNGEST_SERVER_HOST=https://api.inngest.com

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_ENDPOINT_URL=your_imagekit_endpoint

# AI
GEMINI_API_KEY=your_gemini_api_key
```

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up your environment variables
4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Inngest Setup

The 404 errors you're seeing (`/x/inngest`, `/.netlify/functions/inngest`, etc.) are normal - Inngest tries multiple endpoint discovery paths. Your actual endpoint `/api/inngest` is working correctly (200 status).

To connect Inngest to your local development:

1. Install Inngest CLI: `npm install -g inngest`
2. Run Inngest dev server: `npx inngest-cli@latest dev`
3. Your functions are served at `/api/inngest`

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Database**: PostgreSQL with Drizzle ORM
- **Background Jobs**: Inngest
- **AI**: Google Gemini
- **File Storage**: ImageKit
- **UI Components**: Radix UI, Lucide Icons

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (routes)/          # Main application routes
│   │   ├── dashboard/     # Dashboard and components
│   │   ├── ai-tools/      # AI tool pages
│   │   ├── billing/       # Billing page
│   │   └── profile/       # User profile
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── configs/               # Database and app configuration
├── context/               # React contexts (Theme)
├── inngest/               # Inngest functions and client
└── public/                # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
