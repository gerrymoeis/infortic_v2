# Decisions and Changes Log

This document records significant architectural decisions and changes made to the Infortic project.

## 2025-06-26: Refactoring Search, Filter, and SEO Functionality

### 1. **Objective**

The primary goal was to refactor the competition ("Lomba") and internship ("Magang") search and filtering functionality. The key change was moving all logic from the client-side to the backend to improve performance, scalability, and maintainability. A secondary objective was to implement a foundational SEO strategy.

### 2. **Architectural Changes: Client-Side to Backend Logic**

- **Previous State:** All data was fetched to the client, and then filtering (by search text, category, etc.) was performed in the browser using JavaScript. This was inefficient for large datasets.
- **New State:** All filtering logic now resides in the backend, executed directly within the Supabase PostgreSQL database using RPC (Remote Procedure Call) functions. The frontend now only sends the user's search and filter criteria to the backend and receives a pre-filtered, smaller dataset.

### 3. **Backend Implementation: Supabase RPC Functions**

Two new database functions were created:

-   `get_matching_competition_ids(search_text TEXT, category_slugs TEXT[])`:
    -   Performs a full-text search on the `title` and `description` of competitions.
    -   Filters competitions by one or more category slugs.
    -   Returns only the IDs of the matching competitions, which is highly efficient.

-   `get_matching_internship_ids(search_text TEXT)`:
    -   Performs a full-text search on internship `title` and `description`.
    -   Returns the IDs of matching internships.

These functions leverage PostgreSQL's `to_tsvector` and `websearch_to_tsquery` for powerful and fast text searching.

### 4. **Frontend Implementation**

-   **Data Fetching (`src/lib/supabase.ts`):**
    -   The `getCompetitions` and `getInternships` functions were updated. They now first call the new RPC functions to get a list of matching IDs, and then fetch the full data only for those specific IDs.

-   **Lomba Page (`src/app/lomba/page.tsx`):**
    -   All client-side filtering logic was removed.
    -   State management was simplified to handle search text and selected categories, which are passed to `getCompetitions`.
    -   A new `FilterDialog` component was created to support multi-select category filtering.

-   **Magang Page (`src/app/magang/page.tsx`):**
    -   All client-side filtering was removed.
    -   The page now uses a debounced search input to call the updated `getInternships` function, reducing unnecessary API calls.

### 5. **SEO & UI/UX Enhancements**

-   **Competition Detail Page (`src/app/lomba/[id]/page.tsx`):**
    -   Redesigned for better layout and readability.
    -   Implemented dynamic metadata (`generateMetadata`) for improved SEO.
    -   Added structured data (JSON-LD `Event` schema) to enable rich snippets in search results.
    -   Integrated `react-markdown` to correctly render formatted descriptions.

-   **Site-wide SEO:**
    -   Created a `public/robots.txt` file to guide search engine crawlers.
    -   Implemented a dynamic sitemap at `/sitemap.xml` to ensure all pages are indexed.
    -   Added unique, descriptive metadata to the main static pages (`/lomba`, `/magang`).

-   **Component Polish:**
    -   Enhanced button hover animations on `CompetitionCard` and `InternshipCard` for a more dynamic and consistent user experience.

### 6. **Dependencies Added**

-   `react-markdown`: For rendering markdown content.
-   `remark-gfm`: A `react-markdown` plugin for GitHub Flavored Markdown support.
-   `@tailwindcss/typography`: A Tailwind CSS plugin for styling markdown content.
