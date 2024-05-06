import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

function AcceptButton({ ids, status }: { ids: bigint[]; status: number }) {
  const { writeAsync: applicationBulkStatusChange } = useScaffoldContractWrite({
    contractName: "ProdigiKill",
    functionName: "applicationBulkStatusChange",
    args: [ids, status],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
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
