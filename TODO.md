# 📋 Nextflix - Project TODO

> **Netflix Clone** - Full-featured Streaming Service Web Application
> 
> Last Updated: 2024-12-22

---

## 🎯 Progress Overview

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1: Foundation & Layouts | ✅ Complete | 100% |
| Phase 2: Core Pages | 🔲 Planned | 0% |
| Phase 3: Authentication | 🔲 Planned | 0% |
| Phase 4: Features | 🔲 Planned | 0% |
| Phase 5: Backend Integration | 🔲 Planned | 0% |

---

## ✅ Phase 1: Foundation & Layouts (COMPLETE)

### 1.1 Theme Provider & Dark Mode
- [x] Configure `next-themes` ThemeProvider in root layout
- [x] Create animated ThemeToggle component with react-spring
- [x] Implement dark/light mode persistence

### 1.2 MainLayout (Modern Netflix-style)
- [x] Create `main-layout.css` with Netflix design tokens
- [x] Create MainLayout wrapper component (full-screen, no-scroll)
- [x] MainHeader with glassmorphism effect
- [x] MainHeader navigation with animated underlines
- [x] MainHeader mobile responsive menu
- [x] MainFooter with organized link columns
- [x] Integrate ThemeToggle in header

### 1.3 RetroLayout (Internet Explorer 5 Style)
- [x] Create `retro-layout.css` with Windows 98 styling
- [x] Create RetroLayout wrapper component
- [x] RetroTitleBar with min/max/close buttons
- [x] RetroToolbar with Back/Forward/Home/Search buttons
- [x] RetroToolbar address bar
- [x] RetroStatusBar with "Done" indicator
- [x] Classic 3D border effects (raised/inset/sunken)
- [x] Retro scrollbar styling

### 1.4 Reusable UI Components
- [x] Modal - animated with keyboard support (Escape to close)
- [x] Button - multiple variants (primary, secondary, ghost, danger, netflix)
- [x] Input - floating labels, error states, icons
- [x] Select - searchable dropdown with animations
- [x] Popover - positioned tooltip/popup
- [x] Form - wrapper with field containers

### 1.5 Home Page
- [x] Domain entities/types definition
- [x] Mock data with 10 sample contents
- [x] Mock content repository with async methods
- [x] HomePresenter following Clean Architecture
- [x] useHomePresenter client hook
- [x] HomeView with loading/error states
- [x] HeroSection with featured content
- [x] ContentRow with horizontal scroll
- [x] ContentCard with hover preview animation
- [x] Integrate with MainLayout

---

## 🔲 Phase 2: Core Pages

### 2.1 Browse/Categories Page
- [ ] Create BrowseView component
- [ ] Genre filter sidebar/dropdown
- [ ] Grid layout for content cards
- [ ] Pagination or infinite scroll
- [ ] Sort options (newest, popular, A-Z)

### 2.2 Search Page
- [ ] Create SearchView component
- [ ] Real-time search input with debounce
- [ ] Search results grid
- [ ] Filter by type (Movies, Series, All)
- [ ] Filter by genre
- [ ] "No results" empty state
- [ ] Recent searches history

### 2.3 Content Detail Page
- [ ] Create ContentDetailView component
- [ ] Full backdrop hero section
- [ ] Detailed metadata (cast, director, year, rating)
- [ ] Episode list for series (expandable seasons)
- [ ] Similar content recommendations
- [ ] Add to watchlist button
- [ ] Play button → video player
- [ ] Trailer preview

### 2.4 Video Player Page
- [ ] Custom video player UI
- [ ] Play/Pause, Volume, Fullscreen controls
- [ ] Progress bar with preview thumbnails
- [ ] Skip intro button
- [ ] Next episode auto-play
- [ ] Subtitles/CC support
- [ ] Quality selection (720p, 1080p, 4K)
- [ ] Keyboard shortcuts

### 2.5 My List Page
- [ ] Create MyListView component
- [ ] Display saved content
- [ ] Remove from list functionality
- [ ] Empty state with browse CTA

### 2.6 Profile Selection Page
- [ ] Create ProfileSelectView component
- [ ] Profile avatars grid
- [ ] Add new profile button
- [ ] Kids profile indicator
- [ ] Edit profile functionality

### 2.7 Account/Settings Page
- [ ] Create AccountView component
- [ ] Profile management
- [ ] Language preferences
- [ ] Playback settings
- [ ] Parental controls
- [ ] Billing placeholder

---

## 🔲 Phase 3: Authentication

