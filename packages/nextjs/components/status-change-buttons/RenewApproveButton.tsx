import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { getID } from "~~/utils";

function RenewAcceptButton({ id, date }: { id: string; date: bigint }) {
  const { writeAsync: renewApplicationAccept } = useScaffoldContractWrite({
    contractName: "ProdigiKill",
    functionName: "renewApplicationAccept",
    args: [getID(id), date],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });
  return (
    <button
      onClick={() => renewApplicationAccept()}
      className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-3 font-semibold py-1 rounded-full text-xs shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      Accept
    </button>
  );
}

export default RenewAcceptButton;
