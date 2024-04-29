import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { getID } from "~~/utils";

function RejectButton({ id }: { id: string }) {
  const { writeAsync: applicationBulkStatusChange } = useScaffoldContractWrite({
    contractName: "ProdigiKill",
    functionName: "applicationBulkStatusChange",
    args: [[getID(id)], 2],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });
  return (
    <button
      onClick={() => applicationBulkStatusChange()}
      className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-3 font-semibold py-1 rounded-full text-xs shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      Reject
    </button>
  );
}

export default RejectButton;
