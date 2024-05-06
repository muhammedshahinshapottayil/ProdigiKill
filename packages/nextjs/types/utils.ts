export type Tuple<T, MaxLength extends number = 10, Current extends T[] = []> = Current["length"] extends MaxLength
  ? Current
  : Current | Tuple<T, MaxLength, [T, ...Current]>;

export enum Status {
  Pending,
  Accepted,
  Rejected,
  INCompleted,
  Completed,
}

export enum RenewOrSubmitted {
  Submitted,
  Renew,
}

export interface ProposalCardProps {
  userAddress: string;
  currentAddress: string;
  title: string;
  status: Status;
  id: string;
  finalDate: number;
  details: string;
  createdAt: number;
  userRatingStatus?: ProposalRating[];
  rating?: Rating[];
  renewRequest?: RenewRequest[];
  submitProof?: SubmitProof[];
  toggle: boolean;
  withdrawStatus: boolean;
}

export interface IdeaCardProps {
  id: string;
  userAddress: string;
  title: string;
  details: string;
  winner: boolean;
  createdAt: number;
  rating: Rating[];
  userRatingStatus: ProposalRating[];
}

type ProposalRating = {
  status: string;
  updatedAt: string;
  userAddress: string;
  id: string;
};

export type SetStateProp<T> = React.Dispatch<React.SetStateAction<T>>;

interface SubmitProof {
  proof: string;
  createdAt: number;
  submitRating: Rating[];
  userLiked: Rating[];
}

export interface RenewRequest {
  userAddress: string;
  reason: string;
  date: number;
  createdAt: number;
  renewalRating: Rating[];
  userLiked: Rating[];
  status: number;
}

interface Rating {
  status: boolean;
}

export interface Proposal {
  withdrawal: boolean;
  userAddress: string;
  updatedAt: string;
  transactionHash: string;
  title: string;
  status: number;
  id: string;
  finalDate: number;
  details: string;
  createdAt: number;
  userRatingStatus?: ProposalRating[];
  rating?: Rating[];
  renewRequest?: RenewRequest[];
  submitProof?: SubmitProof[];
}

export interface HomeQueryResponse {
  proposals: Proposal[];
}

export interface modalProps {
  clickElement: React.ReactElement;
  children: React.ReactNode;
}

type countArrType = { id: string };
export interface dashboardCountTypes {
  pending: countArrType[];
  accepted: countArrType[];
  rejected: countArrType[];
  inCompleted: countArrType[];
  completed: countArrType[];
  renew: countArrType[];
  proofs: countArrType[];
}
