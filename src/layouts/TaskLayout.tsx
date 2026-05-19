import { Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../util/auth";

const TaskLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-100 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
          <button
            onClick={() => {
              logoutUser();
              navigate("/");
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition shadow-sm"
          >
            Logout
          </button>
        </div>
      </nav>
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TaskLayout;
