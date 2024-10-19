// stickyNotes.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import '@testing-library/jest-dom';

describe("StickyNotes Component", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);
    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates multiple notes and displays them", () => {
    render(<StickyNotes />);
    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentInput = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");

    // Create first note
    fireEvent.change(titleInput, { target: { value: "First Note" } });
    fireEvent.change(contentInput, { target: { value: "First Content" } });
    fireEvent.click(createButton);

    // Create second note
    fireEvent.change(titleInput, { target: { value: "Second Note" } });
    fireEvent.change(contentInput, { target: { value: "Second Content" } });
    fireEvent.click(createButton);

    // Check that both notes are displayed
    expect(screen.getByText("First Note")).toBeInTheDocument();
    expect(screen.getByText("Second Note")).toBeInTheDocument();
    expect(screen.getByText("First Content")).toBeInTheDocument();
    expect(screen.getByText("Second Content")).toBeInTheDocument();
  });

  test("updates a note's title and content", () => {
    render(<StickyNotes />);
    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentInput = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");

    // Create a note
    fireEvent.change(titleInput, { target: { value: "Original Title" } });
    fireEvent.change(contentInput, { target: { value: "Original Content" } });
    fireEvent.click(createButton);

    // Get the note elements
    const noteTitle = screen.getByTestId("note-title-1");
    const noteContent = screen.getByTestId("note-content-1");

    // Update title and content
    fireEvent.input(noteTitle, { target: { textContent: "Updated Title" } });
    fireEvent.input(noteContent, { target: { textContent: "Updated Content" } });

    // Verify updates
    expect(noteTitle.textContent).toBe("Updated Title");
    expect(noteContent.textContent).toBe("Updated Content");
  });

  test("deletes a note when delete button is clicked", () => {
    render(<StickyNotes />);
    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentInput = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");

    // Create a note
    fireEvent.change(titleInput, { target: { value: "Note to Delete" } });
    fireEvent.change(contentInput, { target: { value: "Content to Delete" } });
    fireEvent.click(createButton);

    // Verify note is displayed
    expect(screen.getByText("Note to Delete")).toBeInTheDocument();

    // Click delete button
    const deleteButton = screen.getByTestId("delete-button-1");
    fireEvent.click(deleteButton);

    // Verify note is removed
    expect(screen.queryByText("Note to Delete")).not.toBeInTheDocument();
  });

  test("marks a note as favorite and displays it in favorites", () => {
    render(<StickyNotes />);
    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentInput = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");

    // Create a note
    fireEvent.change(titleInput, { target: { value: "Favorite Note" } });
    fireEvent.change(contentInput, { target: { value: "Favorite Content" } });
    fireEvent.click(createButton);

    // Mark as favorite
    const favoriteButton = screen.getByTestId("favorite-button-1");
    fireEvent.click(favoriteButton);

    // Verify note appears in favorites
    const favoriteNote = screen.getByTestId("favorite-note-1");
    expect(favoriteNote).toBeInTheDocument();
    expect(favoriteNote).toHaveTextContent("Favorite Note");
  });

  test("displays no notes when none are created", () => {
    render(<StickyNotes />);
    const notesGrid = screen.getByTestId("notes-grid");
    expect(notesGrid.childElementCount).toBe(0);
  });
});
