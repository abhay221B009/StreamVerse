import { useEffect, useState } from 'react';
import { useVideoStore } from '../store/videoStore';
import VideoCard from '../components/ui/VideoCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { categories } from '../data/mockData';
import { motion } from 'framer-motion';

const ExplorePage = () => {
  const { videos, fetchVideos } = useVideoStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredVideos, setFilteredVideos] = useState([...videos]);

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      
      try {
        if (videos.length === 0) {
          await fetchVideos();
        }
        
        // Initial filtering should use the videos after they've been fetched
        filterByCategory('All');
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadVideos();
  }, [videos.length, fetchVideos]);

  const filterByCategory = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'All') {
      setFilteredVideos([...videos]);
    } else {
      setFilteredVideos(
        videos.filter(video => video.category === category)
      );
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="mb-6 text-2xl font-bold">Explore</h1>
        
        {/* Category filters */}
        <div className="no-scrollbar -mx-4 flex overflow-x-auto px-4 pb-2">
          {['All', ...categories.filter(c => c !== 'All')].map(category => (
            <motion.button
              key={category}
              className={`mr-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                activeCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
              onClick={() => filterByCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-96 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="flex h-96 flex-col items-center justify-center rounded-lg bg-background-light p-8 text-center">
          <h2 className="mb-2 text-xl font-bold">No videos found</h2>
          <p className="text-neutral-400">
            No videos found in this category. Try a different category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;