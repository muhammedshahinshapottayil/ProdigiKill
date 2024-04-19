const PROPOSAL_PENDING_ACCEPTED_GRAPHQL = `
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

export { PROPOSAL_PENDING_ACCEPTED_GRAPHQL };
