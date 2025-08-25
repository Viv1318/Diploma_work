import React from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';
import { Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedNote } from './store/notesSlice';
// import './App.css'

function App() {
  const dispatch = useDispatch();
  const { selectedNote } = useSelector(state => state.notes);

  const handleNewNote = () => {
    dispatch(clearSelectedNote());
  };

  return (
        <div className="app">
      <header className="app-header">
        <h1>📝 Записная книжка</h1>
        <div className="header-actions">
          {!selectedNote && (
            <button onClick={handleNewNote} className="btn btn-primary">
              <Plus size={16} />
              Новая заметка
            </button>
          )}
        </div>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <SearchBar />
          <NoteList />
        </aside>

        <section className="content">
          <NoteForm />
        </section>
      </main>
    </div>
  )
}

export default App
