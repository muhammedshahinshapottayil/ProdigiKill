//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

error Err__Apply();
error Err__Renew();

contract ProdigiKill is Ownable {
	enum Status {
		Pending,
		Accepted,
		Rejected,
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

	event Evt__Renew(uint256 indexed id, uint256 date);

	event Evt__Rate(uint256 indexed id, address indexed userAddress);

	event Evt__Change__Status(uint256 indexed id, Status status);

	modifier isOwner(uint256 id) {
		Tasks memory task = getTaskById(id);
		require(
			task.userAddress == msg.sender,
			"you are not the task publisher"
		);
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
		}
		emit Evt__Change__Status(id, prodigiUsers[id].status);
	}

	function rateApplication(uint256 id) public {
		emit Evt__Rate(id, msg.sender);
	}

	function renewApply(uint256 id, uint256 date) public payable isOwner(id) {
		if (msg.value != 0.05 ether) revert Err__Renew();
		Tasks memory task = getTaskById(id);
		if (task.status != Status.Accepted) revert Err__Renew();
		emit Evt__Renew(id, date);
	}

	receive() external payable {}

	fallback() external payable {}
}
