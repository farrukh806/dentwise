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
├── components/             # Reusable React components
│   ├── ui/                # shadcn/ui components
│   └── landing/           # Landing page components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/                # Static assets
├── .husky/               # Git hooks
├── package.json
└── tsconfig.json
```

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
