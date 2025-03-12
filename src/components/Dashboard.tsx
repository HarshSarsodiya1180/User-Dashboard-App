import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import UserDetailsTab from "./UserDetailsTab";
import AccountCreationTab from "./AccountCreationTab";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Router>
        <header className="bg-blue-500 text-white py-4">
          <h1 className="text-5xl text-center font-bold">
            User Management Dashboard
          </h1>
        </header>
        <Navbar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/dashboard/userDetails" element={<UserDetailsTab />} />
            <Route
              path="/dashboard/accountCreation"
              element={<AccountCreationTab />}
            />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default Dashboard;
