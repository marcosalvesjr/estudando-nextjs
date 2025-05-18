"use client";

import { useState } from "react";

export function Button() {
  const [name, setName] = useState("Marcos");

  const handleChange = () => {
    setName("Marcos Alves");
  };
  return (
    <div>
      <h3>Nome:{name}</h3>
      <button onClick={handleChange}>Alterar nome</button>
    </div>
  );
}
