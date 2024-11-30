import React from "react";
import Card from "./Card";

function Cards({ data }) {
  return (
    <div className="flex flex-wrap gap-4">
      {data[0]?.map((item, index) => (
        <Card key={index} user={item} />
        // <h1>hello</h1>
      ))}
    </div>
  );
}

export default Cards;
