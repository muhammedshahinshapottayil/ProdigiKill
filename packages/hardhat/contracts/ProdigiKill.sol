//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

error Err__Apply();
error Err__Renew();
error Err__Renew__Acceptance(uint256 id);
error Err__Not__Rejected(uint256 id);
error Err__Transaction__Failed(address add);
error Err__Not__Completed(uint256 id);
error Err__Not__Accepted(uint256 id);
error Err__Time__is__not_UP();

contract ProdigiKill is Ownable, ReentrancyGuard {
	enum Status {
		Pending,
		Accepted,
		Rejected,
		INCompleted,
		Completed
	}

	uint256 private s_uid = 0;
	uint256 private s_ideaId = 0;

	mapping(address => bool) private blackList;

	struct FeeDetails {
		uint256 lastMonthAmount;
		uint256 next;
	}

	FeeDetails private s_feeDetails;

	struct Tasks {
		uint256 id;
		address userAddress;
		string title;
		uint256 date;
		bool withdrawed;
		Status status;
	}

	struct Ideas {
		uint256 ideaId;
		address userAddress;
		string title;
	}

	Tasks[] private s_prodigiUsers;
	Ideas[] private s_ideas;

	event Evt__Applied(
		uint256 indexed id,
		address indexed userAddress,
		string title,
		string details,
		uint256 date,
		Status status
	);

	event Evt__Rate(uint256 indexed id, address indexed userAddress);

	event Evt__Renew(
		uint256 indexed id,
		address indexed userAddress,
		string delayReason,
		uint256 date,
		Status status
	);

	event Evt__Renew__Rate(uint256 indexed id, address indexed userAddress);

	event Evt__Change__Status(uint256 indexed id, Status status);

	event Evt__Renew__Accepted(uint256 indexed id, Status status);

	event Evt__Renew__Rejected(uint256 indexed id, Status status);

	event Evt__Submit__Proof(
		uint256 indexed id,
		address indexed userAddress,
		Status status,
		string proof
	);

	event Evt__Completed__Proof(
		uint256 indexed id,
		address indexed userAddress
	);

	event Evt__Withdrawed__Collateral(
		uint256 indexed id,
		address indexed userAddress
	);

	event Evt__Withdrawed__Reward(
		uint256 indexed id,
		address indexed userAddress
	);

	event Evt__Black__Listed(address indexed userAddress, bool status);

	event Evt__Donation(address indexed donor, uint256 value);

	event Evt__Proposal__Idea(
		uint256 indexed id,
		address indexed userAddress,
		string title,
		string details
	);

	event Evt__Rate__Proposed__Idea(
		uint256 indexed id,
		address indexed userAddress
	);

	event Evt__Winner__of__Idea(
		uint256 indexed id,
		address indexed userAddress
	);

	modifier isBlackListed() {
		require(blackList[msg.sender] == false, "Sorry you are black listed");
		_;
	}

	modifier isWithdrawed(uint256 id) {
		Tasks memory task = getTaskById(id);
		require(task.withdrawed == false, "already withdrawed");
		_;
	}

	modifier isOwner(uint256 id) {
		Tasks memory task = getTaskById(id);
		require(task.userAddress == msg.sender, "You are not the task owner");
		_;
	}

	modifier notOwner(uint256 id) {
		Tasks memory task = getTaskById(id);
		require(task.userAddress != msg.sender, "you are the task owner");
		_;
	}

	modifier isAccepted(uint256 id) {
		Tasks memory task = getTaskById(id);
		require(task.status == Status.Accepted, "something went wrong");
		_;
	}

	modifier isPending(uint256 id) {
		Tasks memory task = getTaskById(id);
		require(task.status == Status.Pending, "something went wrong");
		_;
	}

	constructor() Ownable() {
		s_feeDetails = FeeDetails({
			lastMonthAmount: 0,
			next: block.timestamp + 30 days
		});
	}

	function taskApply(
		string memory title,
		string memory details,
		uint256 date
	) public payable isBlackListed {
		if (msg.value != 0.5 ether) revert Err__Apply();
		uint256 finalDate = block.timestamp + (date * 1 days);

		s_prodigiUsers.push(
			Tasks({
				id: s_uid,
				userAddress: msg.sender,
				title: title,
				date: finalDate,
				withdrawed: false,
				status: Status.Pending
			})
		);

		emit Evt__Applied(
			s_uid,
			msg.sender,
			title,
			details,
			finalDate,
			Status.Pending
		);
		s_uid = s_uid + 1;
	}

	function rateApplication(
		uint256 id
	) public notOwner(id) isBlackListed isPending(id) {
		emit Evt__Rate(id, msg.sender);
	}

	function renewApply(
		uint256 id,
		string memory delayReason,
		uint256 date
	) public payable isOwner(id) isBlackListed isAccepted(id) {
		if (msg.value != 0.05 ether) revert Err__Renew();
		Tasks memory task = getTaskById(id);
		emit Evt__Renew(
			id,
			msg.sender,
			delayReason,
			task.date + date * 1 days,
			Status.Pending
		);
	}

	function rateRenewApplication(
		uint256 id
	) public notOwner(id) isBlackListed isAccepted(id) {
		emit Evt__Renew__Rate(id, msg.sender);
	}

	function withdrawCollateral(
		uint256 id
	) public nonReentrant isOwner(id) isWithdrawed(id) {
		Tasks memory task = getTaskById(id);
		if (task.status != Status.Rejected) revert Err__Not__Rejected(id);
		s_prodigiUsers[id].withdrawed = true;
		(bool success, ) = payable(address(msg.sender)).call{
			value: 0.5 ether
		}("");

		if (!success) revert Err__Transaction__Failed(msg.sender);

		emit Evt__Withdrawed__Collateral(id, msg.sender);
	}

	function submitProof(
		uint256 id,
		string memory proof
	) public isOwner(id) isBlackListed isAccepted(id) {
		emit Evt__Submit__Proof(id, msg.sender, Status.Pending, proof);
	}

	function rateCompletedProof(
		uint256 id
	) public notOwner(id) isBlackListed isAccepted(id) {
		emit Evt__Completed__Proof(id, msg.sender);
	}

	function withdrawReward(
		uint256 id
	) public nonReentrant isOwner(id) isWithdrawed(id) {
		Tasks memory task = getTaskById(id);
		if (task.status != Status.Completed) revert Err__Not__Completed(id);
		s_prodigiUsers[id].withdrawed = true;
		(bool success, ) = payable(address(msg.sender)).call{
			value: 0.6 ether
		}("");
		if (!success) revert Err__Transaction__Failed(msg.sender);
		emit Evt__Withdrawed__Reward(id, msg.sender);
	}

	function getTaskById(uint256 id) public view returns (Tasks memory) {
		Tasks memory task = s_prodigiUsers[id];
		return task;
	}

	function applicationBulkStatusChange(
		uint256[] memory arrId,
		Status status
	) public onlyOwner {
		for (uint i = 0; i < arrId.length; i++) {
			if (Status.Accepted == status) {
				s_prodigiUsers[arrId[i]].status = Status.Accepted;
			} else if (Status.Rejected == status) {
				s_prodigiUsers[arrId[i]].status = Status.Rejected;
			} else if (Status.Completed == status) {
				s_prodigiUsers[arrId[i]].status = Status.Completed;
			} else if (Status.INCompleted == status) {
				s_prodigiUsers[arrId[i]].status = Status.INCompleted;
			}
			emit Evt__Change__Status(arrId[i], s_prodigiUsers[arrId[i]].status);
		}
	}

	function renewApplicationAccept(
		uint256 id,
		uint256 date
	) public onlyOwner isAccepted(id) {
		s_prodigiUsers[id].date = date;
		emit Evt__Renew__Accepted(id, Status.Accepted);
	}

	function rejectRenewApplication(
		uint256 id
	) public onlyOwner isAccepted(id) {
		emit Evt__Renew__Rejected(id, Status.Accepted);
	}

	function addToBlackList(address addr) public onlyOwner {
		blackList[addr] = !blackList[addr];
		emit Evt__Black__Listed(addr, blackList[addr]);
	}

	function proposeIdea(
		string memory title,
		string memory details
	) public isBlackListed {
		s_ideas[s_ideaId] = Ideas({
			ideaId: s_ideaId,
			userAddress: msg.sender,
			title: title
		});
		emit Evt__Proposal__Idea(s_ideaId, msg.sender, title, details);
		s_ideaId += 1;
	}

	function rateProposedIdea(uint256 id) public isBlackListed {
		emit Evt__Rate__Proposed__Idea(id, msg.sender);
	}

	function bestReviewer(address addr) public onlyOwner nonReentrant {
		(bool success, ) = payable(addr).call{ value: 0.1 ether }("");
		if (!success) revert Err__Transaction__Failed(addr);
	}

	function getIdeaById(uint256 id) public view returns (Ideas memory) {
		Ideas memory idea = s_ideas[id];
		return idea;
	}

	function winnerOfIdea(uint256 id) public onlyOwner nonReentrant {
		Ideas memory idea = getIdeaById(id);
		(bool success, ) = payable(address(idea.userAddress)).call{
			value: 0.1 ether
		}("");
		if (!success) revert Err__Transaction__Failed(idea.userAddress);
		emit Evt__Winner__of__Idea(id, idea.userAddress);
	}

	function withdrawRunningFees() public onlyOwner nonReentrant {
		if (s_feeDetails.next > block.timestamp) revert Err__Time__is__not_UP();
		uint256 amount = (2 * address(this).balance) / 100;
		s_feeDetails = FeeDetails({
			next: block.timestamp + 30,
			lastMonthAmount: amount
		});
		(bool success, ) = payable(address(this)).call{ value: amount }("");
		if (!success) revert Err__Transaction__Failed(owner());
	}

	function donation() public payable {
		emit Evt__Donation(msg.sender, msg.value);
	}

	receive() external payable {
		donation();
	}

	fallback() external payable {
		donation();
	}
}
