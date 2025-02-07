"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function HomePage() {
  const [coupons, setCoupons] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch Coupons
  const fetchCoupons = async () => {
    try {
      const response = await axios.get("/api/coupons");  // ✅ Fixed API call
      setCoupons(response.data);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
    }
  };

  // Toggle Coupon Status
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = !currentStatus;

    try {
      const response = await fetch("/api/update-status", {  // ✅ Fixed API call
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      // Optimistic UI Update
      setCoupons((prevCoupons) =>
        prevCoupons.map((coupon) =>
          coupon._id === id ? { ...coupon, status: newStatus } : coupon
        )
      );
    } catch (error) {
      console.error("Failed to update coupon status:", error);
    }
  };

  // Fetch coupons on mount
  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li className="py-2 px-4 bg-blue-700 rounded-md">Coupons</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Eyez-On-The-Prize-AutoSpa</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Emails..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Coupons Table */}
        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Discount Code</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date Submitted</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons
                .filter((coupon) =>
                  coupon.email.toLowerCase().includes(search.toLowerCase())||
                coupon.discountCode.toLowerCase().includes(search.toLowerCase())
                
                )
                .map((coupon) => (
                  <tr key={coupon._id} className="border-b hover:bg-gray-100 transition">
                    <td className="px-4 py-2">{coupon.email}</td>
                    <td className="px-4 py-2">{coupon.discountCode}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      {coupon.status ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : (
                        <FaTimesCircle className="text-red-500" />
                      )}
                      {coupon.status ? "Used" : "Unused"}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(coupon.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => toggleStatus(coupon._id, coupon.status)}
                        className={`px-4 py-2 rounded text-white ${
                          coupon.status ? "bg-red-500" : "bg-green-500"
                        }`}
                      >
                        {coupon.status ? "Mark as Unused" : "Mark as Used"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
