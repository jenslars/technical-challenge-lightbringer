import { 
  DummyPost, 
  DummyPostsResponse, 
  BlogPost,
  PostCategory,
  FilterCategory,
  PaginationInfo
} from '../types/api';
import { API_CONFIG } from '../constants';
import { generateRandomDate} from '../lib/utils/date';

// API Service Functions
export class DummyJSONService {
  // Fetch posts with pagination
  static async getPosts(page: number = 1, limit: number = 100): Promise<DummyPostsResponse> {
    const skip = (page - 1) * limit;
    
    const url = `${API_CONFIG.BASE_URL}/posts?limit=${limit}&skip=${skip}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Generate dynamic image URL with random colors
  static getImageUrlForPost(postId: number, width: number = 400, height: number = 300): string {
    // Generate random background and text colors
    const bgColor = this.generateRandomColor();
    const textColor = this.generateRandomColor();
    
    // Use placeholder text instead of post ID
    const text = 'Placeholder+image';
    
    return `${API_CONFIG.BASE_URL}/image/${width}x${height}/${bgColor}/${textColor}?text=${text}`;
  }

  // Generate a random hex color
  private static generateRandomColor(): string {
    return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

  // Get single post by ID
  static async getPost(id: number): Promise<DummyPost> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/posts/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    
    return response.json();
  }
}

// Data transformation utilities
export class PostTransformer {
  // Random seed for this session (generated once on first use)
  private static sessionSeed: number | null = null;

  // list of AI-generated authors
  private static readonly AUTHORS = [
    'Sarah Chen',
    'Marcus Rodriguez',
    'Emily Watson',
    'David Kim',
    'Aisha Patel',
    'James Thompson',
    'Maria Garcia',
    'Alex Johnson',
    'Priya Sharma',
    'Michael Brown',
    'Lisa Anderson',
    'Robert Wilson',
    'Jennifer Lee',
    'Christopher Davis',
    'Amanda Taylor',
    'Daniel Martinez',
    'Rachel Green',
    'Kevin O\'Connor',
    'Sophie Williams',
    'Thomas Anderson'
  ];

  // Initialize session seed if not already set
  private static initializeSessionSeed(): void {
    if (this.sessionSeed === null) {
      this.sessionSeed = Math.floor(Math.random() * 1000000);
    }
  }

  // Generate a pseudo-random number based on seed and post ID
  private static seededRandom(seed: number, postId: number): number {
    // Simple but effective pseudo-random number generator
    const x = Math.sin(seed + postId) * 10000;
    return x - Math.floor(x);
  }

  // Transform DummyPost to BlogPost with mock data
  static transformToBlogPost(dummyPost: DummyPost): BlogPost {
    const author = this.getRandomAuthor(dummyPost.userId);
    const category = this.assignCategory(dummyPost);
    const imageUrl = DummyJSONService.getImageUrlForPost(dummyPost.id);
    
    return {
      ...dummyPost,
      author,
      publishDate: generateRandomDate(30, dummyPost.id),
      readTime: this.generateRandomReadTime(dummyPost.id),
      category,
      imageUrl,
      excerpt: dummyPost.body,
      tags: this.generateCategoryTags(category, dummyPost.id)
    };
  }

  private static getRandomAuthor(userId: number): string {
    // Use userId as seed for consistent author assignment per post
    const index = userId % this.AUTHORS.length;
    return this.AUTHORS[index];
  }

  private static assignCategory(post: DummyPost): PostCategory {
    // Initialize session seed if needed
    this.initializeSessionSeed();
    
    // Assign categories using pseudo-random number for better distribution
    const categories: PostCategory[] = ['AI Updates', 'Sustainability News', 'Tech Trends', 'Health Innovations'];
    const randomValue = this.seededRandom(this.sessionSeed || 0, post.id);
    const index = Math.floor(randomValue * categories.length);
    return categories[index];
  }

  private static generateRandomReadTime(postId: number): string {
    // Initialize session seed if needed
    this.initializeSessionSeed();
    
    const randomValue = this.seededRandom(this.sessionSeed || 0, postId);
    const minutes = Math.floor(randomValue * 7) + 4; // Random between 4-10 minutes
    return `${minutes} min`;
  }

  private static generateCategoryTags(category: PostCategory, postId: number): string[] {
    // Initialize session seed if needed
    this.initializeSessionSeed();
    
    const tagMap: Record<PostCategory, string[]> = {
      // AI-generated tags
      'AI Updates': ['AI', 'ML', 'Deep Learning', 'Neural Nets', 'AI Ethics', 'Auto'],
      'Sustainability News': ['Green Energy', 'Climate', 'Renewable', 'Carbon Free', 'Eco', 'Conserve'],
      'Tech Trends': ['Innovation', 'Digital', 'Emerging', 'Startups', 'Tech', 'Future'],
      'Health Innovations': ['Med Tech', 'Health', 'Bio', 'Digital Health', 'Wellness', 'Research']
    };

    const availableTags = tagMap[category];
    const selectedTags = [];
    const usedIndices = new Set<number>();
    
    // Select 3 unique tags
    for (let i = 0; i < 3; i++) {
      let tagIndex: number;
      let attempts = 0;
      const maxAttempts = availableTags.length; // Prevent infinite loop
      
      do {
        const randomValue = this.seededRandom(this.sessionSeed || 0, postId + i + attempts);
        tagIndex = Math.floor(randomValue * availableTags.length);
        attempts++;
      } while (usedIndices.has(tagIndex) && attempts < maxAttempts);
      
      // If we can't find a unique tag after max attempts, just use the last generated index
      usedIndices.add(tagIndex);
      selectedTags.push(availableTags[tagIndex]);
    }
    
    return selectedTags;
  }
}

// Search and filter utilities
export class SearchHelper {
  static filterPostsByCategory(posts: BlogPost[], category: FilterCategory): BlogPost[] {
    if (category === 'All') {
      return posts;
    }
    
    return posts.filter(post => post.category === category);
  }

  static searchPosts(posts: BlogPost[], query: string): BlogPost[] {
    if (!query.trim()) {
      return posts;
    }
    
    const searchTerm = query.toLowerCase();
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.body.toLowerCase().includes(searchTerm)
    );
  }
} 