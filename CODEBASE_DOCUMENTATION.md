# Dynamics-Style CRM - Complete Codebase Documentation

**Project Name:** dynamics-style-crm
**Type:** React Developer Portfolio with CRM-Style Interface
**Last Updated:** February 11, 2026

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [File Relationships & Dependencies](#file-relationships--dependencies)
5. [Component Hierarchy](#component-hierarchy)
6. [Data Architecture](#data-architecture)
7. [Entity Mapping](#entity-mapping)
8. [Key Files Reference](#key-files-reference)
9. [Data Flow Diagram](#data-flow-diagram)
10. [Development Setup](#development-setup)

---

## Project Overview

### Purpose
A personal developer portfolio application that presents Shivam's experience, education, and projects through a Microsoft Dynamics 365/Power Apps-style user interface. This is a **client-side only application** with no backend—all data is stored in-memory using mock data.

### Key Features
- 📊 Dashboard with portfolio overview
- 📂 Projects, Experience, Education management
- 🎨 Dark/Light theme switching
- 🤖 AI-powered image editing & video generation (Google Gemini)
- 📋 Quick task/activity creation
- 📱 Fully responsive design
- 🔍 Global search functionality

---

## Technology Stack

### Core Framework
| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.3 | UI framework & component rendering |
| TypeScript | 5.8.2 | Type safety for development |
| React Router DOM | 7.13.0 | Client-side routing |
| Vite | 6.2.0 | Build tool & dev server |

### UI & Styling
| Technology | Version | Purpose |
|---|---|---|
| Tailwind CSS | 4 | Utility-first CSS styling |
| Fluent UI React | 9.72.10 | Microsoft design system components |
| Fluent UI Icons | 2.0.317 | Icon library |

### AI/APIs
| Service | Library | Purpose |
|---|---|---|
| Google Gemini | @google/genai 1.38.0 | Image editing & generation |
| Google Veo | @google/genai 1.38.0 | Video generation |

### Data Visualization
| Library | Version | Purpose |
|---|---|---|
| Recharts | 3.7.0 | Chart/graph rendering |

---

## Project Structure

```
dynamics-style-crm/
│
├── 📄 index.html                    # HTML entry point
├── 📄 index.tsx                     # React DOM render entry
├── 📄 App.tsx                       # Main app shell with routing
├── 📄 ThemeContext.tsx              # Theme provider (light/dark mode)
├── 📄 types.ts                      # TypeScript type definitions
├── 📄 constants.ts                  # Mock data & in-memory store
├── 📄 vite.config.ts                # Vite configuration
├── 📄 tsconfig.json                 # TypeScript config
├── 📄 package.json                  # Dependencies & scripts
├── 📄 .env.local                    # Environment variables (API keys)
│
├── 📁 components/                   # Reusable React components
│   ├── Layout.tsx                   # Main UI shell (nav, sidebar, profile)
│   ├── UIComponents.tsx             # Button, Input, Card, Modal, Drawer, etc.
│   ├── IntroAnimation.tsx           # Welcome/splash screen
│   ├── QuickCreate.tsx              # Activity creation drawer
│   ├── ContactDrawer.tsx            # Contact messaging interface
│   └── EducationFlow.tsx            # D365 Cloud Flow-style Education visualization
│
├── 📁 pages/                        # Page-level route components
│   ├── Dashboard.tsx                # Home page with portfolio overview
│   ├── EntityList.tsx               # Dynamic list view (Projects, Experience, Education)
│   ├── RecordDetail.tsx             # Single record detail view with editing
│   └── About.tsx                    # Developer profile & skills showcase
│
├── 📁 services/                     # External API integrations
│   └── geminiService.ts             # Google Gemini & Veo API service
│
├── 📁 assets/                       # Static files
│   └── profile.jpeg                 # Profile photo
│
└── 📁 dist/                         # Production build output
```

---

## File Relationships & Dependencies

### Dependency Tree

```
index.html
    ↓
index.tsx (React entry point)
    ↓
App.tsx (Main container)
    ├── ThemeContext.tsx (Theme provider)
    ├── IntroAnimation.tsx (Welcome screen)
    └── Layout.tsx (UI shell)
        ├── pages/Dashboard.tsx
        ├── pages/EntityList.tsx
        ├── pages/RecordDetail.tsx
        ├── pages/About.tsx
        ├── components/EducationFlow.tsx (D365 Flow-style Education)
        ├── components/QuickCreate.tsx
        ├── components/ContactDrawer.tsx
        └── components/UIComponents.tsx
            ├── Button
            ├── Input
            ├── Card
            ├── Modal
            ├── Drawer
            └── StatusBadge

services/geminiService.ts
    ├── Used by: pages/RecordDetail.tsx
    ├── Imports: @google/genai
    └── API Key: From .env.local

types.ts (TypeScript interfaces)
    ├── Used by: All components and services
    ├── Defines: Account, Contact, Lead, Opportunity, Activity
    └── Depends on: None (standalone types)

constants.ts (Mock data store)
    ├── Used by: All pages, services
    ├── Defines: MOCK_PROJECTS, MOCK_EXPERIENCE, MOCK_EDUCATION, MOCK_ACTIVITIES
    └── Exports: appStore (in-memory data manager)
```

---

## Component Hierarchy

### Layout & Shell
```
App.tsx
└── ThemeContext.Provider (Wraps entire app for theme)
    ├── IntroAnimation (Welcome screen - shows on first load)
    └── Layout.tsx (Main shell)
        ├── TopNavBar (Logo, search, notifications, profile)
        ├── Sidebar (Navigation menu - collapsible)
        ├── MainContent (Routes to pages)
        │   ├── Dashboard.tsx
        │   ├── EntityList.tsx (Projects, Experience, Activities)
        │   ├── EducationFlow.tsx (D365 Cloud Flow visualization - NEW)
        │   ├── RecordDetail.tsx
        │   └── About.tsx
        ├── QuickCreate.tsx (Drawer for new activity)
        ├── ContactDrawer.tsx (Contact interface)
        └── SettingsPanel (Theme toggle, preferences)
```

### Page Components
```
Dashboard.tsx
├── Card (Portfolio overview cards)
├── Specialization section
└── Quick links to main sections

EntityList.tsx (Generic table view)
├── TableHeader
├── TableRow (for each record)
└── Pagination/Sorting controls

RecordDetail.tsx
├── Record header with title/status
├── Details panel
├── Related activities section
├── Edit form
└── AI tools integration

About.tsx
├── Profile section
├── Skills grid
├── Experience timeline
└── Certifications
```

### Reusable UI Components (UIComponents.tsx)
```
UIComponents.tsx exports:
├── Button (variants: primary, secondary, outline, ghost)
├── Input (text/textarea with validation)
├── Select (dropdown)
├── Card (container component)
├── Modal (centered dialog)
├── Drawer (side panel)
└── StatusBadge (status indicators)
```

---

## Data Architecture

### In-Memory Data Store (constants.ts)

```typescript
Class: Store {
  Methods:
    - add(entity) → adds new record
    - update(id, data) → updates existing record
    - delete(id) → removes record
    - get(id) → retrieves single record
    - getAll(type) → retrieves all records of a type
    - reset() → clears all data
}

Data Collections:
  - MOCK_PROJECTS (Opportunity entities)
  - MOCK_EXPERIENCE (Account entities)
  - MOCK_EDUCATION (Contact entities)
  - MOCK_ACTIVITIES (Activity records)
  - MOCK_CONTACT_REQS (Lead entities)
```

### Persistence
- **Storage Method**: In-memory JavaScript objects
- **Persistence**: None (data resets on page refresh)
- **Alternative**: Could be replaced with localStorage or backend API

---

## Entity Mapping

### Portfolio Concept → CRM Entity Type → Data Location

| Portfolio Concept | CRM Entity Type | Data Source | Component |
|---|---|---|---|
| Projects | Opportunity | MOCK_PROJECTS | EntityList.tsx |
| Work Experience | Account | MOCK_EXPERIENCE | EntityList.tsx |
| Education/Certs | Contact | MOCK_EDUCATION | EducationFlow.tsx (Cloud Flow visualization) |
| Tasks/Activities | Activity | MOCK_ACTIVITIES | EntityList.tsx |
| Contact Requests | Lead | MOCK_CONTACT_REQS | (UI mock) |

### Entity Type Definitions (types.ts)

```typescript
BaseModel {
  id: string
  createdOn: Date
  ownerId: string
}

Opportunity extends BaseModel {
  name, description, stage, estimatedValue, dueDate, ...
}

Account extends BaseModel {
  name, websiteUrl, emailAddress, phone, ...
}

Contact extends BaseModel {
  firstName, lastName, emailAddress, phone, ...
}

Activity extends BaseModel {
  subject, description, type, status, dueDate, ...
}

Lead extends BaseModel {
  firstName, lastName, email, phone, company, ...
}
```

---

## Key Files Reference

### Entry Points

| File | Line | Purpose | Imports |
|---|---|---|---|
| `index.html` | 1-48 | HTML template, loads CSS | Tailwind CDN, Material Icons |
| `index.tsx` | 1-26 | React root mount | React, ReactDOM, App |
| `App.tsx` | 1-50 | Main component, routing | React Router, ThemeContext |

### Core Application Files

| File | Key Exports | Purpose | Dependencies |
|---|---|---|---|
| `ThemeContext.tsx` | ThemeProvider, useTheme | Theme state (light/dark) | React Context API |
| `types.ts` | Account, Contact, Lead, Opportunity, Activity, Status enums | TypeScript interfaces | None |
| `constants.ts` | appStore, MOCK_*, Store class | Mock data & in-memory store | types.ts |

### Component Files

| File | Exports | Key Features | Uses |
|---|---|---|---|
| `components/Layout.tsx` | Layout | Nav, sidebar, profile menu, responsive | UIComponents, React Router |
| `components/UIComponents.tsx` | Button, Input, Card, Modal, Drawer, StatusBadge | Reusable UI primitives | Tailwind, Fluent UI |
| `components/IntroAnimation.tsx` | IntroAnimation | Welcome screen animation | CSS animations |
| `components/QuickCreate.tsx` | QuickCreate | Activity creation form | UIComponents, constants |
| `components/ContactDrawer.tsx` | ContactDrawer | Contact messaging UI | UIComponents |
| `components/EducationFlow.tsx` | EducationFlow | D365 Cloud Flow visualization for education | ThemeContext, @fluentui/react-icons |

### Page Files

| File | Route | Purpose | Data Source |
|---|---|---|---|
| `pages/Dashboard.tsx` | `/dashboard` | Portfolio overview | constants.ts |
| `pages/EntityList.tsx` | `/projects`, `/experience` | List view for projects & experience | constants.ts |
| `pages/RecordDetail.tsx` | `/:type/:id` | Single record detail & edit | constants.ts, geminiService |
| `pages/About.tsx` | `/about` | Developer profile | Local data |
| `components/EducationFlow.tsx` | `/education` | D365 Cloud Flow-style education visualization | constants.ts |

### Service Files

| File | Exports | Purpose | API Integration |
|---|---|---|---|
| `services/geminiService.ts` | editImage(), generateVideo(), getAIClient() | AI-powered image/video tools | Google Gemini & Veo API |

### Configuration Files

| File | Purpose | Key Settings |
|---|---|---|
| `vite.config.ts` | Vite build setup | Dev server port 3000, path alias @/ |
| `tsconfig.json` | TypeScript configuration | Target ES2022, JSX react-jsx |
| `package.json` | Dependencies & scripts | npm run dev, build, preview |
| `.env.local` | Environment variables | GEMINI_API_KEY |

---

## Data Flow Diagram

### Initial Load Flow
```
User opens app
    ↓
index.html loads
    ↓
index.tsx mounts React to <div id="root">
    ↓
App.tsx renders
    ├── ThemeContext.Provider wraps content
    ├── IntroAnimation displays (first load only)
    └── Layout renders
        └── React Router shows Dashboard
            ├── Loads mock data from constants.ts
            └── Renders Portfolio overview cards
```

### Page Navigation Flow
```
User clicks navigation item
    ↓
React Router updates URL
    ↓
Layout component stays (persistent)
    ↓
Page component switches (e.g., Dashboard → EntityList)
    ├── Fetches data from constants.ts (appStore)
    └── Renders appropriate page UI
```

### Data Modification Flow
```
User edits record
    ↓
Form submits
    ↓
RecordDetail.tsx calls appStore.update(id, data)
    ↓
In-memory data updates
    ↓
Component re-renders
    ↓
Changes visible in UI
    (Note: Lost on page refresh - not persisted)
```

### AI Integration Flow
```
User triggers AI action (image edit/video)
    ↓
Component calls geminiService.editImage() or generateVideo()
    ↓
Service checks API key in .env.local
    ↓
Calls Google Generative AI API
    ↓
Returns generated/edited content
    ↓
RecordDetail.tsx displays result
```

---

## Theme System

### Light Mode Colors
```
Background: #f0f2f5, #f3f2f1
Text: #333, #000
Primary: #0078d4 (Microsoft Blue)
Borders: #d0d0d0
```

### Dark Mode Colors
```
Background: #111, #1b1b1b, #000
Text: #f0f2f5, #fff
Primary: #107c10 (Green) / #0078d4 (Blue)
Borders: #333
```

### Theme Toggle Implementation
- **Storage**: localStorage key `theme-preference`
- **Provider**: `ThemeContext.tsx` (React Context)
- **Toggle**: SettingsPanel component
- **UI Updates**: Tailwind `dark:` prefix classes

---

## Development Setup

### Prerequisites
- Node.js (LTS recommended)
- npm or yarn package manager

### Installation
```bash
cd dynamics-style-crm
npm install
```

### Development
```bash
npm run dev
# App runs on http://localhost:3000
```

### Build
```bash
npm run build
# Output: /dist directory
```

### Environment Setup
Create `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
```

---

## Key Business Logic & Workflows

### 1. Dashboard Loading
- Load all mock data from constants.ts
- Display project count, experience count, education count
- Show specialization section
- Render quick-access cards

### 2. Entity List Viewing
- EntityList.tsx is generic component used for:
  - Projects: Shows Opportunities
  - Experience: Shows Accounts
- Features: Sorting, filtering, pagination (if implemented)

### 3. Education Flow Visualization (NEW)
- EducationFlow.tsx uses D365 Cloud Flow-style display
- Shows education items as vertical flow with animated connectors
- Each step represents: Degree/Certification
- Features:
  - Vertical timeline with circular step connectors
  - Color-coded based on degree type
  - Click on any step to show details panel
  - Details panel displays:
    - Institution, graduation year, achievement (GPA)
    - Full description of education/achievements
    - Key highlights as tags
  - Responsive design with hover effects
  - Full dark/light theme support
- Data: Transforms Contact entities from MOCK_EDUCATION

### 4. Record Details Page
- Load single record from appStore
- Display all fields
- Show related activities
- Allow inline editing
- Save changes to in-memory store
- Optional: Trigger AI tools for image/video

### 5. Quick Create
- Create new Activity record
- Fields: Subject, Description, Type, Due Date
- Store in MOCK_ACTIVITIES
- Show in activity lists across app

### 6. Theme Switching
- Read localStorage for preference
- Set theme on Context
- All components listen via useTheme hook
- Tailwind dark: classes apply styling

---

## Important Notes

### Limitations
1. **No Data Persistence**: All data resets on page refresh
2. **No Backend**: All data is client-side mock data
3. **No Real API**: Except for Google Gemini integration
4. **Single User**: No authentication or multi-user support
5. **No Database**: In-memory store only

### Future Enhancement Paths
1. Add backend API (Node.js/Express, Python/Django, etc.)
2. Implement database (PostgreSQL, MongoDB, etc.)
3. Add authentication (Firebase, Auth0, etc.)
4. Implement proper state management (Redux, Zustand)
5. Add real-time updates (WebSockets, Firebase Realtime)
6. Export to PDF/other formats
7. Add search indexing

### Code Quality Features
- TypeScript for type safety
- React hooks for state management
- Context API for theme management
- Component composition for reusability
- Responsive design with Tailwind
- Clean folder structure

---

## File Size & Performance Notes

### Bundle Optimization
- Vite handles code splitting automatically
- Tailwind CSS optimized via CDN
- React 19 improvements for bundle size
- No unnecessary dependencies

### Load Time Optimization
- Lazy loading of page components (could be improved with React.lazy)
- Mock data loads instantly (no network delay)
- Animations use CSS for performance

---

## Glossary of Terms

| Term | Definition |
|---|---|
| **Entity** | CRM concept - a record type (Project, Experience, Education, Activity) |
| **Opportunity** | CRM entity used for Projects in this app |
| **Account** | CRM entity used for Experience/Work history |
| **Contact** | CRM entity used for Education/Certifications |
| **Activity** | CRM entity for tasks, calls, emails, notes |
| **Lead** | CRM entity for contact requests |
| **Store** | In-memory data manager class in constants.ts |
| **appStore** | Instance of Store - the global data container |
| **Theme** | Light/dark mode styling (managed by ThemeContext) |
| **Mock Data** | Fake data for development (MOCK_PROJECTS, MOCK_EXPERIENCE, etc.) |

---

## Contact & Meta Information

**Project Owner**: Shivam
**Specialization**: Microsoft Dynamics 365 & .NET Developer
**Created**: 2026
**Last Reviewed**: February 11, 2026

---

**End of Documentation**
*This document serves as the single source of truth for understanding the dynamics-style-crm codebase. Update this file when making significant architectural changes.*
