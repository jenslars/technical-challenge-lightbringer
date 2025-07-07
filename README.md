# Taskly AI Blog - Lightbringer Technical Challenge

This is a responsive blog explorer built with Next.js, TypeScript, and Tailwind CSS that (hopefully) matches the provided Figma design. 

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd technical-challenge-lightbringer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Design Implementation Notes

### Architecture Decisions
- **Next.js 15 with App Router**: I chose this for the modern React patterns and built-in optimizations it provides
- **TypeScript**: I used TypeScript for better type safety and developer experience
- **Tailwind CSS v4**: I went with Tailwind for styling to match the design tokens precisely.
- **Context API**: I used React Context for state management.
- **Custom Hooks**: I created custom hooks for modular logic separation and better maintainability

### Design Implementation Challenges & Solutions

#### 1. Responsive Design Implementation

For the responsive design, I decided to go with Tailwind CSS since it was mentioned in our interview that this is the tool you guys use for most of your styling. I had no prior experience with Tailwind, so it took me a bit of time to learn the exact commands and syntax, but since I have experience with other CSS frameworks, it wasn't too bad to pick up.

I used Tailwind's responsive utilities with custom breakpoints to match the Figma design across different screen sizes. I went with a mobile-first approach and built up from there, which made it easier to ensure the design looked good on all devices.

#### 2. Search & Filtering System

The search and filtering system was interesting to build. I decided to go with client-side filtering instead of using the API search to keep things fast and limit API calls. I created a `useDebouncedSearch` hook with a 300ms delay that prevents excessive re-renders while the user is typing - this makes the search feel really smooth and responsive.

I used the Context API to manage the search state across all components, which made it easy to share the search query and results between different parts of the app. I also made sure to handle a few edge cases properly, like showing certain messages when no results are found and adding loading states for a better user experience.

#### 3. Pagination with Filtering

Pagination was a bit tricky to get right, especially when it had to work together with the filtering system. I made sure to reset the pagination back to page 1 whenever filters change, this prevented users from ending up on empty pages when they switch categories or search for something new.

I also added a smooth scroll to the top when users change pages, which makes the navigation feel more polished. The pagination component itself is reusable and includes proper accessibility features like keyboard navigation and screen reader support.

#### 4. Component Architecture

For the component architecture, I focused making most components modular and reusable. I tried to structured the components with a clear separation of concerns, so each component has a single responsibility and can be easily tested or modified later even though I didn't write any tests. 

I used the compound component pattern for more complex UI elements like the blog cards, which made them flexible and easy to customize.

## Screenshots

### Desktop Implementation
[Desktop Figma](./screenshots/lightbringer-figma-desktop.png)
[Desktop Implementation](./screenshots/finished_prod_desktop.png)
*Comparison of desktop implementation vs Figma design*

### Mobile Implementation  
[Mobile Figma](./screenshots/lightbringer-figma-mobile.png)
[Mobile Implementation](./screenshots/finished_prod_mobile.png)
*Comparison of mobile implementation vs Figma design*

## Technical Decisions & Assumptions

### API Integration

I used the DummyJSON API for blog posts and images as specified in the requirements. Since the API doesn't include categories and some other metadata that were shown in the Figma design, I added mock data for these fields to make the app match the design more closely.

I made sure to implement proper error handling with error boundaries and loading states, so if the API fails or is slow, users get a good experience instead of just seeing broken pages.

### Performance Optimizations

For performance, I chose client-side filtering to give users immediate search results to not pile up too many API requests. I implemented debouncing to prevent excessive re-renders while users are typing.

I set up lazy loading for images so they only load when needed, which helps with the initial page load time. I also used React.memo for some of the more expensive components to prevent unnecessary re-renders and keep everything running smoothly.

### Accessibility

I made sure to use semantic HTML with proper heading hierarchy and landmarks so screen readers can navigate the app effectively. I added ARIA labels to all interactive elements like buttons and search inputs to make them more accessible.


## Project Structure
```
src/
├── app/                 # Next.js app router
├── components/          # Reusable UI components
│   ├── layout/         # Header, Footer, Navigation
│   ├── pages/          # Page-specific components
│   └── shared/         # Common components
├── hooks/              # Custom React hooks
├── services/           # API integration
├── types/              # TypeScript definitions
└── lib/                # Utility functions
```

**Note**: I focused on implementing the core functionality and design accuracy within the time constraint. Some bonus features like advanced sorting and comprehensive testing were scoped out to prioritize the main requirements. I'm happy with how the responsive design and search functionality turned out!
