import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useVideoStore } from '../store/videoStore';
import VideoCard from '../components/ui/VideoCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { categories } from '../data/mockData';
import { SlidersHorizontal, Filter } from 'lucide-react';

const SearchPage = () => {
  const location = useLocation();
  const { searchVideos, searchResults, fetchTrendingVideos, trendingVideos } = useVideoStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Extract query parameters
  const query = new URLSearchParams(location.search).get('q') || '';
  const categoryParam = new URLSearchParams(location.search).get('category') || '';
  const isTrending = new URLSearchParams(location.search).get('trending') === 'true';

  useEffect(() => {
    const loadResults = async () => {
      setIsLoading(true);
      
      try {
        if (isTrending) {
          // Load trending videos
          await fetchTrendingVideos();
          setActiveCategory('Trending');
        } else if (query || categoryParam) {
          // Search with query and/or category filter
          const category = categoryParam || activeCategory !== 'All' ? activeCategory : undefined;
          await searchVideos(query, { category });
          
          if (categoryParam && categories.includes(categoryParam)) {
            setActiveCategory(categoryParam);
          }
        } else {
          // Default to trending if no query
          await fetchTrendingVideos();
          setActiveCategory('Trending');
        }
      } catch (error) {
        console.error('Error loading search results:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadResults();
  }, [query, categoryParam, isTrending, searchVideos, fetchTrendingVideos]);

  const handleCategoryChange = async (category: string) => {
    setActiveCategory(category);
    setIsLoading(true);
    
    try {
      // If "All" is selected, search without category filter
      if (category === 'All') {
        await searchVideos(query);
      } 
      // If "Trending" is selected, fetch trending videos
      else if (category === 'Trending') {
        await fetchTrendingVideos();
      } 
      // Otherwise, search with category filter
      else {
        await searchVideos(query, { category });
      }
    } catch (error) {
      console.error('Error filtering by category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine which videos to display
  const displayVideos = isTrending || activeCategory === 'Trending' 
    ? trendingVideos 
    : searchResults;

  const resultsTitle = isTrending || activeCategory === 'Trending'
    ? 'Trending Videos'
    : query
      ? `Search results for "${query}"`
      : categoryParam
        ? `${categoryParam} videos`
        : 'Browse videos';

  return (
    <div className="mx-auto max-w-7xl">
      {/* Mobile filter toggle */}
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <h1 className="text-xl font-bold">{resultsTitle}</h1>
        <button 
          className="flex items-center gap-1 rounded-md bg-neutral-800 px-3 py-2 text-sm"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filters sidebar */}
        <div className={`lg:block ${isMobileFilterOpen ? 'block' : 'hidden'}`}>
          <div className="sticky top-20 rounded-lg bg-background-light p-4">
            <div className="mb-4 flex items-center">
              <SlidersHorizontal size={18} className="mr-2 text-neutral-400" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-medium">Categories</h3>
              <div className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      activeCategory === category
                        ? 'bg-primary-900/40 text-primary-400'
                        : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'
                    }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search results */}
        <div className="lg:col-span-3">
          <h1 className="mb-6 hidden text-2xl font-bold lg:block">{resultsTitle}</h1>
          
          {isLoading ? (
            <div className="flex h-96 items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : displayVideos.length === 0 ? (
            <div className="flex h-96 flex-col items-center justify-center rounded-lg bg-background-light p-8 text-center">
              <h2 className="mb-2 text-xl font-bold">No videos found</h2>
              <p className="text-neutral-400">
                Try different search terms or browse categories
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {displayVideos.map(video => (
                <VideoCard key={video.id} video={video} layout="list" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;