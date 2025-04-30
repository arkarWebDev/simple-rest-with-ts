import React, { useEffect, useState } from "react";
import { createNote, deleteNote, getNotes, updateNote } from "../services/note";
import { Note } from "../types/note";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";

const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [msg, setMsg] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

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
      <h2 className="text-2xl font-bold mb-6">Shares</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={index} className="flex items-center gap-2 mb-2">
            <p className="font-semibold">{note.title}</p>
            {note.userId === userInfo?._id && (
              <>
                <button
                  type="button"
                  onClick={() => handleDeleteNote(note._id)}
                  className="text-red-600 underline font-medium"
                >
                  delete
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange(note.title, note._id)}
                  className="underline font-medium"
                >
                  edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <>
        {userInfo ? (
          <form onSubmit={submitHandler}>
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="border p-2 text-sm mr-2"
            />
            <button className="text-white bg-black py-2 px-4 text-sm">
              {editMode ? "Update" : "Create"}
            </button>
          </form>
        ) : (
          <p className="border-2 px-4 py-2 w-fit">
            <Link to={"/login"} className="font-bold underline">
              Login
            </Link>{" "}
            for creating your own shares.
          </p>
        )}
      </>
    </div>
  );
};

export default NoteList;
