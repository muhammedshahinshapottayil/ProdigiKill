import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  Evt__Applied,
  Evt__Rate__Proposed__Idea,
  Evt__Renew__Rate,
} from "../generated/ProdigiKill/ProdigiKill";
import { Proposal, ProposalRating, RenewRating } from "../generated/schema";

function genID(id: BigInt, address: Address): string {
  return id.toHexString() + address.toHexString();
}

export function handleProposalCreate(event: Evt__Applied): void {
  const proposal = new Proposal(
    genID(event.params.id, event.params.userAddress)
  );
  proposal.userAddress = event.params.userAddress;
  proposal.title = event.params.title;
  proposal.details = event.params.details;
  proposal.finalDate = event.params.date;
  proposal.createdAt = event.block.timestamp;
  proposal.withdrawal = false;
  proposal.status = event.params.status;
  proposal.transactionHash = event.transaction.hash.toHexString();
  proposal.save();
}

export function handleProposalRating(event: Evt__Rate__Proposed__Idea): void {
  let rating = ProposalRating.load(
    genID(event.params.id, event.params.userAddress)
  );

  if (rating === null) {
    rating = new ProposalRating(
      genID(event.params.id, event.params.userAddress)
    );
    rating.ProposalID = event.params.id;
    rating.userAddress = event.params.userAddress;
    rating.createdAt = event.block.timestamp;
    rating.status = true;
  } else {
    rating.status = !rating.status;
  }
  rating.updatedAt = event.block.timestamp;
  rating.save();
}

export function handleRenewRating(event: Evt__Renew__Rate): void {
  let rating = RenewRating.load(
    genID(event.params.id, event.params.userAddress)
  );

  if (rating === null) {
    rating = new RenewRating(genID(event.params.id, event.params.userAddress));
    rating.ProposalID = event.params.id;
    rating.userAddress = event.params.userAddress;
    rating.createdAt = event.block.timestamp;
    rating.status = true;
  } else {
    rating.status = !rating.status;
  }
  rating.updatedAt = event.block.timestamp;
  rating.save();
}
