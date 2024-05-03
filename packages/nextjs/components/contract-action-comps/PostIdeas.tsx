import { useState } from "react";
import { CustomInput, CustomTextArea } from "../custom-common";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

function PostIdeas() {
  const { address } = useAccount();

  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const { writeAsync: proposeIdea } = useScaffoldContractWrite({
    contractName: "ProdigiKill",
    functionName: "proposeIdea",
    args: [title, details],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const addProposal = async () => {
    try {
      if (!address) notification.error("Connect wallet");

      if (title && details) {
        await proposeIdea();
        clearAll();
        return;
      }
      notification.warning("Please fill all fields");
    } catch (error) {
      console.error(error);
    }
  };

  const clearAll = () => {
    setTitle("");
    setDetails("");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-lg shadow p-4 w-full max-w-md md:max-w-lg">
        <div className="mb-2">
          <label htmlFor="title" className=" font-medium ">
            Title
          </label>
          <CustomInput value={title} type="text" placeholder="Enter event title" onChange={value => setTitle(value)} />
        </div>
        <div className="mb-2">
          <label htmlFor="details" className=" font-medium ">
            Details
          </label>

          <CustomTextArea
            rows={3}
            value={details}
            onChange={value => setDetails(value)}
            placeholder="Enter event details"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={addProposal}
            className="px-4 py-2 bg-blue-500 font-semibold text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="px-4 py-2 font-semibold bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostIdeas;
