import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, updateNote, clearSelectedNote } from '../store/notesSlice';
import { X, Save } from 'lucide-react';

const NoteForm = () => {
  const dispatch = useDispatch();
  const { selectedNote } = useSelector(state => state.notes);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [selectedNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;

    if (selectedNote) {
      dispatch(updateNote({
        id: selectedNote.id,
        title: title.trim(),
        content: content.trim(),
      }));
    } else {
      dispatch(addNote({
        title: title.trim(),
        content: content.trim(),
      }));
    }

    setTitle('');
    setContent('');
  };

  const handleCancel = () => {
    dispatch(clearSelectedNote());
    setTitle('');
    setContent('');
  };

  return (
    <div className="note-form">
      <h2>{selectedNote ? 'Редактировать заметку' : 'Новая заметка'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="note-input"
        />
        <textarea
          placeholder="Содержание заметки..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          className="note-textarea"
        />
        <div className="form-actions">
          {selectedNote && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
            >
              <X size={16} />
              Отмена
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            <Save size={16} />
            {selectedNote ? 'Обновить' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;