// User Detail Page
import React, { useState, useEffect } from 'react';
import usersdata from '../data/usersdata.json';
import { BiSearch } from 'react-icons/bi'; // Import a search icon from a library or use your own

const UserDetailsTab = () => {
  // States
  const [users, setUsers] = useState(usersdata);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  // function to handle click on table rows 
  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  }; 

  // function to close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // function to generate report in modal
  const handleGenerateReport = () => {
    console.log('Generating report for user:', selectedUser);
    alert('Report has been generated');
  };

  // function to handle search in table rows
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // function for pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUsersPerPageChange = (e) => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // function to filter user based on username, email and phone number
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.phone.toLowerCase().includes(searchTerm)
  );

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
            className="p-3 w-48 lg:w-96 text-lg text-gray-900 border border-gray-300 rounded-full pl-10 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      <h3 class="mt-4 text-xl font-semibold border-b-2 border-blue-500 pb-2">Select a User to Generate Report</h3>
      {/* table  */}
      <div className="w-full mt-4 overflow-x-auto">
  <table className="w-full bg-white border border-gray-200 divide-y divide-gray-200">
    <thead className="bg-gray-100">
      <tr>
        <th className="pt-2 pb-3">ID</th> 
        <th className="pt-2 pb-3">Username</th>
        <th className="pt-2 pb-3">Email</th>
        <th className="pt-2 pb-3">Phone</th>
        <th className="pt-2 pb-3">Creation Date</th>
      </tr>
    </thead>
    <tbody>
      {currentUsers.map((user) => (
        <tr
          className={`${
            user.id % 2 === 0 ? 'bg-gray-50' : 'bg-white'
          } hover:bg-gray-100 cursor-pointer`}
          key={user.id}
          onClick={() => handleRowClick(user)}
        >
          <td className="pt-2 pb-2 pl-32">{user.id}</td>
          <td className="pt-2 pb-2 pl-32">{user.username}</td>
          <td className="pt-2 pb-2 pl-32">{user.email}</td>
          <td className="pt-2 pb-2 pl-32">{user.phone}</td>
          <td className="pt-2 pb-2 pl-32">{user.creationDate}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      <div className="pagination flex flex-row mt-5">
        <button
          className="block rounded-lg bg-gradient-to-tr from-gray-800 to-gray-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-lg mx-2">Page {currentPage}</span>
        <button
          className="block rounded-lg bg-gradient-to-tr from-gray-800 to-gray-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          disabled={indexOfLastUser >= filteredUsers.length}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* modal on click */}
      {showModal && (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
          <div className="modal-overlay fixed inset-0 bg-black opacity-80 "></div>
          <div className="modal-content relative bg-white w-96 pl-6 pb-6 pr-8 rounded-lg shadow-lg">
            <span
              className="close cursor-pointer relative text-3xl top-[1px] left-full text-red-500"
              onClick={handleCloseModal}
            >
              &times;
            </span>
            <h3 className="text-xl relative inset-0 text-black font-bold font-semibold mb-4">
              User Details
            </h3>
            {selectedUser && (
              <div className="relative">
                <p className="mb-2">
                  <span className="font-bold">Username:</span>{' '}
                  {selectedUser.username}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Email:</span> {selectedUser.email}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Phone:</span> {selectedUser.phone}
                </p>
                <button
                  className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleGenerateReport}
                >
                  Generate Report
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsTab;
