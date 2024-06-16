import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import axiosInstance from "../utils/axiosInstance";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    async function getNotes() {
      try {
        console.log("Hello");
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
    setNote({title:"",description:""})
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
      <div className="w-[80%] mt-10 flex flex-wrap justify-between gap-10">
        {notes.map((note, index) => (
          <div key={index} className="flex flex-col border-2 rounded-md w-[330px]">
            <h1 className="md:text-3xl text-xl text-gray-800 font-bold capitalize">{note.title}</h1>
            <h2>{note.description}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
