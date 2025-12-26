import { useEffect, useState } from "react";
import api from "../api/api";
import DashboardLayout from "../layout/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";

export default function LockerDetails() {
  const { lockerId } = useParams();
  const navigate = useNavigate();
  const [locker, setLocker] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api.get(`/lockers/${lockerId}`).then((res) => setLocker(res.data));
  }, [lockerId]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(locker.masterKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBack = () => {
    if (locker?.branchId) {
      navigate(`/branch/${locker.branchId}`);
    } else {
      navigate("/");
    }
  };

  if (!locker) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Loading locker details...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto w-full px-2 sm:px-0">
        <div className="mb-4 sm:mb-6">
          <button
            onClick={handleBack}
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
            <span className="hidden sm:inline">Back to Lockers</span>
            <span className="sm:hidden">Back</span>
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
            Locker #{locker.number}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            View locker details and master key
          </p>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div
            className="p-4 sm:p-6 border-b border-gray-200"
            style={{
              background:
                "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
            }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                }}
              >
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Locker Information
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Complete details
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                Type
              </label>
              <div
                className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg font-medium text-white shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                }}
              >
                {locker.type}
              </div>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                <label className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Master Key
                </label>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center justify-center gap-2 px-3 py-1.5 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 self-start sm:self-auto"
                >
                  {copied ? (
                    <>
                      <svg
                        className="h-4 w-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="relative">
                <div className="p-3 sm:p-4 bg-gray-900 rounded-lg border-2 border-gray-800 shadow-inner overflow-x-auto">
                  <code className="text-green-400 font-space-mono text-sm sm:text-base md:text-lg tracking-wider select-all block break-all">
                    {locker.masterKey}
                  </code>
                </div>
                <div className="absolute top-2 right-2 opacity-50 hidden sm:block">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
