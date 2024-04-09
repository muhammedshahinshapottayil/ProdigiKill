//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

error Err__Apply();
error Err__Renew();
error Err__Renew__Acceptance(uint256 id);
error Err__Not__Rejected(uint256 id);
error Err__Transaction__Failed(address add);
error Err__Not__Completed(uint256 id);
error Err__Not__Accepted(uint256 id);

contract ProdigiKill is Ownable {
	enum Status {
		Pending,
		Accepted,
		Rejected,
		INCompleted,
		Completed
	}

	uint256 private uid = 0;

	struct Tasks {
		uint256 id;
		address userAddress;
		string title;
		uint256 date;
		Status status;
	}

	Tasks[] private prodigiUsers;
	event Evt__Applied(
		uint256 indexed id,
		address indexed userAddress,
		string title,
		string details,
		uint256 date,
		Status status
	);

	event Evt__Renew(uint256 indexed id, string delayReason, uint256 date);

	event Evt__Renew__Accepted(uint256 indexed id, uint256 date);

	event Evt__Rate(uint256 indexed id, address indexed userAddress);

	event Evt__Renew__Rate(uint256 indexed id, address indexed userAddress);

	event Evt__Submit__Proof(
		uint256 indexed id,
		address indexed userAddress,
		string proof
	);

	event Evt__Change__Status(uint256 indexed id, Status status);

	modifier isOwner(uint256 id) {
		Tasks memory task = getTaskById(id);
		require(task.userAddress == msg.sender, "you are not the task owner");
		_;
	}

	modifier notOwner(uint256 id) {
		Tasks memory task = getTaskById(id);
		require(task.userAddress != msg.sender, "you are the task owner");
		_;
	}

	constructor() Ownable() {}

	function taskApply(
		string memory title,
		string memory details,
		uint256 date
	) public payable {
		if (msg.value != 0.55 ether) revert Err__Apply();
		uint256 finalDate = block.timestamp + (date * 1 days);
		prodigiUsers.push(
			Tasks({
				id: uid,
				userAddress: msg.sender,
				title: title,
				date: finalDate,
				status: Status.Pending
			})
		);
		emit Evt__Applied(
			uid,
			msg.sender,
			title,
			details,
			finalDate,
			Status.Pending
		);
		uid = uid + 1;
	}

	function withdrawCollateral(uint256 id) public isOwner(id) {
		Tasks memory task = getTaskById(id);
		if (task.status != Status.Rejected) revert Err__Not__Rejected(id);
		(bool success, ) = payable(address(msg.sender)).call{
			value: 0.55 ether
		}("");
		if (!success) revert Err__Transaction__Failed(msg.sender);
	}

	function submitProof(uint256 id, string memory proof) public isOwner(id) {
		Tasks memory task = getTaskById(id);
		if (task.status != Status.Accepted) revert Err__Not__Accepted(id);
		emit Evt__Submit__Proof(id, msg.sender, proof);
	}

	function withdrawReward(uint256 id) public isOwner(id) {
		Tasks memory task = getTaskById(id);
		if (task.status != Status.Completed) revert Err__Not__Completed(id);
		(bool success, ) = payable(address(msg.sender)).call{
			value: 0.6 ether
		}("");
		if (!success) revert Err__Transaction__Failed(msg.sender);
	}

	function getTaskById(uint256 id) public view returns (Tasks memory) {
		Tasks memory task = prodigiUsers[id];
		return task;
	}

	function applicationStatus(uint256 id, Status status) public onlyOwner {
		if (Status.Accepted == status) {
			prodigiUsers[id].status = Status.Accepted;
		} else if (Status.Rejected == status) {
			prodigiUsers[id].status = Status.Rejected;
		} else if (Status.Completed == status) {
			prodigiUsers[id].status = Status.Completed;
		} else if (Status.INCompleted == status) {
			prodigiUsers[id].status = Status.INCompleted;
		}

		emit Evt__Change__Status(id, prodigiUsers[id].status);
	}

	function rateApplication(uint256 id) public notOwner(id) {
		emit Evt__Rate(id, msg.sender);
	}

	function rateRenewApplication(uint256 id) public notOwner(id) {
		emit Evt__Renew__Rate(id, msg.sender);
	}

	function renewApplicationAccept(uint256 id, uint256 date) public onlyOwner {
		if (prodigiUsers[id].status != Status.Accepted)
			revert Err__Renew__Acceptance(id);

		prodigiUsers[id].date = date;
		emit Evt__Renew__Accepted(id, date);
	}

	function renewApply(
		uint256 id,
		string memory delayReason,
		uint256 date
	) public payable isOwner(id) {
		if (msg.value != 0.05 ether) revert Err__Renew();
		Tasks memory task = getTaskById(id);
		if (task.status != Status.Accepted) revert Err__Renew();
		emit Evt__Renew(id, delayReason, date);
	}

	receive() external payable {}

	fallback() external payable {}
}
