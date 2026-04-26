import { useMutation, useQueryClient } from "react-query";
import { bookApi } from "../services/BookService";
import type { BookItem } from "../types/BookItem";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Stack, TextField } from "@mui/material";
import { useState } from "react";

interface AddBookModalProps {
  open: boolean;
  onClose: () => void;
}

function AddBookModal({ open, onClose }: AddBookModalProps) {
  const queryClient = useQueryClient();

  // Local form state
  const [title, setTitle] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { mutate: addBook, isLoading } = useMutation({
    mutationFn: (newItem: BookItem) => bookApi.saveBook(newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      handleClose();
    },
  });

  const handleClose = () => {
    setTitle('');
    setIsFavorite(false);
    setIsRead(false);
    setIsWishlisted(false);
    onClose();
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newItem: BookItem = {
      id: crypto.randomUUID(),
      book: { title: title.trim() },
      isFavorite,
      isRead,
      isWishlisted,
    };

    addBook(newItem);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Add New Book</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            label="Book Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isFavorite}
                onChange={(e) => setIsFavorite(e.target.checked)}
              />
            }
            label="Mark as Favorite"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isRead}
                onChange={(e) => setIsRead(e.target.checked)}
              />
            }
            label="Mark as Read"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isWishlisted}
                onChange={(e) => setIsWishlisted(e.target.checked)}
              />
            }
            label="Mark as Whishlisted"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading || !title.trim()}
        >
          {isLoading ? "Saving..." : "Add Book"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddBookModal