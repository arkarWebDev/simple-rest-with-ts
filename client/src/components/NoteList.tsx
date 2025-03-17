import React, { useEffect, useState } from "react";
import { createNote, deleteNote, getNotes, updateNote } from "../services/note";
import { Note } from "../types/note";

const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [msg, setMsg] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");

  const makeRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        throw new Error("Failed to fetch data.");
      }
    };
    fetchNotes();
  }, [refresh]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (msg.trim().length === 0) {
      return;
    }
    try {
      if (editMode) {
        await updateNote(editId, msg);
        setEditMode(false);
      } else {
        await createNote(msg);
      }
      setMsg("");
      makeRefresh();
    } catch (error) {
      throw new Error("Failed to add note.");
    }
  };

  const handleModeChange = (title: string, id: string) => {
    setEditMode(true);
    setMsg(title);
    setEditId(id);
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      makeRefresh();
    } catch (error) {
      throw new Error("Failed to delete note.");
    }
  };
  return (
    <div>
      <h2>Note List</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {note.title}{" "}
            <button type="button" onClick={() => handleDeleteNote(note._id)}>
              delete
            </button>
            <button
              type="button"
              onClick={() => handleModeChange(note.title, note._id)}
            >
              edit
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button>{editMode ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default NoteList;
