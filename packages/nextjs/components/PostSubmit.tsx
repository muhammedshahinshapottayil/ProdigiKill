import { useState } from "react";
import CustomTextArea from "./CustomTextArea";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { getID } from "~~/utils";
import { notification } from "~~/utils/scaffold-eth";

function PostSubmit({ id }: { id: string }) {
  const { address } = useAccount();

  const [details, setDetails] = useState<string>("");

  const { writeAsync: submitProof } = useScaffoldContractWrite({
    contractName: "ProdigiKill",
    functionName: "submitProof",
    args: [getID(id), details],
    value: parseEther("0.05"),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const submitProposal = async () => {
    try {
      if (!address) notification.error("Connect wallet");

      if (details) {
        await submitProof();
        clearAll();
        return;
      }
      notification.warning("Please fill all fields");
    } catch (error) {
      console.error(error);
    }
  };

  const clearAll = () => {
    setDetails("");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-lg shadow p-4 w-full max-w-md md:max-w-lg">
        <div className="mb-2">
          <label htmlFor="details" className=" font-medium ">
            Details and Links to proof like img or source or result.
          </label>
          <CustomTextArea rows={3} value={details} onChange={value => setDetails(value)} placeholder="Enter details" />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={submitProposal}
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

export default PostSubmit;
