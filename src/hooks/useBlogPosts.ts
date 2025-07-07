"use client"

import { useState, useEffect, useCallback } from 'react';
import { DummyPost, DummyPostsResponse } from '../types/api';
import { DummyJSONService, PostTransformer } from '../services/blogService';
import { BlogPost } from '../types/api';

interface UseBlogPostsReturn {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useBlogPosts = (): UseBlogPostsReturn => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all posts from API
      const response: DummyPostsResponse = await DummyJSONService.getPosts(1, 100);
      
      // Transform posts to include mock data
      const transformedPosts = response.posts.map((post: DummyPost) => 
        PostTransformer.transformToBlogPost(post)
      );

      setPosts(transformedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch posts on initial load
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts
  };
}; 