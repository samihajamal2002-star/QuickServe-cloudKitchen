import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { FaUsers, FaUserShield, FaTrashAlt, FaSearch } from "react-icons/fa";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      alert("Role update failed!");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 bg-white min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <FaUsers className="text-orange-500" /> Manage Users
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Control user roles and accounts across the platform.
          </p>
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 font-bold text-sm">Loading users...</div>
      ) : (
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-200">
                <th className="py-4 px-5">User</th>
                <th className="py-4 px-5">Email</th>
                <th className="py-4 px-5">Role</th>
                <th className="py-4 px-5 text-center">Change Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50">
                  <td className="py-4 px-5 font-bold text-slate-800">{user.name}</td>
                  <td className="py-4 px-5 text-slate-600">{user.email}</td>
                  <td className="py-4 px-5">
                    <span className="bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-full text-xs">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-center">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold bg-white focus:outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <option value="user">Customer</option>
                      <option value="chef">Chef</option>
                      <option value="rider">Rider</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}