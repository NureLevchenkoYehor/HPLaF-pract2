import { Bookmark, BookmarkBorder, Favorite, FavoriteBorder, MenuBook, MenuBookOutlined } from "@mui/icons-material"
import { Container, IconButton, List, ListItem, ListItemText, Stack, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQuery, useQueryClient } from "react-query";
import type { BookItem } from "../types/BookItem";
import { bookApi } from "../services/BookService";



function BooksList() {
  const queryClient = useQueryClient();

  const { mutate: deleteBook } = useMutation({
    mutationFn: bookApi.deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  const { mutate: updateBook } = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<BookItem> }) =>
      bookApi.updateBook(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  const { data: books, isLoading, error } = useQuery<BookItem[], Error>({
    queryKey: ['books'],
    queryFn: bookApi.fetchBooks,
  });



  if (isLoading) {
    return <div>Grabbing your books...</div>;
  }

  if (error) {
    return (
      <div>
        Error: {(error as Error).message ?? 'dih'}
      </div>
    );
  }

  if (!books) return null;

  return (
    <Container>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <List>
          {books.map((bookItem) => (
            <ListItem
              key={bookItem.id}
              divider
              secondaryAction={
                <Stack direction="row" spacing={1}>
                  <IconButton
                    onClick={() => updateBook({ id: bookItem.id, updates: { isFavorite: !bookItem.isFavorite } })}
                    color={bookItem.isFavorite ? "error" : "default"}
                  >
                    {bookItem.isFavorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>

                  <IconButton
                    onClick={() => updateBook({ id: bookItem.id, updates: { isRead: !bookItem.isRead } })}
                    color={bookItem.isRead ? "success" : "default"}
                  >
                    {bookItem.isRead ? <MenuBook /> : <MenuBookOutlined />}
                  </IconButton>

                  <IconButton
                    onClick={() => updateBook({ id: bookItem.id, updates: { isWishlisted: !bookItem.isWishlisted } })}
                    color={bookItem.isWishlisted ? "primary" : "default"}
                  >
                    {bookItem.isWishlisted ? <Bookmark /> : <BookmarkBorder />}
                  </IconButton>
                  <IconButton edge="end" onClick={() => deleteBook(bookItem.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemText
                primary={bookItem.book.title}
                secondary={bookItem.isRead ? "Completed" : "Unread"}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  )
}

export default BooksList