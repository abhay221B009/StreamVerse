import { useEffect, useState } from 'react';
import { useVideoStore, Video } from '../store/videoStore';
import VideoCard from '../components/ui/VideoCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const HomePage = () => {
  const { 
    fetchTrendingVideos, 
    trendingVideos,
    fetchRecommendedVideos,
    recommendedVideos
  } = useVideoStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [featuredVideo, setFeaturedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        // Load trending videos for featured section
        const trending = await fetchTrendingVideos();
        if (trending.length > 0) {
          setFeaturedVideo(trending[0]);
        }
        
        // Load recommended videos
        await fetchRecommendedVideos();
      } catch (error) {
        console.error('Error loading homepage data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [fetchTrendingVideos, fetchRecommendedVideos]);
  
  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Hero Section */}
      <section className="mb-10">
        {featuredVideo && (
          <VideoCard video={featuredVideo} layout="featured" />
        )}
      </section>

      {/* Trending Section */}
      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-bold">Trending Now</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trendingVideos.slice(1).map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* Recommended Section */}
      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-bold">Recommended for You</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recommendedVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;