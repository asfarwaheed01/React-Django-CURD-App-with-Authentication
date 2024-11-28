import { useEffect, useState } from "react";
import api from "../utils/api"
import Notes from "../components/Notes";
import "../styles/Home.css"


const Home = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await api
      .get("/api/notes/")
      .then((response) => response.data)
      .then((data) => {
        setNotes(data);
      })
      .catch((error) => alert(error));
  };

  const deleteNote = async (id) => {
    await api
      .delete(`/api/notes/delete/${id}/`)
      .then((response) => {
        if (response.status === 204) {
          alert("Note Deleted!");
          getNotes();
        } else alert("Failed to delete note.");
      })
      .catch((error) => alert(error));
  };

  const createNote = async (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((response) => {
        if (response.status === 201) {
          alert("Note created successfully!");
          getNotes();
        } else {
          alert("Failed to create note");
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="home-container">
      <h1>Notes</h1>

      <div className="notes-list">
        {notes.map((note) => (
          <Notes note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>

      <div className="create-note-container">
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="content">Content:</label>
          <textarea
            name="content"
            id="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
