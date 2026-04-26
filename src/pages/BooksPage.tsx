import { Box, Fab, } from '@mui/material';
import AddBookModal from '../components/AddBookModal';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import BooksList from '../components/BooksList';

function BookPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main>
      <Box sx={{ p: 2 }}>
        <AddBookModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => setModalOpen(true)}
        >
          <AddIcon />
        </Fab>
      </Box>

      <BooksList />
    </main>
  );
}

export default BookPage;