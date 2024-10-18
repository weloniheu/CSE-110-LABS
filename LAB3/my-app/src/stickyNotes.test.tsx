import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Sticky Notes", () => {
  // Read: Are all the notes that are created displayed on the page
  test("renders all sticky notes", () => {
    render(<StickyNotes />);

    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    // Creating two notes
    fireEvent.change(createNoteTitleInput, { target: { value: "First Note" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "First note content" } });
    fireEvent.click(createNoteButton);

    fireEvent.change(createNoteTitleInput, { target: { value: "Second Note" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Second note content" } });
    fireEvent.click(createNoteButton);

    // Check if both notes are rendered
    const firstNote = screen.getByText("First Note");
    const secondNote = screen.getByText("Second Note");
    expect(firstNote).toBeInTheDocument();
    expect(secondNote).toBeInTheDocument();
  });

  // Update: Is the note's content being updated correctly?f
  
  test("updates a sticky note", () => {
    render(<StickyNotes />);
  
    // Create a new note
    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentInput = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");
  
    fireEvent.change(titleInput, { target: { value: "Note to Update" } });
    fireEvent.change(contentInput, { target: { value: "Initial content" } });
    fireEvent.click(createButton);
  
    // Verify the note is created
    expect(screen.getByText("Initial content")).toBeInTheDocument();
  
    // Edit the note's content
    const editableContent = screen.getByText("Initial content");
  
    // Simulate user changing the content
    editableContent.innerText = "Updated content";
    fireEvent.input(editableContent);
    fireEvent.blur(editableContent); // If your component relies on blur to save changes
  
    // Verify the content has been updated

      expect(screen.getByText("Updated content")).toBeInTheDocument();

  });
  

  // Delete: Does the note get removed when the delete button is pressed?
  test("delete a note", () => {
    render(<StickyNotes />);
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "Note to Delete" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Content to Delete" } });
    fireEvent.click(createNoteButton);

    // Delete the note
    const deleteButtons = screen.getAllByText("x");
    fireEvent.click(deleteButtons[0]); //need to delete the first note

    expect(screen.queryByText("Note to Delete")).not.toBeInTheDocument();
    expect(screen.queryByText("Content to Delete")).not.toBeInTheDocument();
  })

});
