// src/components/AccountsCreationTab.tsx
import React, { useState } from "react";

const AccountCreationTab: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    alert(
      `Account created successfully!\nUsername: ${username}\nPassword: ${password}`
    );
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-4xl mt-2 mb-6 text-pink-600 font-extrabold tracking-wide leading-tight">
        Account Creation
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg"
      >
        <label
          htmlFor="username"
          className="block text-gray-700 text-sm font-semibold mb-2"
        >
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />

        <label
          htmlFor="password"
          className="block mt-4 text-gray-700 text-sm font-semibold mb-2"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AccountCreationTab;
