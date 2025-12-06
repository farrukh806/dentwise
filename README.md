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
- **Admin Dashboard**: Comprehensive admin panel for managing doctors and appointments
  - Real-time metrics and statistics
  - Doctor management (add, edit, view)
  - Appointment tracking and management
  - Status monitoring for doctors and appointments

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
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: TanStack Query (React Query) for server state
- **Form Management**: React Hook Form, Zod
- **UI Components**: Radix UI, Lucide Icons
- **Charts**: Recharts
- **Notifications**: Sonner (toast notifications)
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
│   ├── admin/             # Admin pages and dashboard
│   ├── prisma/            # Prisma generated types
│   └── validations/       # Zod validation schemas
├── components/             # Reusable React components
│   ├── ui/                # shadcn/ui components
│   ├── admin/             # Admin-specific components
│   │   ├── add-update-doctor.tsx
│   │   ├── appointment-table.tsx
│   │   ├── status-card.tsx
│   │   ├── status-section.tsx
│   │   ├── status-table.tsx
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
│   ├── actions/          # Server actions (doctors, appointments, user)
│   └── query-options/     # TanStack Query options
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
- **StatusSection**: Dashboard metrics section displaying key statistics including total doctors, active doctors, total appointments, and completed appointments
- **StatusTable**: Doctors management table component that displays all doctors with their information and provides add/edit functionality
- **StatusTableItem**: Table row component for displaying doctor information including avatar, name, speciality, gender, contact details, appointment count, active status, and edit button
- **AddUpdateDoctor**: Dialog form component for adding new doctors or updating existing doctor information. Features include:
  - Form validation using Zod
  - Fields: name, email, phone, speciality, gender, status
  - Automatic form reset when dialog opens
  - Real-time data synchronization with TanStack Query
  - Toast notifications for success/error states
- **AppointmentTable**: Data table component for displaying and managing appointments with columns for:
  - Patient information (name and email)
  - Doctor name
  - Date and time
  - Appointment reason
  - Status (Scheduled, Completed, Canceled) with color-coded badges
  - Action column for future status toggling

## 🎯 Admin Dashboard Features

The admin dashboard provides comprehensive management tools for dental practice administrators:

### Dashboard Overview

- **Access Control**: Protected route accessible only to users with admin email (configured via `ADMIN_EMAIL` environment variable)
- **Real-time Metrics**: Live statistics displayed in status cards:
  - Total number of doctors in the system
  - Count of active doctors
  - Total appointments
  - Completed appointments count

### Doctor Management

- **View All Doctors**: Complete list of all doctors with:
  - Profile image (auto-generated based on gender)
  - Name, speciality, and gender
  - Contact information (email and phone)
  - Appointment count per doctor
  - Active/Inactive status indicator
- **Add New Doctor**: Create new doctor profiles with:
  - Personal information (name, email, phone)
  - Professional details (speciality)
  - Gender selection (Male/Female)
  - Status setting (Active/Inactive)
  - Automatic avatar generation
- **Edit Doctor**: Update existing doctor information with pre-populated form fields
- **Form Validation**: Client-side validation using Zod schema with error messages

### Appointment Management

- **View All Appointments**: Comprehensive data table showing:
  - Patient details (name and email)
  - Assigned doctor
  - Date and time of appointment
  - Reason for visit
  - Current status with color-coded badges:
    - 🟢 Completed (green)
    - 🔵 Scheduled (blue)
    - 🔴 Canceled (red)
- **Data Table Features**:
  - Sorting capabilities
  - Filtering options
  - Pagination support

  - Responsive design

### Technical Implementation

- **Server Actions**: All database operations use Next.js server actions for type-safe API calls
- **React Query Integration**: TanStack Query for efficient data fetching, caching, and synchronization
- **Optimistic Updates**: Automatic cache invalidation after mutations
- **Type Safety**: Full TypeScript support with Prisma-generated types

## 🛠️ Development Setup

### Database Setup

1. Set up your PostgreSQL database (or use Neon, Supabase, etc.)
2. Configure your database connection in `.env.local`:
   ```
   DATABASE_URL="your-database-connection-string"
   ```
3. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```
4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

### Environment Variables

Required environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `ADMIN_EMAIL`: Email address for admin dashboard access
- Clerk authentication variables (as per Clerk setup)

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
