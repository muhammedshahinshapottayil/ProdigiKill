const PROPOSAL_PENDING_GRAPHQL = `
query MyQuery($address: String!, $currentDate: BigInt!,$status:Int) {
  proposals(where: {finalDate_gt: $currentDate, withdrawal: false,status:$status}
    orderBy: createdAt
    orderDirection: desc
  ) {
    withdrawal
    userAddress
    updatedAt
    transactionHash
    title
    status
    id
    finalDate
    details
    createdAt
    userRatingStatus: proposalRating(where: {userAddress: $address,status: true}) {
      status
      updatedAt
      userAddress
      id
    }
    rating: proposalRating (where: {status: true}) {
      status
    }
  }
}
`;

const PROPOSAL_REJECT_OR_INCOMPLETE_OR_COMPLETED_GRAPHQL = `
query MyQuery($status:Int!) {
  proposals(where: {status:$status}
    orderBy: updatedAt
    orderDirection: desc
  ) {
    withdrawal
    userAddress
    updatedAt
    transactionHash
    title
    status
    id
    finalDate
    details
    createdAt
    rating: proposalRating (where: {status: true}) {
      status
    }
  }
}
`;

const PROPOSAL_ACCEPTED_GRAPHQL = `
query MyQuery($address: String!, $currentDate: BigInt!,$status:Int!) {
  proposals(where: {finalDate_gt: $currentDate, withdrawal: false,status:$status}
    orderBy: updatedAt
    orderDirection: desc
  ) {
    withdrawal
    userAddress
    updatedAt
    transactionHash
    title
    status
    id
    finalDate
    details
    createdAt
    renewRequest(where: {status: 0}){
      userAddress
      reason
      date
      createdAt
      userLiked:renewalRating(where: {userAddress:$address,status: true}){
        status
      }
      renewalRating(where: {status: true}){
        status
      }
    }
    submitProof(where: {status: 0}){
      proof
      createdAt
      submitRating(where: {status: true}){
        status
      }
      userLiked:submitRating(where: {userAddress: $address,status: true}){
        status
      }
    }
  }
}
`;

const USER_PROPOSAL_PENDING_GRAPHQL = `
query MyQuery($address: String!, $currentDate: BigInt!,$status:Int) {
  proposals(where: {finalDate_gt: $currentDate, withdrawal: false,status:$status,userAddress: $address}
    orderBy: createdAt
    orderDirection: desc
  ) {
    withdrawal
    userAddress
    updatedAt
    transactionHash
    title
    status
    id
    finalDate
    details
    createdAt
    userRatingStatus: proposalRating(where: {userAddress: $address,status: true}) {
      status
      updatedAt
      userAddress
      id
    }
    rating: proposalRating (where: {status: true}) {
      status
    }
  }
}
`;

const USER_PROPOSAL_ACCEPTED_GRAPHQL = `
query MyQuery($address: String!, $currentDate: BigInt!,$status:Int!) {
  proposals(where: {finalDate_gt: $currentDate, withdrawal: false,status:$status,userAddress: $address}
    orderBy: updatedAt
    orderDirection: desc
  ) {
    withdrawal
    userAddress
    updatedAt
    transactionHash
    title
    status
    id
    finalDate
    details
    createdAt
    renewRequest(where: {status: 0}){
      userAddress
      reason
      date
      createdAt
      userLiked:renewalRating(where: {userAddress:$address,status: true}){
        status
      }
      renewalRating(where: {status: true}){
        status
      }
    }
    submitProof(where: {status: 0}){
      proof
      createdAt
      submitRating(where: {status: true}){
        status
      }
      userLiked:submitRating(where: {userAddress: $address,status: true}){
        status
      }
    }
  }
}
`;

const USER_PROPOSAL_REJECT_OR_INCOMPLETE_OR_COMPLETED_GRAPHQL = `
query MyQuery($status:Int!,$address: String!) {
  proposals(where: {status:$status,userAddress:$address}
    orderBy: updatedAt
    orderDirection: desc
  ) {
    withdrawal
    userAddress
    updatedAt
    transactionHash
    title
    status
    id
    finalDate
    details
    createdAt
    rating: proposalRating (where: {status: true}) {
      status
    }
  }
}
`;

const ADMIN_PROPOSAL_PENDING_GRAPHQL = `
query MyQuery( $currentDate: BigInt!,$status:Int) {
  proposals(where: {finalDate_gt: $currentDate, withdrawal: false,status:$status}
    orderBy: createdAt
    orderDirection: asc
  ) {
    withdrawal
    userAddress
    updatedAt
    transactionHash
    title
    status
    id
    finalDate
    details
    createdAt
    rating: proposalRating (where: {status: true}) {
      status
    }
  }
}
`;

