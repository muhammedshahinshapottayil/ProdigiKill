"use client";

import React, { useEffect, useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { getUnixTime } from "date-fns";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { useAccount } from "wagmi";
import { BulkAcceptButton, BulkRejectButton } from "~~/components/bulk-action-button";
import { CustomCheckBox } from "~~/components/custom-common";
import { AdminStatusTabs } from "~~/components/tabs";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import {
  ADMIN_DASHBOARD_COUNT,
  ADMIN_PROPOSAL_ACCEPTED,
  ADMIN_PROPOSAL_COMPLETED_OR_IN_COMPLETED,
  ADMIN_PROPOSAL_DUE_DATE_FINISHED_GRAPHQL,
  ADMIN_PROPOSAL_PENDING_GRAPHQL,
  ADMIN_PROPOSAL_REJECT,
  ADMIN_PROPOSAL_RENEW_APPROVE_PENDING,
  ADMIN_PROPOSAL_SUBMITTED_APPROVE_PENDING,
  IDEA_WINNER_GRAPHQL,
  PROPOSED_IDEAS_FILTER_WINNER_GRAPHQL,
  PROPOSED_IDEAS_LAST_WINNER_GRAPHQL,
} from "~~/services/graphQL/queries";
import { Proposal, RenewOrSubmitted, Status, dashboardCountTypes } from "~~/types/utils";
import {
  PROPOSAL_ACCEPTED_COLUMNS,
  PROPOSAL_COMPLETED_OR_IN_COMPLETED_COLUMNS,
  PROPOSAL_PENDING_COLUMNS,
  PROPOSAL_REJECT_COLUMNS,
  PROPOSAL_RENEW_APPROVE_PENDING_COLUMNS,
  PROPOSAL_SUBMITTED_APPROVE_PENDING_COLUMNS,
  getID,
} from "~~/utils";

const HomePage: React.FC = () => {
  const { address } = useAccount();
  const [IsLoading, setIsLoading] = useState<boolean>(true);
  const [Ids, setIds] = useState<bigint[]>([]);
  const [validateIds, setValidateIds] = useState<string[]>([]);

  const [status, setStatus] = useState<Status>(Status.Pending);
  const [count, setCount] = useState<dashboardCountTypes>({
    pending: [],
    accepted: [],
    rejected: [],
    inCompleted: [],
    completed: [],
    renew: [],
    proofs: [],
  });

  const [IsRenewORSubmitted, setIsRenewORSubmitted] = useState<RenewOrSubmitted | null>(null);

  const PROPOSAL_GQL = gql(
    IsRenewORSubmitted === null
      ? status === Status.Pending
        ? ADMIN_PROPOSAL_PENDING_GRAPHQL
        : status === Status.Accepted
        ? ADMIN_PROPOSAL_ACCEPTED
        : status === Status.Rejected
        ? ADMIN_PROPOSAL_REJECT
        : status === Status.Completed || status === Status.INCompleted
        ? ADMIN_PROPOSAL_COMPLETED_OR_IN_COMPLETED
        : ""
      : status === Status.Pending && IsRenewORSubmitted === RenewOrSubmitted.Renew
      ? ADMIN_PROPOSAL_RENEW_APPROVE_PENDING
      : status === Status.Pending && IsRenewORSubmitted === RenewOrSubmitted.Submitted
      ? ADMIN_PROPOSAL_SUBMITTED_APPROVE_PENDING
      : "",
  );

  const currentDate = Math.floor(Date.now() / 1000);

  const date = new Date();
  const firstDay = new Date(date.setDate(1));
  const startDate = getUnixTime(firstDay.setMonth(firstDay.getMonth() - 1));

  const { data: monthlyWinner } = useQuery(gql(IDEA_WINNER_GRAPHQL), {
    variables: { startDate, endDate: currentDate },
    fetchPolicy: "network-only",
  });

  const { data: monthlyWinnerIdea } = useQuery(gql(PROPOSED_IDEAS_LAST_WINNER_GRAPHQL), {
    variables: { startDate, endDate: currentDate },
    fetchPolicy: "network-only",
  });

  const { data: selectWinnerIdea } = useQuery(gql(PROPOSED_IDEAS_FILTER_WINNER_GRAPHQL), {
    variables: { startDate, endDate: currentDate },
    fetchPolicy: "network-only",
  });

  const { data: proposalDueData } = useQuery(gql(ADMIN_PROPOSAL_DUE_DATE_FINISHED_GRAPHQL), {
    variables: { currentDate },
    fetchPolicy: "network-only",
  });

  const { data: dashboardCount } = useQuery(gql(ADMIN_DASHBOARD_COUNT), {
    variables: { currentDate },
    fetchPolicy: "network-only",
  });

  const { data: proposalData, loading } = useQuery(PROPOSAL_GQL, {
    variables: { currentDate, status },
    fetchPolicy: "network-only",
  });

  const data: Proposal[] = useMemo(() => {
    if (IsLoading) setIsLoading(false);
    if (proposalData && !loading && address && status in Status) {
      if (IsRenewORSubmitted === null) return proposalData.proposals;
      if (IsRenewORSubmitted === RenewOrSubmitted.Renew) return proposalData.requestRenewals;
      if (IsRenewORSubmitted === RenewOrSubmitted.Submitted) return proposalData.submitProofs;
    }
    return [];
  }, [proposalData, loading, address, status, IsLoading, IsRenewORSubmitted]);

  const columns: any = useMemo(() => {
    return IsRenewORSubmitted === null
      ? Status.Pending === status
        ? PROPOSAL_PENDING_COLUMNS
        : Status.Accepted === status
        ? PROPOSAL_ACCEPTED_COLUMNS
        : Status.Rejected === status
        ? PROPOSAL_REJECT_COLUMNS
        : Status.Completed === status || Status.INCompleted === status
        ? PROPOSAL_COMPLETED_OR_IN_COMPLETED_COLUMNS
        : []
      : Status.Pending === status && IsRenewORSubmitted in RenewOrSubmitted
      ? IsRenewORSubmitted === RenewOrSubmitted.Renew
        ? PROPOSAL_RENEW_APPROVE_PENDING_COLUMNS
        : IsRenewORSubmitted === RenewOrSubmitted.Submitted
        ? PROPOSAL_SUBMITTED_APPROVE_PENDING_COLUMNS
        : []
      : [];
  }, [status, IsRenewORSubmitted]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
    prepareRow,
    gotoPage,
    setPageSize,
  }: any = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: [""],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );
  const { globalFilter, pageSize }: any = state;

  const handleChecking = (status: boolean, value: string) => {
    const id = getID(value);
    if (status) {
      setIds(state => [...state, id]);
      setValidateIds(state => [...state, value]);
    }
    if (!status) {
      setIds(state => state.filter((item: bigint) => item !== id));
      setValidateIds(state => state.filter((item: string) => item !== value));
    }
  };

  const TableBottomButton = ({
    disabled,
    onClick,
    children,
  }: {
    disabled: boolean;
    onClick: () => void;
    children: string;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );

  const { writeAsync: applicationBulkStatusChange } = useScaffoldContractWrite({
    contractName: "ProdigiKill",
    functionName: "applicationBulkStatusChange",
    args: [
      Array.isArray(proposalData?.proposals) && proposalData?.proposals.length > 0
        ? proposalData?.proposals.map(({ id }: { id: string }) => getID(id))
        : [],
      3,
    ],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: winnerOfIdea } = useScaffoldContractWrite({
    contractName: "ProdigiKill",
    functionName: "winnerOfIdea",
    args: [
      selectWinnerIdea.proposalIdeas.length > 0
        ? selectWinnerIdea.proposalIdeas.sort((a: any, b: any) => a.rating - b.rating)[0].id
        : 0n,
    ],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  useEffect(() => {
    if (Array.isArray(proposalDueData?.proposals))
      if (proposalDueData.proposals.length > 0) applicationBulkStatusChange();
  }, [proposalDueData?.proposals, applicationBulkStatusChange]);

  useEffect(() => {
    const selectAWinner = () => {
      winnerOfIdea();
    };
    monthlyWinner.winners.length === 0 && monthlyWinnerIdea.proposalIdeas.length === 0 ? selectAWinner() : "";
  }, [monthlyWinner]);

  useEffect(() => {
    if (Array.isArray(dashboardCount?.pending)) setCount(dashboardCount);
  }, [dashboardCount]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-blue-500 text-white rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Pending</h3>
          <p className="text-2xl">{count.pending.length}</p>
        </div>
        <div className="bg-green-500 text-white rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Approved</h3>
          <p className="text-2xl">{count.accepted.length}</p>
        </div>
        <div className="bg-yellow-500 text-white rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">In Completed</h3>
          <p className="text-2xl">{count.inCompleted.length}</p>
        </div>
        <div className="bg-red-500 text-white rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Rejected</h3>
          <p className="text-2xl">{count.rejected.length}</p>
        </div>
        <div className="bg-purple-500 text-white rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Completed</h3>
          <p className="text-2xl">{count.completed.length}</p>
        </div>
        <div className="bg-orange-500 text-white rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Renew</h3>
          <p className="text-2xl">{count.renew.length}</p>
        </div>
        <div className="bg-pink-500 text-white rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Submitted</h3>
          <p className="text-2xl">{count.proofs.length}</p>
        </div>
      </div>

      <AdminStatusTabs
        IsRenewORSubmitted={IsRenewORSubmitted}
        setIsRenewORSubmitted={setIsRenewORSubmitted}
        setStatus={setStatus}
        status={status}
      />

      <div className="mt-4 container mx-auto px-4 py-8 border rounded-md border-gray-500">
        <div className="flex justify-between">
          <div className="mb-4">
            <input
              onPaste={e => e.preventDefault()}
              type="text"
              value={globalFilter}
              className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
              placeholder="Search..."
              onChange={e => setGlobalFilter(e.target.value)}
            />
          </div>
          <div className="mb-4 flex justify-around">
            {status === Status.Pending &&
            (IsRenewORSubmitted === null || IsRenewORSubmitted === RenewOrSubmitted.Submitted) ? (
              <BulkAcceptButton status={IsRenewORSubmitted === null ? 1 : 4} ids={Ids} />
            ) : (
              ""
            )}
            {status === Status.Pending &&
            (IsRenewORSubmitted === null || IsRenewORSubmitted === RenewOrSubmitted.Submitted) ? (
              <BulkRejectButton ids={Ids} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded">
            <thead className="bg-gray-50">
              {headerGroups.map((headerGroup: any, i: number) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  {headerGroup.headers.map((column: any, j: number) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      key={j}
                    >
                      {column.render("Header")}
                      <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                    </th>
                  ))}
                  {status === Status.Pending &&
                  (IsRenewORSubmitted === null || IsRenewORSubmitted === RenewOrSubmitted.Submitted) ? (
                    <th
                      key={i}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Bulk Actions
                    </th>
                  ) : (
                    ""
                  )}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row: any, i: number) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.values.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{++i}</td>
                    {row.cells.map((cell: any) => (
                      <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap" key={cell.value}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                    {status === Status.Pending &&
                    (IsRenewORSubmitted === null || IsRenewORSubmitted === RenewOrSubmitted.Submitted) ? (
                      <td key={i} className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <CustomCheckBox
                            status={validateIds.includes(row.values.id)}
                            value={row.values.id}
                            onChange={handleChecking}
                          />
                        </div>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <TableBottomButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </TableBottomButton>

            <TableBottomButton onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </TableBottomButton>

            <TableBottomButton onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </TableBottomButton>

            <TableBottomButton onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
              {">>"}
            </TableBottomButton>
          </div>
          <div>
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{state.pageIndex + 1}</span> of{" "}
              <span className="font-medium">{pageOptions.length}</span>
            </span>
            <select
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
              className="ml-4 border border-gray-300 rounded text-sm text-gray-700 py-1 px-2"
            >
              {[10, 25, 50, 100].map(size => (
                <option className="text-sm text-gray-700" key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
