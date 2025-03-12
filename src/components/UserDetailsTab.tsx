import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import User from "../types/usertypes";
import { fetchUsers } from "../data/userdata";

const UserDetailsTab: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage, setUsersPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers(); // Fetch users
        setUsers(usersData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users.");
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleRowClick = (user: User): void => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
  };

  const handleGenerateReport = (): void => {
    console.log("Generating report for user:", selectedUser);
    alert("Report has been generated");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    console.log("Increase");
    setCurrentPage(page);
  };

  const handleUsersPerPageChange = (e) => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.phone.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-4xl mt-2 mb-6 text-pink-600 font-extrabold tracking-wide leading-tight">
        User Details
      </h2>
      <div className="flex gap-4 items-center">
        <div className="relative">
          <input
            className="p-3 w-48 lg:w-96 text-lg border border-gray-300 rounded-full pl-10"
            type="text"
            placeholder="Search Username, Email, Phone"
            onChange={handleSearch}
          />
          <BiSearch className="absolute left-3 top-3 text-2xl text-gray-500" />
        </div>
        <label htmlFor="usersPerPage" className="text-lg">
          Users Per Page:
        </label>
        <select
          id="usersPerPage"
          className="text-lg"
          value={usersPerPage}
          onChange={handleUsersPerPageChange}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>

      {loading ? (
        <p className="text-lg text-gray-600 mt-4">Loading users...</p>
      ) : error ? (
        <p className="text-lg text-red-600 mt-4">Error: {error}</p>
      ) : (
        <table className="w-full mt-4 border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(user)}
              >
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination flex flex-row mt-5">
        <button
          className="block rounded-lg bg-gradient-to-tr from-gray-800 to-gray-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-lg mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="block rounded-lg bg-gradient-to-tr from-gray-800 to-gray-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          disabled={currentPage === totalPages || filteredUsers.length === 0}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="text-red-500 text-3xl absolute right-4 top-2"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">User Details</h3>
            <p>
              <strong>Username:</strong> {selectedUser.username}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={handleGenerateReport}
            >
              Generate Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsTab;
