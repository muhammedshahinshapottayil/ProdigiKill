import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

function AcceptButton({ ids }: { ids: bigint[] }) {
  const { writeAsync: applicationBulkStatusChange } = useScaffoldContractWrite({
    contractName: "ProdigiKill",
    functionName: "applicationBulkStatusChange",
    args: [ids, 2],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      notification.success("yes its true try it");
    },
  });

  return (
    <button
      onClick={() => applicationBulkStatusChange()}
      className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-5 font-semibold py-2 rounded-md text-sm shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      Reject
    </button>
  );
}

export default AcceptButton;
