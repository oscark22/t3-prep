import { NextPage } from "next";
import React, { SetStateAction, useState } from 'react';

import { trpc } from "../utils/trpc";


const exp: NextPage = () => {
  const allDoggos = trpc.example.getAllDoggos.useQuery();
  const createDoggo = trpc.example.createDoggo.useMutation();

  const [dogColor, setDogColor] = useState("");
  const [dogName, setDogName] = useState("");

  const handleCreateDoggo = async () => {
    createDoggo.mutate({
      color: dogColor,
      name: dogName
    });
  }

  return (
    <div>
      Dog color: <input type="text" name="dogColor" value={dogColor} onChange={(e) => setDogColor(e.target.value)}></input>
      <br />
      Dog name: <input type="text" name="dogName" value={dogName} onChange={(e) => setDogName(e.target.value)}></input>
      <br />
      <button type="button" onClick={handleCreateDoggo}>Submit doggo</button>
      <div>
        <p>Doggos availiable: </p>
        <ul>
          {
            allDoggos.data ? allDoggos.data.map(dog => {
            return <li>{dog.color}, {dog.name}</li>})
            : "Loading..."
          }
        </ul>
      </div>
    </div>
  );
}

export default exp
