import { SetStateProp, Status } from "~~/types/utils";

function StatusTabs({ setStatus, status }: { status: Status; setStatus: SetStateProp<Status> }) {
  const handleStatusChange = (status: Status) => {
    setStatus(status);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-800 text-white py-6 px-4">
      <h1 className="text-center text-2xl font-bold mb-4">A Platform to Combat Procrastination</h1>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => handleStatusChange(Status.Pending)}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            status === Status.Pending ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => handleStatusChange(Status.Accepted)}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            status === Status.Accepted ? "bg-green-500 hover:bg-green-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Accepted
        </button>
        <button
          onClick={() => handleStatusChange(Status.Rejected)}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            status === Status.Rejected ? "bg-red-500 hover:bg-red-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Rejected
        </button>
        <button
          onClick={() => handleStatusChange(Status.INCompleted)}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            status === Status.INCompleted ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          In Complete
        </button>
        <button
          onClick={() => handleStatusChange(Status.Completed)}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            status === Status.Completed ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Completed
        </button>
      </div>
    </header>
  );
}

export default StatusTabs;