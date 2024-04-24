import { ChangeEvent } from "react";
import { PostProposal } from "../contract-action-comps";
import { CustomModal } from "../custom-common";
import { SetStateProp, Status } from "~~/types/utils";

function StatusTabs({
  setStatus,
  status,
  setToggle,
  toggle,
}: {
  status: Status;
  toggle: boolean;
  setStatus: SetStateProp<Status>;
  setToggle: SetStateProp<boolean>;
}) {
  const handleStatusChange = (status: Status) => {
    setStatus(status);
  };

  const handleToggle = (checked: boolean) => {
    setToggle(checked);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-800 text-white py-6 px-4 md:px-8 relative">
      {toggle ? (
        <div>
          <CustomModal
            clickElement={
              <button
                className={`px-4 py-2 rounded-lg transition-colors duration-300  font-semibold
           bg-green-600 hover:bg-green-500`}
              >
                Apply
              </button>
            }
          >
            <div>
              <PostProposal />
            </div>
          </CustomModal>
        </div>
      ) : (
        ""
      )}
      <div className="flex justify-end mb-4 md:mb-6">
        <div className="absolute top-4 right-4">
          <label htmlFor="toogleA" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                id="toogleA"
                checked={toggle}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleToggle(e.target.checked)}
                type="checkbox"
                className="sr-only"
              />
              <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
              <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
            </div>
          </label>
        </div>
      </div>

      <h1 className="text-xl md:text-2xl font-bold text-center">A Platform to Combat Procrastination</h1>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <button
          onClick={() => handleStatusChange(Status.Pending)}
          className={`px-4 py-2 font-semibold rounded-lg transition-colors duration-300 ${
            status === Status.Pending ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => handleStatusChange(Status.Accepted)}
          className={`px-4 py-2 font-semibold rounded-lg transition-colors duration-300 ${
            status === Status.Accepted ? "bg-green-500 hover:bg-green-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Accepted
        </button>
        <button
          onClick={() => handleStatusChange(Status.Rejected)}
          className={`px-4 py-2 font-semibold rounded-lg transition-colors duration-300 ${
            status === Status.Rejected ? "bg-red-500 hover:bg-red-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Rejected
        </button>
        <button
          onClick={() => handleStatusChange(Status.INCompleted)}
          className={`px-4 py-2 font-semibold rounded-lg transition-colors duration-300 ${
            status === Status.INCompleted ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Overdue
        </button>
        <button
          onClick={() => handleStatusChange(Status.Completed)}
          className={`px-4 py-2 font-semibold rounded-lg transition-colors duration-300 ${
            status === Status.Completed ? "bg-purple-500 hover:bg-purple-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Completed
        </button>
      </div>
    </header>
  );
}

export default StatusTabs;
