import React from "react";
import { Button } from "@material-tailwind/react";
function Notes() {
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
          autoComplete="off"
          type="text"
          id="title"
          name="title"
          placeholder="Enter Title here"
          className="px-6 py-1.5 rounded-md focus:outline-dashed"
        />
        <input
          autoComplete="off"
          className="px-6 py-1.5 rounded-md focus:outline-dashed"
          type="text"
          id="description"
          name="description"
          placeholder="Enter description here"
        />
        <Button ripple={true}>Create Note</Button>
      </form>
    </div>
  );
}

export default Notes;
