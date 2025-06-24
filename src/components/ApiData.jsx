import React, { useState, useEffect } from 'react';
import Button from './Button';
import Card from './Card';

const ApiData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(prev => page === 1 ? jsonData : [...prev, ...jsonData]);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const filteredData = data.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <Card className="mt-8">
      <h2 className="text-2xl font-bold mb-6">API Data from JSONPlaceholder</h2>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      {loading && page === 1 ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-8">Error: {error}</div>
      ) : filteredData.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-center py-8">
          No posts found matching your search.
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {filteredData.map((post) => (
              <li
                key={post.id}
                className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
              >
                <h3 className="font-bold text-lg">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{post.body}</p>
              </li>
            ))}
          </ul>

          {data.length > 0 && !searchTerm && (
            <div className="mt-6 text-center">
              <Button onClick={loadMore} disabled={loading}>
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default ApiData;