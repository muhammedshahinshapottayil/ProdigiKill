export type Tuple<T, MaxLength extends number = 10, Current extends T[] = []> = Current["length"] extends MaxLength
  ? Current
  : Current | Tuple<T, MaxLength, [T, ...Current]>;

export interface ProposalCardProps {
  userAddress: string;
  title: string;
  status: string;
  id: string;
  finalDate: number;
  details: string;
  createdAt: number;
  userRatingStatus: ProposalRating[];
  rating: ProposalRating[];
}

type ProposalRating = {
  status: string;
  updatedAt: string;
  userAddress: string;
  id: string;
};

export type Proposal = {
  withdrawal: boolean;
  userAddress: string;
  updatedAt: number;
  transactionHash: string;
  title: string;
  status: string;
  id: string;
  finalDate: number;
  details: string;
  createdAt: number;
  userRatingStatus: ProposalRating[];
  rating: ProposalRating[];
};

export interface HomeQueryResponse {
  proposals: Proposal[];
}
