import React from "react";
import { useEffect, useState } from "react";
import Cards from "../Components/Cards";
import { useUsersContext } from "../Components/UserContext";

function Homepage() {
  const { data } = useUsersContext();

  return (
    <div>
      <Cards data={data} />
    </div>
  );
}

export default Homepage;
