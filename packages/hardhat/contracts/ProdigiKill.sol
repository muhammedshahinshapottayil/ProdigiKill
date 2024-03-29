//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "./Proposal.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

error Err__Apply();

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

	receive() external payable {}

	fallback() external payable {}
}
