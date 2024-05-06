// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Proposal extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Proposal entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Proposal must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Proposal", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Proposal | null {
    return changetype<Proposal | null>(store.get_in_block("Proposal", id));
  }

  static load(id: string): Proposal | null {
    return changetype<Proposal | null>(store.get("Proposal", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get userAddress(): Bytes {
    let value = this.get("userAddress");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set userAddress(value: Bytes) {
    this.set("userAddress", Value.fromBytes(value));
  }

  get title(): string {
    let value = this.get("title");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set title(value: string) {
    this.set("title", Value.fromString(value));
  }

  get details(): string {
    let value = this.get("details");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set details(value: string) {
    this.set("details", Value.fromString(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get finalDate(): BigInt {
    let value = this.get("finalDate");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set finalDate(value: BigInt) {
    this.set("finalDate", Value.fromBigInt(value));
  }

  get withdrawal(): boolean {
    let value = this.get("withdrawal");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set withdrawal(value: boolean) {
    this.set("withdrawal", Value.fromBoolean(value));
  }

  get status(): i32 {
    let value = this.get("status");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set status(value: i32) {
    this.set("status", Value.fromI32(value));
  }

  get transactionHash(): string {
    let value = this.get("transactionHash");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set transactionHash(value: string) {
    this.set("transactionHash", Value.fromString(value));
  }

  get updatedAt(): BigInt | null {
    let value = this.get("updatedAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updatedAt(value: BigInt | null) {
    if (!value) {
      this.unset("updatedAt");
    } else {
      this.set("updatedAt", Value.fromBigInt(<BigInt>value));
    }
  }

  get proposalRating(): ProposalRatingLoader {
    return new ProposalRatingLoader(
      "Proposal",
      this.get("id")!.toString(),
      "proposalRating"
    );
  }

  get renewRequest(): RequestRenewalLoader {
    return new RequestRenewalLoader(
      "Proposal",
      this.get("id")!.toString(),
      "renewRequest"
    );
  }

  get submitProof(): SubmitProofLoader {
    return new SubmitProofLoader(
      "Proposal",
      this.get("id")!.toString(),
      "submitProof"
    );
  }
}

export class ProposalRating extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ProposalRating entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ProposalRating must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ProposalRating", id.toString(), this);
    }
  }

  static loadInBlock(id: string): ProposalRating | null {
    return changetype<ProposalRating | null>(
      store.get_in_block("ProposalRating", id)
    );
  }

  static load(id: string): ProposalRating | null {
    return changetype<ProposalRating | null>(store.get("ProposalRating", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ProposalID(): string {
    let value = this.get("ProposalID");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set ProposalID(value: string) {
    this.set("ProposalID", Value.fromString(value));
  }

  get userAddress(): Bytes {
    let value = this.get("userAddress");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set userAddress(value: Bytes) {
    this.set("userAddress", Value.fromBytes(value));
  }

  get status(): boolean {
    let value = this.get("status");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set status(value: boolean) {
    this.set("status", Value.fromBoolean(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get updatedAt(): BigInt | null {
    let value = this.get("updatedAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updatedAt(value: BigInt | null) {
    if (!value) {
      this.unset("updatedAt");
    } else {
      this.set("updatedAt", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class RequestRenewal extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save RequestRenewal entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type RequestRenewal must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("RequestRenewal", id.toString(), this);
    }
  }

  static loadInBlock(id: string): RequestRenewal | null {
    return changetype<RequestRenewal | null>(
      store.get_in_block("RequestRenewal", id)
    );
  }

  static load(id: string): RequestRenewal | null {
    return changetype<RequestRenewal | null>(store.get("RequestRenewal", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ProposalID(): string {
    let value = this.get("ProposalID");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set ProposalID(value: string) {
    this.set("ProposalID", Value.fromString(value));
  }

  get userAddress(): Bytes {
    let value = this.get("userAddress");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set userAddress(value: Bytes) {
    this.set("userAddress", Value.fromBytes(value));
  }

  get reason(): string {
    let value = this.get("reason");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set reason(value: string) {
    this.set("reason", Value.fromString(value));
  }

  get date(): BigInt {
    let value = this.get("date");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set date(value: BigInt) {
    this.set("date", Value.fromBigInt(value));
  }

  get status(): i32 {
    let value = this.get("status");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set status(value: i32) {
    this.set("status", Value.fromI32(value));
  }

  get renewalRating(): RenewRatingLoader {
    return new RenewRatingLoader(
      "RequestRenewal",
      this.get("id")!.toString(),
      "renewalRating"
    );
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get updatedAt(): BigInt | null {
    let value = this.get("updatedAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updatedAt(value: BigInt | null) {
    if (!value) {
      this.unset("updatedAt");
    } else {
      this.set("updatedAt", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class RenewRating extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save RenewRating entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type RenewRating must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("RenewRating", id.toString(), this);
    }
  }

  static loadInBlock(id: string): RenewRating | null {
    return changetype<RenewRating | null>(
      store.get_in_block("RenewRating", id)
    );
  }

  static load(id: string): RenewRating | null {
    return changetype<RenewRating | null>(store.get("RenewRating", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ProposalID(): string {
    let value = this.get("ProposalID");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set ProposalID(value: string) {
    this.set("ProposalID", Value.fromString(value));
  }

  get userAddress(): Bytes {
    let value = this.get("userAddress");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set userAddress(value: Bytes) {
    this.set("userAddress", Value.fromBytes(value));
  }

  get status(): boolean {
    let value = this.get("status");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set status(value: boolean) {
    this.set("status", Value.fromBoolean(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get updatedAt(): BigInt | null {
    let value = this.get("updatedAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updatedAt(value: BigInt | null) {
    if (!value) {
      this.unset("updatedAt");
    } else {
      this.set("updatedAt", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class SubmitProof extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SubmitProof entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type SubmitProof must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("SubmitProof", id.toString(), this);
    }
  }

  static loadInBlock(id: string): SubmitProof | null {
    return changetype<SubmitProof | null>(
      store.get_in_block("SubmitProof", id)
    );
  }

  static load(id: string): SubmitProof | null {
    return changetype<SubmitProof | null>(store.get("SubmitProof", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ProposalID(): string {
    let value = this.get("ProposalID");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set ProposalID(value: string) {
    this.set("ProposalID", Value.fromString(value));
  }

  get userAddress(): Bytes {
    let value = this.get("userAddress");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set userAddress(value: Bytes) {
    this.set("userAddress", Value.fromBytes(value));
  }

  get proof(): string {
    let value = this.get("proof");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set proof(value: string) {
    this.set("proof", Value.fromString(value));
  }

  get status(): i32 {
    let value = this.get("status");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set status(value: i32) {
    this.set("status", Value.fromI32(value));
  }

  get submitRating(): SubmitRatingLoader {
    return new SubmitRatingLoader(
      "SubmitProof",
      this.get("id")!.toString(),
      "submitRating"
    );
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get updatedAt(): BigInt | null {
    let value = this.get("updatedAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updatedAt(value: BigInt | null) {
    if (!value) {
      this.unset("updatedAt");
    } else {
      this.set("updatedAt", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class SubmitRating extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SubmitRating entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type SubmitRating must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("SubmitRating", id.toString(), this);
    }
  }

  static loadInBlock(id: string): SubmitRating | null {
    return changetype<SubmitRating | null>(
      store.get_in_block("SubmitRating", id)
    );
  }

  static load(id: string): SubmitRating | null {
    return changetype<SubmitRating | null>(store.get("SubmitRating", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ProposalID(): string {
    let value = this.get("ProposalID");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set ProposalID(value: string) {
    this.set("ProposalID", Value.fromString(value));
  }

  get userAddress(): Bytes {
    let value = this.get("userAddress");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set userAddress(value: Bytes) {
    this.set("userAddress", Value.fromBytes(value));
  }

  get status(): boolean {
    let value = this.get("status");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set status(value: boolean) {
    this.set("status", Value.fromBoolean(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get updatedAt(): BigInt | null {
    let value = this.get("updatedAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updatedAt(value: BigInt | null) {
    if (!value) {
      this.unset("updatedAt");
    } else {
      this.set("updatedAt", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class BlackListed extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save BlackListed entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type BlackListed must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("BlackListed", id.toString(), this);
    }
  }

  static loadInBlock(id: string): BlackListed | null {
    return changetype<BlackListed | null>(
      store.get_in_block("BlackListed", id)
    );
  }

  static load(id: string): BlackListed | null {
    return changetype<BlackListed | null>(store.get("BlackListed", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get status(): boolean {
    let value = this.get("status");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set status(value: boolean) {
    this.set("status", Value.fromBoolean(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get updatedAt(): BigInt | null {
    let value = this.get("updatedAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updatedAt(value: BigInt | null) {
    if (!value) {
      this.unset("updatedAt");
    } else {
      this.set("updatedAt", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class Donations extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Donations entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Donations must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Donations", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Donations | null {
    return changetype<Donations | null>(store.get_in_block("Donations", id));
  }

  static load(id: string): Donations | null {
    return changetype<Donations | null>(store.get("Donations", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }
}

export class ProposalIdea extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ProposalIdea entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ProposalIdea must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ProposalIdea", id.toString(), this);
    }
  }

  static loadInBlock(id: string): ProposalIdea | null {
    return changetype<ProposalIdea | null>(
      store.get_in_block("ProposalIdea", id)
    );
  }

  static load(id: string): ProposalIdea | null {
    return changetype<ProposalIdea | null>(store.get("ProposalIdea", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get title(): string {
    let value = this.get("title");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set title(value: string) {
    this.set("title", Value.fromString(value));
  }

  get details(): string {
    let value = this.get("details");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set details(value: string) {
    this.set("details", Value.fromString(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get winner(): boolean {
    let value = this.get("winner");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set winner(value: boolean) {
    this.set("winner", Value.fromBoolean(value));
  }

  get winningDate(): BigInt | null {
    let value = this.get("winningDate");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set winningDate(value: BigInt | null) {
    if (!value) {
      this.unset("winningDate");
    } else {
      this.set("winningDate", Value.fromBigInt(<BigInt>value));
    }
  }

  get rating(): ProposalIdeaRatingLoader {
    return new ProposalIdeaRatingLoader(
      "ProposalIdea",
      this.get("id")!.toString(),
      "rating"
    );
  }
}

export class ProposalIdeaRating extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ProposalIdeaRating entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ProposalIdeaRating must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ProposalIdeaRating", id.toString(), this);
    }
  }

  static loadInBlock(id: string): ProposalIdeaRating | null {
    return changetype<ProposalIdeaRating | null>(
      store.get_in_block("ProposalIdeaRating", id)
    );
  }

  static load(id: string): ProposalIdeaRating | null {
    return changetype<ProposalIdeaRating | null>(
      store.get("ProposalIdeaRating", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ProposalID(): string {
    let value = this.get("ProposalID");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set ProposalID(value: string) {
    this.set("ProposalID", Value.fromString(value));
  }

  get userAddress(): Bytes {
    let value = this.get("userAddress");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set userAddress(value: Bytes) {
    this.set("userAddress", Value.fromBytes(value));
  }

  get status(): boolean {
    let value = this.get("status");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set status(value: boolean) {
    this.set("status", Value.fromBoolean(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get updatedAt(): BigInt | null {
    let value = this.get("updatedAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set updatedAt(value: BigInt | null) {
    if (!value) {
      this.unset("updatedAt");
    } else {
      this.set("updatedAt", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class Winner extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Winner entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Winner must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Winner", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Winner | null {
    return changetype<Winner | null>(store.get_in_block("Winner", id));
  }

  static load(id: string): Winner | null {
    return changetype<Winner | null>(store.get("Winner", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get ProposalID(): string {
    let value = this.get("ProposalID");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set ProposalID(value: string) {
    this.set("ProposalID", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }
}

export class ProposalRatingLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): ProposalRating[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<ProposalRating[]>(value);
  }
}

export class RequestRenewalLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): RequestRenewal[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<RequestRenewal[]>(value);
  }
}

export class SubmitProofLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): SubmitProof[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<SubmitProof[]>(value);
  }
}

export class RenewRatingLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): RenewRating[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<RenewRating[]>(value);
  }
}

export class SubmitRatingLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): SubmitRating[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<SubmitRating[]>(value);
  }
}

export class ProposalIdeaRatingLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): ProposalIdeaRating[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<ProposalIdeaRating[]>(value);
  }
}
