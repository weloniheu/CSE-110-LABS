// import './App.css';
import { Label, Note } from "./types"; // import the lable type from the appropriate module
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./ThemeContext";
import { dummyNotesList } from "./constants";
// import ClickCount from "./hooksExercise";


export const StickyNotes = () => {
    // your code from App.tsx


    //making the notes area
    // const [notes, setNotes] = useState<Note[]>(dummyNotesList);
    const [notes, setNotes] = useState<Note[]>([]);

    // const [notes, setNotes] = useState<Note[]>([]]); // if I want to not have the dummynotes

    const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    isFavorite: false,
    };

    const [createNote, setCreateNote] = useState(initialNote);

    const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length+1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
    };


    // delete note
    const deleteNote = (noteId: number) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    };


    // Favorite Area

    const toggleFavorite = (id: number) => {
    // Update the favorite status for the selected note
    const updatedNotes = notes.map(note =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    );
    setNotes(updatedNotes);

    // Log the updated state for debugging purposes
    console.log('Updated Notes:', updatedNotes);
    };

    useEffect(() => {
    // This effect runs every time the `notes` state changes
    console.log('Notes state updated:', notes);
    }, [notes]);
    
    // Toggle area
    const theme = useContext(ThemeContext);

    // Edit notes

    function handleContentInput(e) {
        const newContent = e.currentTarget.innerText;
        // Update the note's content in your state
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === currentNoteId ? { ...note, content: newContent } : note
          )
        );
      }

//actual application
    return (
        <div className='app-container' 
        // style={{
        //     background: theme.background,
        //     color: theme.lines,
        // }}
        >
        {/* <button onClick={() => console.log('Notes length:', notes.length)}>
        Print Notes Length
        </button> */}
            {/* create form */}
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
                    setCreateNote({ ...createNote, label: event.target.value as Label})}
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

            {/* display notes */}
            <div className="notes-grid">
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
                    <button onClick={() => toggleFavorite(note.id)}>
                    {note.isFavorite ? '❤️' : '🤍'}
                    </button>
                    <button type="button" onClick={() => deleteNote(note.id)} 
                    style={{
                    color: theme.lines
                    }}>x</button>
                </div>
                <h2 contentEditable="true">
                    {note.title}
                    </h2>
                    <p contentEditable="true">
                    {note.content}
                    </p>
                    <p contentEditable="true">
                    {note.label}
                    </p>
                </div>
            ))}
            </div>
            {/* favorite sections below note form and notes */}
            <div className="favorite-section">
                <h2>Favorites</h2>
                <ul>
                {notes.filter(note => note.isFavorite).map(note => (
                    <li key={note.id}>{note.title}</li>
                ))}
                </ul>
            </div>
        </div>
    );
 
}

export default StickyNotes
