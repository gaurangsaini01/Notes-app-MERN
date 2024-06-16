import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import Note from "../components/Note";

function Notes({ loginStatus, setLoginStatus }) {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    async function getNotes() {
      try {
        const response = await axiosInstance.get("/getallnotes");
        setNotes(response.data.notes);
      } catch (error) {
        console.log(error);
      }
    }
    getNotes();
  }, []);

  function handleChange(e) {
    setNote((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  async function addNote(e) {
    e.preventDefault();
    const response = await axiosInstance.post("/createnote", note);
    const newNote = response.data.createdNote;
    setNotes((prev) => [...prev, newNote]);
    setNote({ title: "", description: "" });
    toast.success("Note Created Successfully");
  }

  function onDelete(id) {
    setNotes((prev) => prev.filter((note) => note._id !== id));
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className=" text-center my-2 md:my-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800">
        Create Your Custom Notes !
      </h2>
      <form
        action=""
        className="2xl:w-1/2 flex-wrap w-full mx-auto flex items-center gap-2 md:gap-0 justify-evenly"
      >
        <input
          onChange={handleChange}
          autoComplete="off"
          type="text"
          id="title"
          name="title"
          value={note.title}
          placeholder="Enter Title here"
          className="px-6 py-1.5 rounded-md border-2 border-black"
        />
        <input
          onChange={handleChange}
          autoComplete="off"
          className="px-6 py-1.5 rounded-md  border-2 border-black"
          type="text"
          value={note.description}
          id="description"
          name="description"
          placeholder="Enter description here"
        />
        <Button onClick={addNote} ripple={true}>
          Create Note
        </Button>
      </form>
      {loginStatus && (
        <div className="md:w-[80%] w-full px-5 xl:px-0 mt-0 md:mt-6 flex flex-wrap gap-2 md:gap-5">
          {notes.map((note, index) => (
            <Note
              onDelete={onDelete}
              key={index}
              id={note._id}
              title={note.title}
              description={note.description}
            />
          ))}
        </div>
      )}
      {!loginStatus && (
        <div>
          <h2>
            Login to View/Create your Notes :{" "}
            {<Link to={"/login"}>Click Here</Link>}{" "}
          </h2>
        </div>
      )}
    </div>
  );
}

export default Notes;
