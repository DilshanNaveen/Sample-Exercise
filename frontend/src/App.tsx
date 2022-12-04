import React, { useEffect, useState } from 'react';
import BookTable from './components/BookTable';
import Model from './components/Model';
import Book from './type/book';
import { getAllBooks } from './util/bookService';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookId, setBookId] = useState<string>();

  const fetchData = async() => {
      const data: Book[] = await getAllBooks();
      setBooks(data)
  }

  const onClose = () => {
    setBookId(undefined);
    fetchData();
  }

  useEffect(() => {
      fetchData();
  }, []);

  return (
    <div>
      <BookTable books={books} onBookSelect={setBookId} />
      <Model bookId={bookId} onClose={onClose} />
    </div>
  );
}

export default App;
