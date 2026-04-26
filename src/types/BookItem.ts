export interface BookItem {
  id: string;
  book: Book,
  isFavorite: boolean,
  isRead: boolean,
  isWishlisted: boolean
}

interface Book {
  title: string,
}