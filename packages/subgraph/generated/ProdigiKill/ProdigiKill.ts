// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class Evt__Applied extends ethereum.Event {
  get params(): Evt__Applied__Params {
    return new Evt__Applied__Params(this);
  }
}

export class Evt__Applied__Params {
  _event: Evt__Applied;

  constructor(event: Evt__Applied) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get userAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get title(): string {
    return this._event.parameters[2].value.toString();
  }

  get details(): string {
    return this._event.parameters[3].value.toString();
  }

  get date(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get status(): i32 {
    return this._event.parameters[5].value.toI32();
  }
}

export class Evt__Black__Listed extends ethereum.Event {
  get params(): Evt__Black__Listed__Params {
    return new Evt__Black__Listed__Params(this);
  }
}

export class Evt__Black__Listed__Params {
  _event: Evt__Black__Listed;

  constructor(event: Evt__Black__Listed) {
    this._event = event;
  }

  get userAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get status(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }
}

export class Evt__Change__Status extends ethereum.Event {
  get params(): Evt__Change__Status__Params {
    return new Evt__Change__Status__Params(this);
  }
}

export class Evt__Change__Status__Params {
  _event: Evt__Change__Status;

  constructor(event: Evt__Change__Status) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get status(): i32 {
    return this._event.parameters[1].value.toI32();
  }
}

export class Evt__Completed__Proof extends ethereum.Event {
  get params(): Evt__Completed__Proof__Params {
    return new Evt__Completed__Proof__Params(this);
  }
}

export class Evt__Completed__Proof__Params {
  _event: Evt__Completed__Proof;

  constructor(event: Evt__Completed__Proof) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get userAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Evt__Donation extends ethereum.Event {
  get params(): Evt__Donation__Params {
    return new Evt__Donation__Params(this);
  }
}

export class Evt__Donation__Params {
  _event: Evt__Donation;

  constructor(event: Evt__Donation) {
    this._event = event;
  }

