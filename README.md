# Logroñam - Gastronomic Website

A comprehensive gastronomic website for reviewing and ranking the best bars and restaurants in Logroño, Spain. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🍷 **Bar Rankings**: Comprehensive ranking system for bars and restaurants
- 🍽️ **Pintxo Reviews**: Detailed reviews of the best pintxos with photos and descriptions
- 🌍 **Multi-language Support**: Available in Spanish, English, French, Catalan, Portuguese, German, and Italian
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop
- 📊 **Analytics**: Google Analytics and Vercel Analytics integration
- 🎨 **Modern UI**: Beautiful, accessible design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Analytics**: Google Analytics + Vercel Analytics
- **Internationalization**: next-i18next

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd logronam
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Google Analytics ID:

```
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
logronam/
├── app/                    # Next.js App Router pages
│   ├── bars/[id]/         # Dynamic bar detail pages
│   ├── rankings/          # Rankings page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   ├── ui/               # Basic UI components
│   ├── bar/              # Bar-specific components
│   ├── pintxo/           # Pintxo-specific components
│   └── layout/           # Layout components
├── data/                 # Sample data and utilities
├── lib/                  # Utility functions
├── public/               # Static assets
│   ├── images/          # Images for bars and pintxos
│   └── locales/         # Translation files
└── types/               # TypeScript type definitions
```

## Adding New Bars

To add new bars, edit the `data/bars.ts` file:

```typescript
import { Bar } from "../types/bar";

export const bars: Bar[] = [
  {
    id: "unique-bar-id",
    name: "Bar Name",
    description: "Bar description...",
    location: {
      address: "Full address",
      neighborhood: "Neighborhood name",
    },
    // ... other properties
  },
  // ... more bars
];
```

## Customization

### Styling

The project uses Tailwind CSS for styling. Custom styles can be added to `app/globals.css`.

### Translations

Translation files are located in `public/locales/[language]/common.json`. To add a new language:

1. Create a new directory in `public/locales/`
2. Add the language code to `next.config.ts`
3. Create translation files following the existing structure

### Analytics

Google Analytics is configured in `app/layout.tsx`. Replace `GA_MEASUREMENT_ID` with your actual Google Analytics ID.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email info@logronam.com or create an issue in the repository.
