import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Compass, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Music, 
  Film, 
  Gamepad2, 
  Zap, 
  Tv2, 
  Heart, 
  LogIn
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r border-neutral-800 bg-background">
      <div className="flex-1 p-4">
        <nav className="space-y-6">
          <div>
            <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Main
            </div>
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                >
                  <Home size={18} />
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/explore"
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                >
                  <Compass size={18} />
                  <span>Explore</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/search?trending=true"
                  className={({ isActive, isPending }) =>
                    `sidebar-link ${
                      isActive || 
                      (isPending && window.location.search.includes('trending=true')) 
                        ? 'active' 
                        : ''
                    }`
                  }
                >
                  <TrendingUp size={18} />
                  <span>Trending</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {isAuthenticated && (
            <div>
              <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Library
              </div>
              <ul className="space-y-1">
                <li>
                  <NavLink
                    to="/history"
                    className={({ isActive }) =>
                      `sidebar-link ${isActive ? 'active' : ''}`
                    }
                  >
                    <Clock size={18} />
                    <span>History</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          )}

          <div>
            <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Categories
            </div>
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/search?category=Movies"
                  className={({ isActive, isPending }) =>
                    `sidebar-link ${
                      isActive || 
                      (isPending && window.location.search.includes('category=Movies')) 
                        ? 'active' 
                        : ''
                    }`
                  }
                >
                  <Film size={18} />
                  <span>Movies</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/search?category=TV%20Shows"
                  className={({ isActive, isPending }) =>
                    `sidebar-link ${
                      isActive || 
                      (isPending && window.location.search.includes('category=TV')) 
                        ? 'active' 
                        : ''
                    }`
                  }
                >
                  <Tv2 size={18} />
                  <span>TV Shows</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/search?category=Music"
                  className={({ isActive, isPending }) =>
                    `sidebar-link ${
                      isActive || 
                      (isPending && window.location.search.includes('category=Music')) 
                        ? 'active' 
                        : ''
                    }`
                  }
                >
                  <Music size={18} />
                  <span>Music</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/search?category=Gaming"
                  className={({ isActive, isPending }) =>
                    `sidebar-link ${
                      isActive || 
                      (isPending && window.location.search.includes('category=Gaming')) 
                        ? 'active' 
                        : ''
                    }`
                  }
                >
                  <Gamepad2 size={18} />
                  <span>Gaming</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/search?category=Sports"
                  className={({ isActive, isPending }) =>
                    `sidebar-link ${
                      isActive || 
                      (isPending && window.location.search.includes('category=Sports')) 
                        ? 'active' 
                        : ''
                    }`
                  }
                >
                  <Zap size={18} />
                  <span>Sports</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/search?category=Learning"
                  className={({ isActive, isPending }) =>
                    `sidebar-link ${
                      isActive || 
                      (isPending && window.location.search.includes('category=Learning')) 
                        ? 'active' 
                        : ''
                    }`
                  }
                >
                  <BookOpen size={18} />
                  <span>Learning</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {!isAuthenticated && (
        <div className="border-t border-neutral-800 p-4">
          <div className="mb-2 text-sm text-neutral-400">
            Sign in to like videos, comment, and subscribe.
          </div>
          <NavLink
            to="/login"
            className="flex items-center gap-2 rounded-md bg-transparent px-4 py-2 text-sm font-medium text-primary-400 transition-colors hover:bg-primary-600/10"
          >
            <LogIn size={18} />
            <span>Sign In</span>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Sidebar;