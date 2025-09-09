import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockVideos } from '../data/mockData';

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  uploadDate: string;
  channel: {
    id: string;
    name: string;
    avatar: string;
    subscribers: string;
  };
  category: string;
  tags: string[];
  videoUrl: string;
}

interface VideoState {
  videos: Video[];
  trendingVideos: Video[];
  recommendedVideos: Video[];
  searchResults: Video[];
  watchHistory: string[];
  
  // Actions
  fetchVideos: () => Promise<Video[]>;
  fetchTrendingVideos: () => Promise<Video[]>;
  fetchRecommendedVideos: () => Promise<Video[]>;
  searchVideos: (query: string, filters?: { category?: string }) => Promise<Video[]>;
  addToHistory: (videoId: string) => void;
  clearHistory: () => void;
}

export const useVideoStore = create<VideoState>()(
  persist(
    (set, get) => ({
      videos: [],
      trendingVideos: [],
      recommendedVideos: [],
      searchResults: [],
      watchHistory: [],

      fetchVideos: async () => {
        // This would be an API call in a real application
        // Simulating API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        set({ videos: mockVideos });
        return mockVideos;
      },

      fetchTrendingVideos: async () => {
        // Simulating API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sort by views and take top 10
        const trending = [...mockVideos]
          .sort((a, b) => b.views - a.views)
          .slice(0, 10);
        
        set({ trendingVideos: trending });
        return trending;
      },

      fetchRecommendedVideos: async () => {
        // Simulating API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Randomize videos for recommended section
        const shuffled = [...mockVideos].sort(() => 0.5 - Math.random());
        const recommended = shuffled.slice(0, 10);
        
        set({ recommendedVideos: recommended });
        return recommended;
      },

      searchVideos: async (query: string, filters = {}) => {
        // Simulating API call delay
        await new Promise(resolve => setTimeout(resolve, 300));

        const searchTerm = query.toLowerCase();
        
        let results = mockVideos.filter(video => 
          video.title.toLowerCase().includes(searchTerm) || 
          video.description.toLowerCase().includes(searchTerm) ||
          video.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        
        // Apply category filter if provided
        if (filters.category) {
          results = results.filter(video => 
            video.category.toLowerCase() === filters.category?.toLowerCase()
          );
        }
        
        set({ searchResults: results });
        return results;
      },

      addToHistory: (videoId: string) => {
        set(state => {
          // Remove if exists to avoid duplicates
          const filteredHistory = state.watchHistory.filter(id => id !== videoId);
          // Add to the beginning
          return { watchHistory: [videoId, ...filteredHistory] };
        });
      },

      clearHistory: () => {
        set({ watchHistory: [] });
      },
    }),
    {
      name: 'streamvista-storage',
      partialize: (state) => ({ watchHistory: state.watchHistory }),
    }
  )
);