import React from "react";
import Card from "./Card";

function Cards({ data }) {
  console.log(data);

  return (
    <div className="flex flex-wrap gap-4">
      {data?.map((item, index) => (
        <Card key={index} user={item} />
      ))}
    </div>
  );
}

export default Cards;