const ADMIN_PROPOSAL_ACCEPTED = `
query MyQuery($currentDate: BigInt!,$status:Int!) {
  proposals(where: {finalDate_gt: $currentDate, withdrawal: false,status:$status}
    orderBy: updatedAt
    orderDirection: asc
  ) {
    withdrawal
    userAddress
    updatedAt
    transactionHash
    title
    status
    id
    finalDate
    details
    createdAt
    renewRequest{
      userAddress
      reason
      date
      createdAt
      renewalRating(where: {status: true}){
        status
      }
    }
    submitProof{
      proof
      createdAt
      submitRating(where: {status: true}){
        status
      }
    }
  }
}
`;

const ADMIN_PROPOSAL_REJECT = `
query MyQuery($status:Int!) {
  proposals(where: {status:$status}
    orderBy: updatedAt
    orderDirection: desc
  ) {
    withdrawal
    userAddress
    updatedAt
    transactionHash
    title
    status
    id
    finalDate
    details
    createdAt
    rating: proposalRating (where: {status: true}) {
      status
    }
  }
}
`;

const ADMIN_PROPOSAL_COMPLETED_OR_IN_COMPLETED = `
query MyQuery($status:Int!) {
  proposals(where: {status:$status}
    orderBy: updatedAt
    orderDirection: asc
  ) {
    withdrawal
    userAddress
    updatedAt
    transactionHash
    title
    status
    id
    finalDate
    details
    createdAt
    renewRequest{
      userAddress
      reason
      date
      createdAt
      renewalRating(where: {status: true}){
        status
      }
    }
    submitProof{
      proof
      createdAt
      submitRating(where: {status: true}){
        status
      }
    }
  }
}
`;

const ADMIN_PROPOSAL_RENEW_APPROVE_PENDING = `
query MyQuery($status: Int!) {
  requestRenewals(
    where: {status: $status}
    orderBy: createdAt
    orderDirection: desc
  ) {
    userAddress
    reason
    id
    date
    createdAt
    updatedAt
    renewalRating(where: {status: true}) {
      status
    }
    ProposalID {
      finalDate
      details
      title
    }
  }
}
`;

const ADMIN_PROPOSAL_SUBMITTED_APPROVE_PENDING = `
query MyQuery($status: Int!) {
  submitProofs(where: {status: $status}) {
    createdAt
    updatedAt
    id
    proof
    submitRating(where: {status: true}) {
      status
    }
    ProposalID {
      finalDate
      details
      title
    }
  }
}
`;

const ADMIN_PROPOSAL_DUE_DATE_FINISHED_GRAPHQL = `
query MyQuery($currentDate: BigInt!) {
  proposals(
    where: {finalDate_lt: $currentDate, status: 1}
  ) {
    id
  }
}
`;

const ADMIN_DASHBOARD_COUNT = `
query MyQuery($currentDate: BigInt!) {
  pending: proposals(where: {status: 1, finalDate_gt: $currentDate}) {
    id
  }
  accepted: proposals(where: {status: 1, finalDate_gt: $currentDate}) {
    id
  }
  rejected: proposals(where: {status: 2}) {
    id
  }
  inCompleted: proposals(where: {status: 3}) {
    id
  }
  completed: proposals(where: {status: 4}) {
    id
  }
  renew:requestRenewals(where:{status:0}){
    id
  }
  proofs:submitProofs(where:{status:0}){
    id
  }
}
`;

const PROPOSED_IDEAS_GRAPHQL = `
query MyQuery($address: String!) {
  proposalIdea(
    orderBy: createdAt
    orderDirection: desc
  ) {
    id
    address
    details
    title
    createdAt
    winner
    rating(where: {status: true}){
      id
    }
    userRatingStatus:rating(where: {userAddress: $address,status: true}){
      status
    }
  }
}
`;

export {
  PROPOSAL_PENDING_GRAPHQL,
  PROPOSAL_ACCEPTED_GRAPHQL,
  PROPOSAL_REJECT_OR_INCOMPLETE_OR_COMPLETED_GRAPHQL,
  USER_PROPOSAL_PENDING_GRAPHQL,
  USER_PROPOSAL_ACCEPTED_GRAPHQL,
  USER_PROPOSAL_REJECT_OR_INCOMPLETE_OR_COMPLETED_GRAPHQL,
  ADMIN_PROPOSAL_PENDING_GRAPHQL,
  ADMIN_PROPOSAL_ACCEPTED,
  ADMIN_PROPOSAL_REJECT,
  ADMIN_PROPOSAL_COMPLETED_OR_IN_COMPLETED,
  ADMIN_PROPOSAL_RENEW_APPROVE_PENDING,
  ADMIN_PROPOSAL_SUBMITTED_APPROVE_PENDING,
  ADMIN_PROPOSAL_DUE_DATE_FINISHED_GRAPHQL,
  ADMIN_DASHBOARD_COUNT,
  PROPOSED_IDEAS_GRAPHQL,
};
