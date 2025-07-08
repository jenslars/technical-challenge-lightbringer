// API Types for the blog application

// DummyJSON API response types
export interface DummyPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface DummyPostsResponse {
  posts: DummyPost[];
  total: number;
  skip: number;
  limit: number;
}

// Blog application types
export type PostCategory = 'AI Updates' | 'Sustainability News' | 'Tech Trends' | 'Health Innovations';
export type FilterCategory = PostCategory | 'All';

export interface BlogPost extends DummyPost {
  author: string;
  publishDate: string;
  readTime: string;
  category: PostCategory;
  imageUrl: string;
  excerpt: string;
}

// Search and filter types
export interface SearchFilters {
  query: string;
  category: FilterCategory;
  page: number;
}

// Pagination types
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} 