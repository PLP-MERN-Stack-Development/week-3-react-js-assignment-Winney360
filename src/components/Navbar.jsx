import { Link } from 'react-router-dom';
import Button from './Button';
import { useTheme } from './ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo/Title */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              PLP Task Manager
            </Link>
          </div>

          {/* Right side - Navigation and Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <span className="text-gray-700 hover:text-yellow-500">🌙</span>
              ) : (
                <span className="text-yellow-300 hover:text-white">☀️</span>
              )}
            </button>

            {/* Navigation Links */}
            <Link to="/">
              <Button variant="secondary" size="sm" className="hidden sm:inline-block">
                Home
              </Button>
            </Link>
            <Link to="/tasks">
              <Button variant="primary" size="sm">
                Tasks
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;