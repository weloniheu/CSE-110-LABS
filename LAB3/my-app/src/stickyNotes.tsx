// stickyNotes.tsx
import { Label, Note } from "./types";
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from "./ThemeContext";
import { dummyNotesList } from "./constants";

export const StickyNotes = () => {
  // State and initializations
  const [notes, setNotes] = useState<Note[]>([]);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    isFavorite: false,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  // Handlers
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  const deleteNote = (noteId: number) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  const toggleFavorite = (id: number) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    );
    setNotes(updatedNotes);
  };

  const handleTitleChange = (e: React.FormEvent<HTMLHeadingElement>, id: number) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, title: e.currentTarget.textContent || '' } : note
    );
    setNotes(updatedNotes);
  };

  const handleContentChange = (e: React.FormEvent<HTMLParagraphElement>, id: number) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, content: e.currentTarget.textContent || '' } : note
    );
    setNotes(updatedNotes);
  };

  const theme = useContext(ThemeContext);

  return (
    <div className='app-container'>
      {/* Create Note Form */}
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            placeholder="Note Title"
            value={createNote.title}
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })}
            required
            style={{
              background: theme.inputbox,
              color: theme.lines,
              border: `1px solid ${theme.lines}`,
            }}>
          </input>
        </div>
        <div>
          <textarea
            placeholder="Note Content"
            value={createNote.content}
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })}
            required
            style={{
              background: theme.inputbox,
              color: theme.lines,
              border: `1px solid ${theme.lines}`,
            }}>
          </textarea>
        </div>
        <div>
          <select
            value={createNote.label}
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value as Label })}
            required
            style={{
              background: theme.inputbox,
              color: theme.lines,
              border: `1px solid ${theme.lines}`,
            }}>
            <option value={Label.other}>Other</option>
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
          </select>
        </div>
        <div><button type="submit">Create Note</button></div>
      </form>

      {/* Display Notes */}
      <div className="notes-grid" data-testid="notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item"
            style={{
              background: theme.inputbox,
              color: theme.lines,
              border: `1px solid ${theme.noteborder}`,
              boxShadow: `0px 0px 10px ${theme.noteglow}`,
            }}
          >
            <div className="notes-header"
              style={{
                background: theme.inputbox,
                color: theme.lines,
              }}>
              <button
                data-testid={`favorite-button-${note.id}`}
                onClick={() => toggleFavorite(note.id)}>
                {note.isFavorite ? '❤️' : '🤍'}
              </button>
              <button
                data-testid={`delete-button-${note.id}`}
                type="button"
                onClick={() => deleteNote(note.id)}
                style={{
                  color: theme.lines
                }}>x</button>
            </div>
            {/* Editable Title and Content */}
            <h2
              data-testid={`note-title-${note.id}`}
              contentEditable="true"
              onInput={(e) => handleTitleChange(e, note.id)}>
              {note.title}
            </h2>
            <p
              data-testid={`note-content-${note.id}`}
              contentEditable="true"
              onInput={(e) => handleContentChange(e, note.id)}>
              {note.content}
            </p>
            <p contentEditable="true">
              {note.label}
            </p>
          </div>
        ))}
      </div>

      {/* Favorite Section */}
      <div className="favorite-section">
        <h2>Favorites</h2>
        <ul>
          {notes.filter(note => note.isFavorite).map(note => (
            <li data-testid={`favorite-note-${note.id}`} key={note.id}>{note.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StickyNotes;
