# Whisper Microfeed

A minimal micro feed application built with **Next.js (App Router) + TypeScript + Supabase**.  
It demonstrates core social feed functionality including authentication, post creation, likes, search, and pagination.

Repository: [github.com/PiyushPb/whisper-microfeed](https://github.com/PiyushPb/whisper-microfeed)
Live Demo : [https://whisper-micro-feed.vercel.app/](https://whisper-micro-feed.vercel.app/)

---

## Features

- User authentication with Supabase
- Create, edit, and delete posts (≤ 280 characters)
- Like and unlike posts with optimistic UI updates
- Search posts by keyword (server-side filtering)
- Paginated post listing (newest first)
- Filter between "All posts" and "My posts"
- Extended profile fields (avatar, bio, URL, verification flag)

---

## Tech Stack

- **Next.js (App Router, TypeScript)**
- **Supabase** (authentication, database, RLS policies)
- **Zod** for validation (client and server)
- **React Hooks** for data fetching and optimistic mutations
- **Tailwind CSS + shadcn/ui** for UI components

---

## File structure

```bash
src/
  app/ # pages, layouts, API route handlers
  components/ # UI components (auth, post, modals, layout)
  hooks/ # data fetching and mutations
  lib/ # supabase clients, utilities
  schemas/ # Zod validation schemas
  types/ # shared TypeScript types
  utils/ # helper functions
```

---

## Setup Instructions

1. **Clone the repository**
   ```bash
     git clone https://github.com/PiyushPb/whisper-microfeed.git
     cd whisper-microfeed
   ```
2. Install dependencies
   ```bash
     npm install
   ```
3. Environment variables
   Create a `.env.local` file with:
   ```env
      NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
      NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
      NEXT_MAX_POST_CONTENT_LIMIT=280
      NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```
4. Database setup
   - Use a Supabase project (hosted or local).
   - Apply the schema provided below and run it in the SQL Editor in supabase.
     ```sql
       -- profiles table
       create table if not exists profiles (
         id uuid primary key references auth.users(id) on delete cascade,
         username text unique not null,
         created_at timestamptz default now(),
         name text,
         email text,
         bio text,
         url text,
         is_verified bool default false,
         profile_url text
       );

       -- posts table
       create table if not exists posts (
         id uuid primary key default gen_random_uuid(),
         author_id uuid not null references profiles(id) on delete cascade,
         content text not null check (char_length(content) <= 280),
         created_at timestamptz default now(),
         updated_at timestamptz default now()
       );

       -- likes table
       create table if not exists likes (
         post_id uuid references posts(id) on delete cascade,
         user_id uuid references profiles(id) on delete cascade,
         created_at timestamptz default now(),
         primary key (post_id, user_id)
       );

       -- enable row level security
       alter table profiles enable row level security;
       alter table posts enable row level security;
       alter table likes enable row level security;

       -- policies

       -- profiles: read all, write self
       create policy "read profiles" on profiles for select using (true);
       create policy "upsert self profile" on profiles
         for all using (auth.uid() = id) with check (auth.uid() = id);

       -- posts: read all; insert/update/delete only own
       create policy "read posts" on posts for select using (true);
       create policy "insert own posts" on posts for insert with check (auth.uid() = author_id);
       create policy "update own posts" on posts for update using (auth.uid() = author_id);
       create policy "delete own posts" on posts for delete using (auth.uid() = author_id);

       -- likes: read all; like/unlike as self
       create policy "read likes" on likes for select using (true);
       create policy "like" on likes for insert with check (auth.uid() = user_id);
       create policy "unlike" on likes for delete using (auth.uid() = user_id);
     ```
   - This project extends profiles with additional fields (bio, url, is_verified, profile_url).
5. Run the development server
   ```bash
     npm run dev
   ```

---

## Design Notes

- **API Design**: Implemented with Next.js route handlers.
- **Validation**: All inputs are validated using Zod both on client and server.
- **Optimistic UI**: Implemented for post creation and like/unlike for a responsive experience.
- **Row Level Security**: Enforced in Supabase. Users can only edit or delete their own posts, and can only like/unlike as themselves.
- **Trade-offs**:
  - Skipped email verification due to time constraints.
  - Error messages are minimal, with room for improvement.
  - Styling kept modest to focus on structure and functionality.
