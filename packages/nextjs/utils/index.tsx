import { format, fromUnixTime, parseISO } from "date-fns";
import { CustomModal } from "~~/components/custom-common";
import { AcceptButton, RejectButton } from "~~/components/status-change-buttons";

const getID = (id: string): bigint => {
  return BigInt(id.slice(2));
};

const PROPOSAL_PENDING_COLUMNS = [
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Details",
    accessor: "details",
    Cell: ({ row }: any) => {
      const { details } = row.values;
      return details.length < 100 ? (
        <p className={`text-gray-600 line-clamp-3`}>{details}</p>
      ) : (
        <div>
          <p className={`text-gray-600 line-clamp-3`}>{details}</p>
          <CustomModal
            clickElement={
              <button className=" float-right text-xs text-blue-500 hover:text-blue-700 focus:outline-none">
                Read more
              </button>
            }
          >
            <div className="max-h-96 min-h-60 min-w-lg max-w-lg">
              <p className={`text-gray-600`}>{details}</p>
            </div>
          </CustomModal>
        </div>
      );
    },
  },
  {
    Header: "Rating count",
    accessor: "rating",
    Cell: ({ row }: any) => {
      const { rating } = row.values;
      return rating.length;
    },
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ row }: any) => {
      const { createdAt } = row.values;
      const dateFinal = fromUnixTime(createdAt);
      return format(parseISO(dateFinal.toISOString()), "MMM d, yyyy");
    },
  },
  {
    Header: "Final Date",
    accessor: "finalDate",
    Cell: ({ row }: any) => {
      const { finalDate } = row.values;
      const dateFinal = fromUnixTime(finalDate);
      return format(parseISO(dateFinal.toISOString()), "MMM d, yyyy");
    },
  },
  {
    Header: "Action",
    accessor: "id",
    Cell: ({ row }: any) => {
      const { id } = row.values;
      return (
        <div className="flex justify-around">
          <AcceptButton id={id} />
          <RejectButton id={id} />
        </div>
      );
    },
  },
];

export { getID, PROPOSAL_PENDING_COLUMNS };
