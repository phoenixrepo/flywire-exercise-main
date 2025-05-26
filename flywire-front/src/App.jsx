import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import Employees from "./pages/Employees";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="border-b border-white/10 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <div className="group flex items-center">
                <img
                  className="h-10"
                  src="https://www.flywire.com/media/img/flywire-logo.svg"
                  alt="Flywire logo"
                ></img>
              </div>

              <div className="hidden items-center md:flex">
                <div className="rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-sm">
                  <Link
                    to="/employees"
                    className="flex items-center space-x-2 rounded-full bg-white/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/30 hover:shadow-lg"
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>Employees</span>
                  </Link>
                </div>
              </div>

              <div className="hidden items-center space-x-4 md:flex">
                <button className="rounded-xl p-3 text-white/80 transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:text-white">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                <button className="relative rounded-xl p-3 text-white/80 transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"></path>
                  </svg>

                  <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full border-2 border-white bg-red-400"></div>
                </button>

                <div className="group flex cursor-pointer items-center space-x-3 rounded-full border border-white/20 bg-white/10 py-2 pl-2 pr-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                  <img
                    className="h-8 w-8 rounded-full border-2 border-white/30 transition-all duration-300 group-hover:border-white/50"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                  />
                  <span className="hidden text-sm font-medium text-white lg:block">
                    Admin
                  </span>
                  <svg
                    className="h-4 w-4 text-white/60 transition-colors duration-300 group-hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="rounded-xl p-3 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <svg
                    className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6 transition-transform duration-300`}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <svg
                    className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6 rotate-180 transition-transform duration-300`}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            className={`${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-500 ease-in-out md:hidden`}
          >
            <div className="space-y-3 border-t border-white/10 bg-black/20 px-4 pb-6 pt-2 backdrop-blur-sm">
              <Link
                to="/employees"
                className="flex items-center space-x-3 rounded-xl px-4 py-3 text-base font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Employees</span>
              </Link>

              <div className="flex items-center space-x-3 rounded-xl bg-white/10 px-4 py-3">
                <img
                  className="h-10 w-10 rounded-full border-2 border-white/30"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                />
                <div>
                  <div className="text-base font-medium text-white">Admin</div>
                  <div className="text-sm font-medium text-blue-200">
                    michaelflores.biz@flywire.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/employees" element={<Employees />} />
            <Route path="*" element={<Navigate to="/employees" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
