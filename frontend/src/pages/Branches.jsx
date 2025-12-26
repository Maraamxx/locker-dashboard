import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import DashboardLayout from "../layout/DashboardLayout";
import Pagination from "../components/Pagination";

export default function Branches() {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    api.get("/branches").then((res) => setBranches(res.data));
  }, []);

  const filteredBranches = useMemo(() => {
    return branches.filter((branch) =>
      branch.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [branches, searchTerm]);

  const totalPages = Math.ceil(filteredBranches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBranches = filteredBranches.slice(startIndex, endIndex);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl mb-2 font-bold text-gray-800">
          Select a Branch
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          Choose a branch to view its lockers
        </p>

        {/* Search Bar */}
        <div className="mb-4 sm:mb-6 relative">
          <input
            type="text"
            placeholder="Search branches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 pl-10 sm:pl-11 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus-ring-green focus:border-transparent shadow-sm transition-all"
          />
          <svg
            className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
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
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredBranches.length} of {branches.length} branches
          </div>
        )}

        {/* Branches Grid */}
        {paginatedBranches.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <p className="text-gray-500 text-lg">No branches found</p>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {paginatedBranches.map((b) => (
                <div
                  key={b.id}
                  onClick={() => navigate(`/branch/${b.id}`)}
                  className="p-4 sm:p-6 bg-white shadow-md hover:shadow-xl rounded-xl cursor-pointer transition-all duration-200 border border-gray-200 hover-border-green hover:-translate-y-1 group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                      }}
                    >
                      <svg
                        className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 transition-colors group-hover:text-[#6366F1] truncate">
                      {b.name}
                    </h3>
                  </div>
                  <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-gray-500">
                    <span>Click to view lockers</span>
                    <svg
                      className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