  get donor(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Evt__Proposal__Idea extends ethereum.Event {
  get params(): Evt__Proposal__Idea__Params {
    return new Evt__Proposal__Idea__Params(this);
  }
}

export class Evt__Proposal__Idea__Params {
  _event: Evt__Proposal__Idea;

  constructor(event: Evt__Proposal__Idea) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get userAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get title(): string {
    return this._event.parameters[2].value.toString();
  }

  get details(): string {
    return this._event.parameters[3].value.toString();
  }
}

export class Evt__Rate extends ethereum.Event {
  get params(): Evt__Rate__Params {
    return new Evt__Rate__Params(this);
  }
}

export class Evt__Rate__Params {
  _event: Evt__Rate;

  constructor(event: Evt__Rate) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get userAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Evt__Rate__Proposed__Idea extends ethereum.Event {
  get params(): Evt__Rate__Proposed__Idea__Params {
    return new Evt__Rate__Proposed__Idea__Params(this);
  }
}

export class Evt__Rate__Proposed__Idea__Params {
  _event: Evt__Rate__Proposed__Idea;

  constructor(event: Evt__Rate__Proposed__Idea) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get userAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Evt__Renew extends ethereum.Event {
  get params(): Evt__Renew__Params {
    return new Evt__Renew__Params(this);
  }
}

export class Evt__Renew__Params {
  _event: Evt__Renew;

  constructor(event: Evt__Renew) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get userAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get delayReason(): string {
    return this._event.parameters[2].value.toString();
  }

  get date(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get status(): i32 {
    return this._event.parameters[4].value.toI32();
  }
}

export class Evt__Renew__Accepted extends ethereum.Event {
  get params(): Evt__Renew__Accepted__Params {
    return new Evt__Renew__Accepted__Params(this);
  }
}

export class Evt__Renew__Accepted__Params {
  _event: Evt__Renew__Accepted;

  constructor(event: Evt__Renew__Accepted) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get status(): i32 {
    return this._event.parameters[1].value.toI32();
  }
}

export class Evt__Renew__Rate extends ethereum.Event {
  get params(): Evt__Renew__Rate__Params {
    return new Evt__Renew__Rate__Params(this);
  }
}

export class Evt__Renew__Rate__Params {
  _event: Evt__Renew__Rate;

  constructor(event: Evt__Renew__Rate) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get userAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Evt__Renew__Rejected extends ethereum.Event {
  get params(): Evt__Renew__Rejected__Params {
    return new Evt__Renew__Rejected__Params(this);
  }
}

export class Evt__Renew__Rejected__Params {
  _event: Evt__Renew__Rejected;

  constructor(event: Evt__Renew__Rejected) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get status(): i32 {
    return this._event.parameters[1].value.toI32();
  }
}

export class Evt__Submit__Proof extends ethereum.Event {
  get params(): Evt__Submit__Proof__Params {
    return new Evt__Submit__Proof__Params(this);
  }
}

export class Evt__Submit__Proof__Params {
  _event: Evt__Submit__Proof;

  constructor(event: Evt__Submit__Proof) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get userAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get status(): i32 {
    return this._event.parameters[2].value.toI32();
  }

  get proof(): string {
    return this._event.parameters[3].value.toString();
  }
}

export class Evt__Winner__of__Idea extends ethereum.Event {
  get params(): Evt__Winner__of__Idea__Params {
    return new Evt__Winner__of__Idea__Params(this);
  }
}

export class Evt__Winner__of__Idea__Params {
  _event: Evt__Winner__of__Idea;

  constructor(event: Evt__Winner__of__Idea) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get userAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Evt__Withdrawed__Collateral extends ethereum.Event {
  get params(): Evt__Withdrawed__Collateral__Params {
    return new Evt__Withdrawed__Collateral__Params(this);
  }
}

export class Evt__Withdrawed__Collateral__Params {
  _event: Evt__Withdrawed__Collateral;

  constructor(event: Evt__Withdrawed__Collateral) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get userAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Evt__Withdrawed__Reward extends ethereum.Event {
  get params(): Evt__Withdrawed__Reward__Params {
    return new Evt__Withdrawed__Reward__Params(this);
  }
}

export class Evt__Withdrawed__Reward__Params {
  _event: Evt__Withdrawed__Reward;

  constructor(event: Evt__Withdrawed__Reward) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get userAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class ProdigiKill__getIdeaByIdResultValue0Struct extends ethereum.Tuple {
  get ideaId(): BigInt {
    return this[0].toBigInt();
  }

  get userAddress(): Address {
    return this[1].toAddress();
  }

  get title(): string {
    return this[2].toString();
  }
}

export class ProdigiKill__getTaskByIdResultValue0Struct extends ethereum.Tuple {
  get id(): BigInt {
    return this[0].toBigInt();
  }

  get userAddress(): Address {
    return this[1].toAddress();
  }

  get title(): string {
    return this[2].toString();
  }

  get date(): BigInt {
    return this[3].toBigInt();
  }

  get withdrawed(): boolean {
    return this[4].toBoolean();
  }

  get status(): i32 {
    return this[5].toI32();
  }
}

export class ProdigiKill extends ethereum.SmartContract {
  static bind(address: Address): ProdigiKill {
    return new ProdigiKill("ProdigiKill", address);
  }

  getIdeaById(id: BigInt): ProdigiKill__getIdeaByIdResultValue0Struct {
    let result = super.call(
      "getIdeaById",
      "getIdeaById(uint256):((uint256,address,string))",
      [ethereum.Value.fromUnsignedBigInt(id)],
    );

    return changetype<ProdigiKill__getIdeaByIdResultValue0Struct>(
      result[0].toTuple(),
    );
  }

  try_getIdeaById(
    id: BigInt,
  ): ethereum.CallResult<ProdigiKill__getIdeaByIdResultValue0Struct> {
    let result = super.tryCall(
      "getIdeaById",
      "getIdeaById(uint256):((uint256,address,string))",
      [ethereum.Value.fromUnsignedBigInt(id)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<ProdigiKill__getIdeaByIdResultValue0Struct>(
        value[0].toTuple(),
      ),
    );
  }

  getTaskById(id: BigInt): ProdigiKill__getTaskByIdResultValue0Struct {
    let result = super.call(
      "getTaskById",
      "getTaskById(uint256):((uint256,address,string,uint256,bool,uint8))",
      [ethereum.Value.fromUnsignedBigInt(id)],
    );

    return changetype<ProdigiKill__getTaskByIdResultValue0Struct>(
      result[0].toTuple(),
    );
  }

  try_getTaskById(
    id: BigInt,
  ): ethereum.CallResult<ProdigiKill__getTaskByIdResultValue0Struct> {
    let result = super.tryCall(
      "getTaskById",
      "getTaskById(uint256):((uint256,address,string,uint256,bool,uint8))",
      [ethereum.Value.fromUnsignedBigInt(id)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<ProdigiKill__getTaskByIdResultValue0Struct>(
        value[0].toTuple(),
      ),
    );
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class DefaultCall extends ethereum.Call {
  get inputs(): DefaultCall__Inputs {
    return new DefaultCall__Inputs(this);
  }

  get outputs(): DefaultCall__Outputs {
    return new DefaultCall__Outputs(this);
  }
}

export class DefaultCall__Inputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}

export class DefaultCall__Outputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}

export class AddToBlackListCall extends ethereum.Call {
  get inputs(): AddToBlackListCall__Inputs {
    return new AddToBlackListCall__Inputs(this);
  }

  get outputs(): AddToBlackListCall__Outputs {
    return new AddToBlackListCall__Outputs(this);
  }
}

export class AddToBlackListCall__Inputs {
  _call: AddToBlackListCall;

  constructor(call: AddToBlackListCall) {
    this._call = call;
  }

  get addr(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddToBlackListCall__Outputs {
  _call: AddToBlackListCall;

  constructor(call: AddToBlackListCall) {
    this._call = call;
  }
}

export class ApplicationBulkStatusChangeCall extends ethereum.Call {
  get inputs(): ApplicationBulkStatusChangeCall__Inputs {
    return new ApplicationBulkStatusChangeCall__Inputs(this);
  }

  get outputs(): ApplicationBulkStatusChangeCall__Outputs {
    return new ApplicationBulkStatusChangeCall__Outputs(this);
  }
}

export class ApplicationBulkStatusChangeCall__Inputs {
  _call: ApplicationBulkStatusChangeCall;

  constructor(call: ApplicationBulkStatusChangeCall) {
    this._call = call;
  }

  get arrId(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }

  get status(): i32 {
    return this._call.inputValues[1].value.toI32();
  }
}

export class ApplicationBulkStatusChangeCall__Outputs {
  _call: ApplicationBulkStatusChangeCall;

  constructor(call: ApplicationBulkStatusChangeCall) {
    this._call = call;
  }
}

export class BestReviewerCall extends ethereum.Call {
  get inputs(): BestReviewerCall__Inputs {
    return new BestReviewerCall__Inputs(this);
  }

  get outputs(): BestReviewerCall__Outputs {
    return new BestReviewerCall__Outputs(this);
  }
}

export class BestReviewerCall__Inputs {
  _call: BestReviewerCall;

  constructor(call: BestReviewerCall) {
    this._call = call;
  }

  get addr(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class BestReviewerCall__Outputs {
  _call: BestReviewerCall;

  constructor(call: BestReviewerCall) {
    this._call = call;
  }
}

export class DonationCall extends ethereum.Call {
  get inputs(): DonationCall__Inputs {
    return new DonationCall__Inputs(this);
  }

  get outputs(): DonationCall__Outputs {
    return new DonationCall__Outputs(this);
  }
}

export class DonationCall__Inputs {
  _call: DonationCall;

  constructor(call: DonationCall) {
    this._call = call;
  }
}

export class DonationCall__Outputs {
  _call: DonationCall;

  constructor(call: DonationCall) {
    this._call = call;
  }
}

export class ProposeIdeaCall extends ethereum.Call {
  get inputs(): ProposeIdeaCall__Inputs {
    return new ProposeIdeaCall__Inputs(this);
  }

  get outputs(): ProposeIdeaCall__Outputs {
    return new ProposeIdeaCall__Outputs(this);
  }
}

export class ProposeIdeaCall__Inputs {
  _call: ProposeIdeaCall;

  constructor(call: ProposeIdeaCall) {
    this._call = call;
  }

  get title(): string {
    return this._call.inputValues[0].value.toString();
  }

  get details(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class ProposeIdeaCall__Outputs {
  _call: ProposeIdeaCall;

  constructor(call: ProposeIdeaCall) {
    this._call = call;
  }
}

export class RateApplicationCall extends ethereum.Call {
  get inputs(): RateApplicationCall__Inputs {
    return new RateApplicationCall__Inputs(this);
  }

  get outputs(): RateApplicationCall__Outputs {
    return new RateApplicationCall__Outputs(this);
  }
}

export class RateApplicationCall__Inputs {
  _call: RateApplicationCall;

  constructor(call: RateApplicationCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class RateApplicationCall__Outputs {
  _call: RateApplicationCall;

  constructor(call: RateApplicationCall) {
    this._call = call;
  }
}

export class RateCompletedProofCall extends ethereum.Call {
  get inputs(): RateCompletedProofCall__Inputs {
    return new RateCompletedProofCall__Inputs(this);
  }

  get outputs(): RateCompletedProofCall__Outputs {
    return new RateCompletedProofCall__Outputs(this);
  }
}

export class RateCompletedProofCall__Inputs {
  _call: RateCompletedProofCall;

  constructor(call: RateCompletedProofCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class RateCompletedProofCall__Outputs {
  _call: RateCompletedProofCall;

  constructor(call: RateCompletedProofCall) {
    this._call = call;
  }
}

export class RateProposedIdeaCall extends ethereum.Call {
  get inputs(): RateProposedIdeaCall__Inputs {
    return new RateProposedIdeaCall__Inputs(this);
  }

  get outputs(): RateProposedIdeaCall__Outputs {
    return new RateProposedIdeaCall__Outputs(this);
  }
}

export class RateProposedIdeaCall__Inputs {
  _call: RateProposedIdeaCall;

  constructor(call: RateProposedIdeaCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class RateProposedIdeaCall__Outputs {
  _call: RateProposedIdeaCall;

  constructor(call: RateProposedIdeaCall) {
    this._call = call;
  }
}

export class RateRenewApplicationCall extends ethereum.Call {
  get inputs(): RateRenewApplicationCall__Inputs {
    return new RateRenewApplicationCall__Inputs(this);
  }

  get outputs(): RateRenewApplicationCall__Outputs {
    return new RateRenewApplicationCall__Outputs(this);
  }
}

export class RateRenewApplicationCall__Inputs {
  _call: RateRenewApplicationCall;

  constructor(call: RateRenewApplicationCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class RateRenewApplicationCall__Outputs {
  _call: RateRenewApplicationCall;

  constructor(call: RateRenewApplicationCall) {
    this._call = call;
  }
}

export class RejectRenewApplicationCall extends ethereum.Call {
  get inputs(): RejectRenewApplicationCall__Inputs {
    return new RejectRenewApplicationCall__Inputs(this);
  }

  get outputs(): RejectRenewApplicationCall__Outputs {
    return new RejectRenewApplicationCall__Outputs(this);
  }
}

export class RejectRenewApplicationCall__Inputs {
  _call: RejectRenewApplicationCall;

  constructor(call: RejectRenewApplicationCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class RejectRenewApplicationCall__Outputs {
  _call: RejectRenewApplicationCall;

  constructor(call: RejectRenewApplicationCall) {
    this._call = call;
  }
}

export class RenewApplicationAcceptCall extends ethereum.Call {
  get inputs(): RenewApplicationAcceptCall__Inputs {
    return new RenewApplicationAcceptCall__Inputs(this);
  }

  get outputs(): RenewApplicationAcceptCall__Outputs {
    return new RenewApplicationAcceptCall__Outputs(this);
  }
}

export class RenewApplicationAcceptCall__Inputs {
  _call: RenewApplicationAcceptCall;

  constructor(call: RenewApplicationAcceptCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get date(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class RenewApplicationAcceptCall__Outputs {
  _call: RenewApplicationAcceptCall;

  constructor(call: RenewApplicationAcceptCall) {
    this._call = call;
  }
}

export class RenewApplyCall extends ethereum.Call {
  get inputs(): RenewApplyCall__Inputs {
    return new RenewApplyCall__Inputs(this);
  }

  get outputs(): RenewApplyCall__Outputs {
    return new RenewApplyCall__Outputs(this);
  }
}

export class RenewApplyCall__Inputs {
  _call: RenewApplyCall;

  constructor(call: RenewApplyCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get delayReason(): string {
    return this._call.inputValues[1].value.toString();
  }

  get date(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class RenewApplyCall__Outputs {
  _call: RenewApplyCall;

  constructor(call: RenewApplyCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SubmitProofCall extends ethereum.Call {
  get inputs(): SubmitProofCall__Inputs {
    return new SubmitProofCall__Inputs(this);
  }

  get outputs(): SubmitProofCall__Outputs {
    return new SubmitProofCall__Outputs(this);
  }
}

export class SubmitProofCall__Inputs {
  _call: SubmitProofCall;

  constructor(call: SubmitProofCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get proof(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class SubmitProofCall__Outputs {
  _call: SubmitProofCall;

  constructor(call: SubmitProofCall) {
    this._call = call;
  }
}

export class TaskApplyCall extends ethereum.Call {
  get inputs(): TaskApplyCall__Inputs {
    return new TaskApplyCall__Inputs(this);
  }

  get outputs(): TaskApplyCall__Outputs {
    return new TaskApplyCall__Outputs(this);
  }
}

export class TaskApplyCall__Inputs {
  _call: TaskApplyCall;

  constructor(call: TaskApplyCall) {
    this._call = call;
  }

  get title(): string {
    return this._call.inputValues[0].value.toString();
  }

  get details(): string {
    return this._call.inputValues[1].value.toString();
  }

  get date(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TaskApplyCall__Outputs {
  _call: TaskApplyCall;

  constructor(call: TaskApplyCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class WinnerOfIdeaCall extends ethereum.Call {
  get inputs(): WinnerOfIdeaCall__Inputs {
    return new WinnerOfIdeaCall__Inputs(this);
  }

  get outputs(): WinnerOfIdeaCall__Outputs {
    return new WinnerOfIdeaCall__Outputs(this);
  }
}

export class WinnerOfIdeaCall__Inputs {
  _call: WinnerOfIdeaCall;

  constructor(call: WinnerOfIdeaCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WinnerOfIdeaCall__Outputs {
  _call: WinnerOfIdeaCall;

  constructor(call: WinnerOfIdeaCall) {
    this._call = call;
  }
}

export class WithdrawCollateralCall extends ethereum.Call {
  get inputs(): WithdrawCollateralCall__Inputs {
    return new WithdrawCollateralCall__Inputs(this);
  }

  get outputs(): WithdrawCollateralCall__Outputs {
    return new WithdrawCollateralCall__Outputs(this);
  }
}

export class WithdrawCollateralCall__Inputs {
  _call: WithdrawCollateralCall;

  constructor(call: WithdrawCollateralCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawCollateralCall__Outputs {
  _call: WithdrawCollateralCall;

  constructor(call: WithdrawCollateralCall) {
    this._call = call;
  }
}

export class WithdrawRewardCall extends ethereum.Call {
  get inputs(): WithdrawRewardCall__Inputs {
    return new WithdrawRewardCall__Inputs(this);
  }

  get outputs(): WithdrawRewardCall__Outputs {
    return new WithdrawRewardCall__Outputs(this);
  }
}

export class WithdrawRewardCall__Inputs {
  _call: WithdrawRewardCall;

  constructor(call: WithdrawRewardCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawRewardCall__Outputs {
  _call: WithdrawRewardCall;

  constructor(call: WithdrawRewardCall) {
    this._call = call;
  }
}

export class WithdrawRunningFeesCall extends ethereum.Call {
  get inputs(): WithdrawRunningFeesCall__Inputs {
    return new WithdrawRunningFeesCall__Inputs(this);
  }

  get outputs(): WithdrawRunningFeesCall__Outputs {
    return new WithdrawRunningFeesCall__Outputs(this);
  }
}

export class WithdrawRunningFeesCall__Inputs {
  _call: WithdrawRunningFeesCall;

  constructor(call: WithdrawRunningFeesCall) {
    this._call = call;
  }
}

export class WithdrawRunningFeesCall__Outputs {
  _call: WithdrawRunningFeesCall;

  constructor(call: WithdrawRunningFeesCall) {
    this._call = call;
  }
}
