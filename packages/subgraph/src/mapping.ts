import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  Evt__Applied,
  Evt__Rate,
  Evt__Renew,
  Evt__Renew__Rate,
  Evt__Change__Status,
  Evt__Renew__Accepted,
  Evt__Renew__Rejected,
  Evt__Submit__Proof,
  Evt__Completed__Proof,
  Evt__Withdrawed__Collateral,
  Evt__Withdrawed__Reward,
  Evt__Black__Listed,
  Evt__Donation,
} from "../generated/ProdigiKill/ProdigiKill";
import {
  Proposal,
  ProposalRating,
  RequestRenewal,
  RenewRating,
  SubmitProof,
  SubmitRating,
  BlackListed,
  Donations,
} from "../generated/schema";

function genID(id: BigInt, address: Address): string {
  return id.toHexString() + "-" + address.toHexString();
}

export function handleProposalCreate(event: Evt__Applied): void {
  const proposal = new Proposal(event.params.id.toHexString());
  proposal.userAddress = event.params.userAddress;
  proposal.title = event.params.title;
  proposal.details = event.params.details;
  proposal.finalDate = new Date(Number(event.params.date) * 1000).toISOString();
  proposal.createdAt = new Date(
    Number(event.block.timestamp) * 1000
  ).toISOString();
  proposal.withdrawal = false;
  proposal.status = event.params.status;
  proposal.transactionHash = event.transaction.hash.toHexString();
  proposal.save();
}

export function handleProposalRating(event: Evt__Rate): void {
  let rating = ProposalRating.load(
    genID(event.params.id, event.params.userAddress)
  );

  if (rating === null) {
    rating = new ProposalRating(
      genID(event.params.id, event.params.userAddress)
    );
    rating.ProposalID = event.params.id.toHexString();
    rating.userAddress = event.params.userAddress;
    rating.createdAt = new Date(
      Number(event.block.timestamp) * 1000
    ).toISOString();
    rating.status = true;
  } else {
    rating.status = !rating.status;
  }
  rating.updatedAt = new Date(
    Number(event.block.timestamp) * 1000
  ).toISOString();
  rating.save();
}

export function handleRenewCreate(event: Evt__Renew): void {
  const rating = new RequestRenewal(event.params.id.toHexString());
  rating.ProposalID = event.params.id.toHexString();
  rating.userAddress = event.params.userAddress;
  rating.reason = event.params.delayReason;
  rating.status = event.params.status;
  rating.createdAt = new Date(
    Number(event.block.timestamp) * 1000
  ).toISOString();
  rating.updatedAt = new Date(
    Number(event.block.timestamp) * 1000
  ).toISOString();
  rating.save();
}

export function handleRenewRating(event: Evt__Renew__Rate): void {
  let rating = RenewRating.load(
    genID(event.params.id, event.params.userAddress)
  );

  if (rating === null) {
    rating = new RenewRating(genID(event.params.id, event.params.userAddress));
    rating.ProposalID = event.params.id.toHexString();
    rating.userAddress = event.params.userAddress;
    rating.createdAt = new Date(
      Number(event.block.timestamp) * 1000
    ).toISOString();
    rating.status = true;
  } else {
    rating.status = !rating.status;
  }
  rating.updatedAt = new Date(
    Number(event.block.timestamp) * 1000
  ).toISOString();
  rating.save();
}

export function handleProposalStatusChange(event: Evt__Change__Status): void {
  const proposal = Proposal.load(event.params.id.toHexString());
  if (proposal !== null) {
    proposal.status = event.params.status;
    proposal.updatedAt = new Date(
      Number(event.block.timestamp) * 1000
    ).toISOString();
    proposal.save();
  }
}

export function handleRenewAccepted(event: Evt__Renew__Accepted): void {
  const proposal = Proposal.load(event.params.id.toHexString());
  if (proposal !== null) {
    proposal.finalDate = new Date(
      Number(event.params.date) * 1000
    ).toISOString();
    proposal.updatedAt = new Date(
      Number(event.block.timestamp) * 1000
    ).toISOString();
    proposal.save();
  }

  const renew = RequestRenewal.load(event.params.id.toHexString());
  if (renew !== null) {
    renew.status = event.params.status;
    renew.updatedAt = new Date(
      Number(event.block.timestamp) * 1000
    ).toISOString();
    renew.save();
  }
}

export function handleRenewReject(event: Evt__Renew__Rejected): void {
  const renew = RequestRenewal.load(event.params.id.toHexString());
  if (renew !== null) {
    renew.status = event.params.status;
    renew.updatedAt = new Date(
      Number(event.block.timestamp) * 1000
    ).toISOString();
    renew.save();
  }
}

export function handleSubmitProof(event: Evt__Submit__Proof): void {
  const submit = new SubmitProof(event.params.id.toHexString());
  submit.ProposalID = event.params.id.toHexString();
  submit.userAddress = event.params.userAddress;
  submit.proof = event.params.proof;
  submit.status = event.params.status;
  submit.createdAt = new Date(
    Number(event.block.timestamp) * 1000
  ).toISOString();
  submit.updatedAt = new Date(
    Number(event.block.timestamp) * 1000
  ).toISOString();
  submit.save();
}

export function handleSubmitRating(event: Evt__Completed__Proof): void {
  let rating = SubmitRating.load(
    genID(event.params.id, event.params.userAddress)
  );

  if (rating === null) {
    rating = new SubmitRating(genID(event.params.id, event.params.userAddress));
    rating.ProposalID = event.params.id.toHexString();
    rating.userAddress = event.params.userAddress;
    rating.createdAt = new Date(
      Number(event.block.timestamp) * 1000
    ).toISOString();
    rating.status = true;
  } else {
    rating.status = !rating.status;
  }
  rating.updatedAt = new Date(
    Number(event.block.timestamp) * 1000
  ).toISOString();
  rating.save();
}

export function handleWithdrawCollateral(
  event: Evt__Withdrawed__Collateral
): void {
  const proposal = Proposal.load(event.params.id.toHexString());
  if (proposal !== null) {
    proposal.updatedAt = new Date(
      Number(event.block.timestamp) * 1000
    ).toISOString();
    proposal.withdrawal = true;
    proposal.save();
  }
}

export function handleWithdrawReward(event: Evt__Withdrawed__Reward): void {
  const proposal = Proposal.load(event.params.id.toHexString());
  if (proposal !== null) {
    proposal.updatedAt = new Date(
      Number(event.block.timestamp) * 1000
    ).toISOString();
    proposal.withdrawal = true;
    proposal.save();
  }
}

export function handleBlackListing(event: Evt__Black__Listed) {
  let list = BlackListed.load(event.params.userAddress.toHexString());
  if (list === null) {
    list = new BlackListed(event.params.userAddress.toHexString());
    list.status = true;
    list.createdAt = new Date(
      Number(event.block.timestamp) * 1000
    ).toISOString();
  } else list.status = !list.status;
  list.updatedAt = new Date(Number(event.block.timestamp) * 1000).toISOString();
  list.save();
}

export function handleDonation(event: Evt__Donation) {
  const donation = new Donations(event.transaction.hash.toHexString());
  donation.address = event.params.donor;
  donation.value = event.params.value;
  donation.createdAt = new Date(
    Number(event.block.timestamp) * 1000
  ).toISOString();
  donation.save();
}
