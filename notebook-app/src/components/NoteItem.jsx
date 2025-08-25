import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedNote, deleteNote } from '../store/notesSlice';
import { Edit, Trash2, Calendar, Clock } from 'lucide-react';

const NoteItem = ({ note }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setSelectedNote(note));
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту заметку?')) {
      dispatch(deleteNote(note.id));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="note-item">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button onClick={handleEdit} className="btn-icon" title="Редактировать">
            <Edit size={16} />
          </button>
          <button onClick={handleDelete} className="btn-icon btn-danger" title="Удалить">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <p className="note-content">{note.content}</p>
      <div className="note-footer">
        <span className="note-date">
          <Calendar size={14} />
          {formatDate(note.createdAt)}
        </span>
        <span className="note-time">
          <Clock size={14} />
          {formatTime(note.updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default NoteItem;