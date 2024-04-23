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

export {
  PROPOSAL_PENDING_GRAPHQL,
  PROPOSAL_ACCEPTED_GRAPHQL,
  PROPOSAL_REJECT_OR_INCOMPLETE_OR_COMPLETED_GRAPHQL,
  USER_PROPOSAL_PENDING_GRAPHQL,
  USER_PROPOSAL_ACCEPTED_GRAPHQL,
  USER_PROPOSAL_REJECT_OR_INCOMPLETE_OR_COMPLETED_GRAPHQL,
  ADMIN_PROPOSAL_PENDING_GRAPHQL,
};
