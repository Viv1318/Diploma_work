import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: JSON.parse(localStorage.getItem('notes')) || [],
  searchQuery: '',
  selectedNote: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: Date.now(),
        title: action.payload.title,
        content: action.payload.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.notes.unshift(newNote);
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
    updateNote: (state, action) => {
      const { id, title, content } = action.payload;
      const noteIndex = state.notes.findIndex(note => note.id === id);
      if (noteIndex !== -1) {
        state.notes[noteIndex] = {
          ...state.notes[noteIndex],
          title,
          content,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem('notes', JSON.stringify(state.notes));
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
      localStorage.setItem('notes', JSON.stringify(state.notes));
      if (state.selectedNote?.id === action.payload) {
        state.selectedNote = null;
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedNote: (state, action) => {
      state.selectedNote = action.payload;
    },
    clearSelectedNote: (state) => {
      state.selectedNote = null;
    },
  },
});

export const {
  addNote,
  updateNote,
  deleteNote,
  setSearchQuery,
  setSelectedNote,
  clearSelectedNote,
} = notesSlice.actions;

export const selectFilteredNotes = (state) => {
  const { notes, searchQuery } = state.notes;
  if (!searchQuery) return notes;
  
  return notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export default notesSlice.reducer;