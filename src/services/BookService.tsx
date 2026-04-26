import type { BookItem } from "../types/BookItem";

const STORAGE_KEY = "books";

export const bookApi = {
  fetchBooks: async (): Promise<BookItem[]> => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveBook: async (newBook: BookItem): Promise<BookItem[]> => {
    const books = await bookApi.fetchBooks();
    const updatedBooks = [...books, newBook];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
    return updatedBooks;
  },

  deleteBook: async (id: string): Promise<BookItem[]> => {
    const books = await bookApi.fetchBooks();
    const updatedBooks = books.filter(bookItem => bookItem.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
    return updatedBooks;
  },

  updateBook: async (id: string, updates: Partial<BookItem>): Promise<BookItem[]> => {
    const books = await bookApi.fetchBooks();
    const updatedBooks = books.map(bookItem =>
      bookItem.id === id ? { ...bookItem, ...updates } : bookItem
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
    return updatedBooks;
  }
};