### 3.1 Login Page
- [ ] Create LoginView component
- [ ] Email/password form
- [ ] Remember me checkbox
- [ ] Form validation
- [ ] Error messages
- [ ] "Forgot password" link
- [ ] Sign up link

### 3.2 Registration Page
- [ ] Create RegisterView component
- [ ] Multi-step registration flow
- [ ] Email validation
- [ ] Password strength indicator
- [ ] Terms acceptance checkbox
- [ ] Plan selection (mock)

### 3.3 Forgot Password
- [ ] Create ForgotPasswordView component
- [ ] Email input form
- [ ] Success message

### 3.4 Authentication Logic
- [ ] AuthPresenter with state management
- [ ] Auth context/provider
- [ ] Protected route wrapper
- [ ] Session persistence
- [ ] Logout functionality

---

## 🔲 Phase 4: Features

### 4.1 Continue Watching
- [ ] Track watch progress (% watched)
- [ ] Continue watching row on home page
- [ ] Resume from last position

### 4.2 Ratings & Reviews
- [ ] Star/thumbs rating system
- [ ] User review submission
- [ ] Display average ratings

### 4.3 Recommendations Engine
- [ ] "Because you watched..." rows
- [ ] "Top 10 in Thailand" row
- [ ] Personalized recommendations (mock algorithm)

### 4.4 Notifications
- [ ] New release notifications
- [ ] "New episodes available" alerts
- [ ] Notification bell in header
- [ ] Notification dropdown

### 4.5 Download for Offline (UI Only)
- [ ] Download button on content
- [ ] Downloads page
- [ ] Download progress indicator

### 4.6 Multiple Audio/Subtitle Languages
- [ ] Language selector in player
- [ ] Audio track switching
- [ ] Subtitle language options

---

## 🔲 Phase 5: Backend Integration

### 5.1 Data Layer Preparation
- [x] Master data types & interfaces ✅
- [x] Mock repository implementation ✅
- [ ] Repository interface (abstract)
- [ ] Supabase client setup

### 5.2 Supabase Integration
- [ ] Supabase project configuration
- [ ] Database schema design
- [ ] Row Level Security (RLS) policies
- [ ] SupabaseContentRepository implementation
- [ ] Real data migration

### 5.3 User Management
- [ ] Supabase Auth integration
- [ ] User profiles table
- [ ] Watch history table
- [ ] Watchlist table

### 5.4 API Routes (if needed)
- [ ] Content API endpoints
- [ ] User preferences API
- [ ] Analytics/tracking API

---

## 📁 Project Structure

```
nextflix-nextjs/
├── app/                          # Next.js App Router
│   ├── layout.tsx               ✅ Root layout with providers
│   ├── page.tsx                 ✅ Home page
│   ├── browse/                  📋 TODO
│   ├── search/                  📋 TODO
│   ├── watch/[id]/              📋 TODO
│   ├── my-list/                 📋 TODO
│   ├── profile/                 📋 TODO
│   └── (auth)/                  📋 TODO
├── src/
│   ├── domain/
│   │   └── entities/types.ts    ✅ Domain types
│   ├── infrastructure/
│   │   ├── data/mockData.ts     ✅ Mock content data
│   │   └── repositories/        ✅ Mock repository
│   └── presentation/
│       ├── components/
│       │   ├── common/          ✅ ThemeToggle
│       │   ├── home/            ✅ Home components
│       │   ├── layouts/         ✅ Main & Retro layouts
│       │   └── ui/              ✅ Reusable UI components
│       ├── presenters/          ✅ HomePresenter
│       └── providers/           ✅ ThemeProvider
├── public/
│   └── styles/
│       ├── index.css            ✅ Main CSS entry
│       ├── main-layout.css      ✅ Modern Netflix styles
│       └── retro-layout.css     ✅ Windows 98/IE5 styles
└── prompt/                       # Development guides
```

---

## 🔧 Development Commands

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Run linting
yarn lint

# Type checking
yarn tsc --noEmit
```

---

## 📝 Development Notes

### Patterns to Follow
- **CREATE_PAGE_PATTERN.md** - All pages must follow this pattern
- **Clean Architecture** - Presenters, Views, Repositories separation
- **Server Components** - Use for SEO-critical pages
- **Client Components** - Use for interactive features

### Design Guidelines
- MainLayout: Modern, glassmorphism, react-spring animations
- RetroLayout: Windows 98/IE5 aesthetic, 3D borders
- UI Components: Match MainLayout modern style

### Data Strategy
1. Build UI with mock data first
2. Complete all pages and features
3. Replace mock repository with Supabase repository
