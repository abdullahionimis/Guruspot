-- Phase 2: GuruSpot Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Users Table (Linked to Supabase Auth)
CREATE TABLE public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email varchar unique not null,
  full_name varchar not null,
  avatar_url text,
  skill_level varchar check (skill_level in ('beginner', 'intermediate', 'advanced')),
  interests text[],
  goals text[],
  badge_count int default 0,
  is_onboarded boolean default false,
  is_admin boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Learning Paths
CREATE TABLE public.learning_paths (
  id uuid primary key default gen_random_uuid(),
  title varchar not null,
  description text,
  skill_level varchar check (skill_level in ('beginner', 'intermediate', 'advanced')),
  created_at timestamptz default now()
);

-- 3. Milestones
CREATE TABLE public.milestones (
  id uuid primary key default gen_random_uuid(),
  path_id uuid references public.learning_paths(id) on delete cascade,
  title varchar not null,
  description text,
  order_index int not null,
  created_at timestamptz default now()
);

-- 4. Resources
CREATE TABLE public.resources (
  id uuid primary key default gen_random_uuid(),
  milestone_id uuid references public.milestones(id) on delete cascade,
  title varchar not null,
  url varchar not null,
  type varchar,
  created_at timestamptz default now()
);

-- 5. User Progress
CREATE TABLE public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  path_id uuid references public.learning_paths(id) on delete cascade,
  milestone_id uuid references public.milestones(id) on delete cascade,
  resource_id uuid references public.resources(id) on delete cascade,
  status varchar check (status in ('not_started', 'in_progress', 'completed')) default 'not_started',
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. Badges
CREATE TABLE public.badges (
  id uuid primary key default gen_random_uuid(),
  name varchar not null,
  description text,
  icon_url varchar,
  created_at timestamptz default now()
);

-- 7. User Badges
CREATE TABLE public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  badge_id uuid references public.badges(id) on delete cascade,
  awarded_at timestamptz default now()
);

-- 8. Feed Posts
CREATE TABLE public.feed_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  content text not null,
  media_urls text[],
  created_at timestamptz default now()
);

-- 9. Community Posts
CREATE TABLE public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  title varchar not null,
  content text not null,
  tags text[],
  created_at timestamptz default now()
);

-- 10. Comments
CREATE TABLE public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  feed_post_id uuid references public.feed_posts(id) on delete cascade,
  community_post_id uuid references public.community_posts(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

-- 11. Post Likes
CREATE TABLE public.post_likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  feed_post_id uuid references public.feed_posts(id) on delete cascade,
  community_post_id uuid references public.community_posts(id) on delete cascade,
  created_at timestamptz default now()
);

-- 12. Notifications
CREATE TABLE public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  type varchar not null,
  content text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- 13. Saved Resources
CREATE TABLE public.saved_resources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  resource_id uuid references public.resources(id) on delete cascade,
  saved_at timestamptz default now()
);
