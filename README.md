# DentWise - Your AI-Powered Dental Assistant

![Status](https://img.shields.io/badge/Status-In%20Progress-yellow?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16.0.5-black?style=flat-square)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 📋 Project Overview

DentWise is an AI-powered dental assistant application that helps users get instant answers about dental concerns, receive preliminary diagnoses, connect with qualified dentists, and track their dental health journey.

### Features

- **Ask Questions**: Chat with our AI assistant about any dental concerns
- **Get Diagnosis**: Receive AI-powered preliminary diagnosis based on your symptoms
- **Find Dentist**: Connect with qualified dentists in your area
- **Track Progress**: Monitor your dental health journey with detailed records

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/farrukh806/dentiwise.git
cd dentiwise
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📦 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Authentication**: Clerk
- **Form Management**: React Hook Form, Zod
- **UI Components**: Radix UI, Lucide Icons
- **Charts**: Recharts
- **Code Quality**: ESLint, Prettier (with Husky pre-commit hooks)

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Format code with Prettier
npm run format

# Check formatting
npm run format:check
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin pages
│   └── prisma/            # Prisma generated types
├── components/             # Reusable React components
│   ├── ui/                # shadcn/ui components
│   ├── admin/             # Admin-specific components
│   │   ├── status-card.tsx
│   │   └── status-table-item.tsx
│   ├── common/            # Common shared components
│   │   ├── badge.tsx
│   │   ├── data-table.tsx
│   │   ├── navbar.tsx
│   │   ├── sign-in-button.tsx
│   │   ├── sign-up-button.tsx
│   │   └── user-sync.tsx
│   └── landing/           # Landing page components
│       ├── header.tsx
│       ├── hero.tsx
│       ├── how-it-works.tsx
│       ├── card.tsx
│       ├── pricing.tsx
│       ├── pricing-card.tsx
│       ├── testimonials.tsx
│       ├── cta.tsx
│       ├── footer.tsx
│       ├── action-section.tsx
│       ├── question.tsx
│       └── what-to-ask.tsx
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and actions
├── public/                # Static assets
├── prisma/                # Prisma schema and migrations
├── .husky/               # Git hooks
├── package.json
└── tsconfig.json
```

## 🧩 Components Overview

### Landing Page Components

- **Header**: Navigation header for the landing page
- **Hero**: Main hero section with call-to-action
- **HowItWorks**: Four-step process section (Ask Questions, Get Diagnosis, Find Dentist, Track Progress)
- **Card**: Reusable card component for displaying features
- **Pricing**: Pricing section with multiple pricing tiers
- **PricingCard**: Individual pricing card with "Most Popular" badge
- **Testimonials**: Customer testimonials carousel
- **CTA**: Call-to-action sections
- **Footer**: Footer with links and company info
- **ActionSection**: Action-driven content sections
- **Question**: FAQ or question components
- **WhatToAsk**: Suggested questions/prompts section

### Common Components

- **Badge**: Reusable badge component for displaying labels and status indicators
- **DataTable**: Reusable data table component built with TanStack Table for displaying tabular data with sorting, filtering, and pagination
- **Navbar**: Main navigation bar component with user authentication, responsive mobile menu, and navigation links (Dashboard, Appointments, Voice, Pro)
- **SignInButton**: Wrapper component for Clerk's sign-in functionality with modal mode
- **SignUpButton**: Wrapper component for Clerk's sign-up functionality with modal mode
- **UserSync**: Client component that automatically synchronizes authenticated user data with the database

### Admin Components

- **StatusCard**: Card component for displaying status metrics with icon, count, and description (used in admin dashboard)
- **StatusTableItem**: Table row component for displaying doctor information including avatar, name, specialty, contact details, appointment count, and action buttons

## 🛠️ Development Setup

### Code Formatting

This project uses Prettier with Husky for automatic code formatting before commits:

```bash
npm run format        # Format all files
npm run format:check  # Check formatting
```

### Linting

```bash
npm run lint
```

## 📝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a new branch for your feature
2. Make your changes
3. Ensure code is formatted with Prettier
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For questions or feedback, please reach out to the project maintainer.

---

**Note**: This project is currently in progress. Features and documentation may be updated frequently.
