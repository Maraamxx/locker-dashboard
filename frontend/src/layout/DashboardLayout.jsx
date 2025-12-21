import { useNavigate } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg py-3 px-4 md:py-4 md:px-6 flex items-center relative min-h-[64px] border-b border-gray-700/30 backdrop-blur-sm">
        {/* Logo - Centered */}
        <button
          onClick={() => navigate("/")}
          className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center hover:opacity-90 transition-all duration-200 cursor-pointer group"
        >
          <div className="h-16 w-20 sm:h-18 sm:w-24 md:h-20 md:w-28 p-1.5 md:p-2 flex items-center justify-center rounded-lg transition-all duration-200 group-hover:bg-gray-700/30 group-hover:scale-105 group-hover:shadow-lg">
            <img
              src="/image.png"
              alt="LA7 Logo"
              className="h-full w-full object-contain"
            />
          </div>
        </button>

        {/* Logout Button - Right aligned */}
        <div className="ml-auto">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg text-white shadow-md hover:shadow-lg transition-all duration-200 font-medium"
            style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}
            onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)'}
            onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8">{children}</div>
    </div>
  );
}
