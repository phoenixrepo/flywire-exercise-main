import React, { useState, useEffect } from "react";
import { fetchAllEmployees } from "../apis/employeeApi";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await fetchAllEmployees();
      setEmployees(result);
      setLoading(false);
    })();
  }, []);

  const formatHireDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPositionIcon = (position) => {
    const pos = position.toLowerCase();
    if (pos.includes("ceo")) return "👑";
    if (pos.includes("cto")) return "💻";
    if (pos.includes("cpo")) return "👥";
    if (pos.includes("engineer")) return "⚙️";
    if (pos.includes("accountant")) return "📊";
    if (pos.includes("hr")) return "🤝";
    return "💼";
  };

  const getPositionColor = (position) => {
    const pos = position.toLowerCase();
    if (pos.includes("ceo"))
      return "bg-purple-100 text-purple-800 border-purple-200";
    if (pos.includes("cto")) return "bg-blue-100 text-blue-800 border-blue-200";
    if (pos.includes("cpo"))
      return "bg-green-100 text-green-800 border-green-200";
    if (pos.includes("engineer"))
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    if (pos.includes("accountant"))
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (pos.includes("hr")) return "bg-pink-100 text-pink-800 border-pink-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getActiveStatusColor = (active) => {
    return active
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-lg text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold">Employees</h1>
            <p className="text-lg text-indigo-100">
              Our talented team of {employees.length} professionals
            </p>
          </div>
          <div className="flex gap-4">
            <div className="mt-6 flex space-x-4 md:mt-0">
              <div className="rounded-lg bg-white/20 p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold">{employees.length}</div>
                <div className="text-sm text-indigo-100">Total Employees</div>
              </div>
            </div>
            <div className="mt-6 flex space-x-4 md:mt-0">
              <div className="rounded-lg bg-white/20 p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold">
                  {employees.filter((employee) => employee.active).length}
                </div>
                <div className="text-sm text-indigo-100">Active Employees</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="rounded-lg border border-gray-200 bg-white p-1 shadow-md">
          <button
            onClick={() => setViewMode("grid")}
            className={`rounded-md p-3 transition-all duration-200 ${
              viewMode === "grid"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
            }`}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`rounded-md p-3 transition-all duration-200 ${
              viewMode === "list"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
            }`}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {viewMode === "grid" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="transform overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer hover:border-indigo-200 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="mb-4 flex items-center space-x-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-indigo-100 bg-gradient-to-br from-indigo-400 to-purple-500 text-xl font-bold text-white">
                    {employee.name?.charAt(0) || "E"}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 text-xl font-bold text-gray-900">
                      {employee.name}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold ${getPositionColor(employee.position)}`}
                    >
                      <span className="mr-1">
                        {getPositionIcon(employee.position)}
                      </span>
                      {employee.position}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm">
                      Hired: {formatHireDate(employee.hireDate)}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="text-sm">
                      {employee.directReports.length} Direct Report
                      {employee.directReports.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {employee.directReports.length > 0 && (
                    <div className="mt-4 rounded-lg bg-gray-50 p-3">
                      <div className="mb-2 text-xs font-medium text-gray-700">
                        Direct Reports:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {employee.directReports.map((reportId) => (
                          <span
                            key={reportId}
                            className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-800"
                          >
                            #{reportId}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === "list" && (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Position
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Hire Date
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Direct Reports
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="transition-colors duration-200 hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-lg font-bold text-white">
                          {employee.name?.charAt(0) || "E"}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">
                            {employee.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold ${getPositionColor(employee.position)}`}
                      >
                        <span className="mr-1">
                          {getPositionIcon(employee.position)}
                        </span>
                        {employee.position}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {formatHireDate(employee.hireDate)}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        {employee.directReports.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {employee.directReports
                              .slice(0, 3)
                              .map((reportId) => (
                                <span
                                  key={reportId}
                                  className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-800"
                                >
                                  #{reportId}
                                </span>
                              ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getActiveStatusColor(employee.active)}`}
                      >
                        {employee.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {employees.length === 0 && !loading && (
        <div className="py-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No employees found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding some employees to the system.
          </p>
        </div>
      )}
    </div>
  );
};

export default Employees;
