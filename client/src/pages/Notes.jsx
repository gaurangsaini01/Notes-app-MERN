import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import Card from "../components/Card";

function Notes({ loginStatus, setLoginStatus }) {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    async function getNotes() {
      try {
        const response = await axiosInstance.get("/getAllNotes");
        setNotes(response.data.notes);
      } catch (e) {
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
    const response = await axiosInstance.post("/createNote", note);
    console.log(response);
    const newNote = response.data.createdNote;
    setNotes((prev) => [...prev, newNote]);
    setNote({ title: "", description: "" });
    toast.success("Note Created Successfully");
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-bold text-center my-2 md:my-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800">
        Create Your Custom Notes :)
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
          className="px-6 py-1.5 rounded-md focus:outline-dashed"
        />
        <input
          onChange={handleChange}
          autoComplete="off"
          className="px-6 py-1.5 rounded-md focus:outline-dashed"
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
        <div className="w-[80%] mt-10 flex flex-wrap justify-between gap-10">
          {notes.map((note, index) => (
            <Card
              key={index}
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
