import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredNotes } from '../store/notesSlice';
import NoteItem from './NoteItem';

const NoteList = () => {
  const notes = useSelector(selectFilteredNotes);
  const { searchQuery } = useSelector(state => state.notes);

  if (notes.length === 0) {
    return (
      <div className="notes-container">
        <div className="empty-state">
          {searchQuery ? 'Заметки не найдены' : 'Заметок пока нет'}
        </div>
      </div>
    );
  }

  return (
    <div className="notes-container">
      {notes.map(note => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;