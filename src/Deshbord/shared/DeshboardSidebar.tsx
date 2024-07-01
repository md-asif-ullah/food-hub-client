import useDeshboardSegments from "@/components/hooks/useDeshboardSegments";

import { Link, useLocation } from "react-router-dom";

function DeshboardSidebar() {
  const { pathname } = useLocation();
  const deshboardSegments = useDeshboardSegments();

  return (
    <div className="space-y-2 flex flex-col dark:bg-[#020817] h-full pl-5 w-64">
      {deshboardSegments.map((segment, index) => {
        const isActive = pathname === segment.to;
        return (
          <Link
            to={segment.to}
            key={index}
            className={`flex items-center space-x-3 py-3 pl-5 mr-5 transition rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 ${
              isActive ? "dark:bg-[#1b1218] bg-[#fef2e8]" : ""
            }`}
          >
            <div
              className={`text-xl ${
                isActive ? "" : "text-gray-700 dark:text-white"
              }`}
            >
              <i
                className={`text-xl font-medium ${
                  isActive ? "text-[#d2771f]" : "text-gray-700 dark:text-white"
                }`}
              >
                {segment.icon}
              </i>
            </div>
            <h3
              className={`text-lg font-medium ${
                isActive ? "text-[#d2771f]" : "text-gray-700 dark:text-white"
              }`}
            >
              {segment.label}
            </h3>
          </Link>
        );
      })}
    </div>
  );
}

export default DeshboardSidebar;
