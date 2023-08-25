import React, { useState } from "react";
import { Link } from "react-router-dom";
let user;

const sendUser = () => {
    user = document.getElementById("username").value;
    document.getElementById("username").value = " "
};
const Join = () => {
  const [Name , setName] = useState(" ");


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Join Chat Room</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="w-full p-2 border rounded"
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="username"
            placeholder="Enter your username"
          />
        </div>
        <Link to="/chat" onClick={(e) => !Name ? e.preventDefault() : null}>
          <button onClick={sendUser}  className="mt-6 px-4 py-2 bg-blue-500 text-white rounded w-full">
            Join Chat
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export {user};
