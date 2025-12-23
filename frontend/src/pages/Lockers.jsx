import { useEffect, useState, useMemo } from "react";
import api from "../api/api";
import DashboardLayout from "../layout/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function Lockers() {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const [lockers, setLockers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    api.get(`/lockers/branch/${branchId}`).then((res) => setLockers(res.data));
  }, [branchId]);

  const uniqueTypes = useMemo(() => {
    const types = [...new Set(lockers.map((l) => l.type))];
    return types.sort();
  }, [lockers]);

  const filteredLockers = useMemo(() => {
    return lockers.filter((locker) => {
      const matchesSearch =
        locker.number.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        locker.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === "all" || locker.type === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [lockers, searchTerm, filterType]);

  const totalPages = Math.ceil(filteredLockers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLockers = filteredLockers.slice(startIndex, endIndex);

  // Reset to page 1 when search term or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-4 sm:mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-black transition-colors mb-3 sm:mb-4"
          >
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="hidden sm:inline">Back to Branches</span>
            <span className="sm:hidden">Back</span>
          </button>
          <h2 className="text-2xl sm:text-3xl mb-1 sm:mb-2 font-bold text-gray-800">Lockers</h2>
          <p className="text-sm sm:text-base text-gray-600">Browse and manage all lockers</p>
        </div>

        {/* Search Bar */}
        <div className="mb-4 sm:mb-6 relative">
          <input
            type="text"
            placeholder="Search lockers..."
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

        {/* Filter Tabs */}
        {uniqueTypes.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-wrap gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => setFilterType("all")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg font-medium transition-all duration-200 ${
                  filterType === "all"
                    ? "text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                style={
                  filterType === "all"
                    ? { background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }
                    : {}
                }
              >
                All Types
              </button>
              {uniqueTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg font-medium transition-all duration-200 ${
                    filterType === type
                      ? "text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  style={
                    filterType === type
                      ? { background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }
                      : {}
                  }
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredLockers.length)} of {filteredLockers.length} lockers
          {filteredLockers.length !== lockers.length && ` (${lockers.length} total)`}
        </div>

        {/* Lockers Grid */}
        {paginatedLockers.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <svg
              className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-3 sm:mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-gray-500 text-base sm:text-lg">No lockers found</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 px-4">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {paginatedLockers.map((locker) => (
              <div
                key={locker.id}
                className="p-3 sm:p-4 md:p-5 bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-200 border border-gray-200 hover-border-green hover:-translate-y-1 group"
                onClick={() => (window.location.href = `/locker/${locker.id}`)}
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <p className="text-lg sm:text-xl font-bold text-gray-800 transition-colors group-hover:text-[#6366F1] truncate pr-1">
                    #{locker.number}
                  </p>
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500 transition-colors group-hover:bg-[#6366F1] flex-shrink-0"></div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium truncate">{locker.type}</p>
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
