import React from "react";

function Card({title,description}) {
  return (
    <div className="flex flex-col border-2 rounded-md w-[330px]">
      <h1 className="md:text-3xl text-xl text-gray-800 font-bold capitalize">
        {title}
      </h1>
      <h2>{description}</h2>
    </div>
  );
}

export default Card;
