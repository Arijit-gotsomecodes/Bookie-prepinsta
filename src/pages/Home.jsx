import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'; // Import icons
import MainLayout from '../layouts/MainLayout'; // Import layout

function Home() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(storedBooks);
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <header className="flex flex-col md:flex-row md:justify-between items-center mb-12 p-6 bg-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-6 md:mb-0 mx-3">
          Explore Your Library
        </h1>
        
      </header>
      <div className="flex justify-center mb-12">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search books by title..."
            className="w-full p-4 pl-12 text-lg border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
        </div>
      </div>
      <main>
        {filteredBooks.length > 0 ? (
          <div className="px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {filteredBooks.map((book, index) => (
                <BookCard key={index} book={book} index={index} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-700 text-lg mt-20">
            No books found. Start by adding new titles to your collection.
          </div>
        )}
      </main>
    </MainLayout>
  );
}

export default Home;
