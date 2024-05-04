import { expect } from "chai";
import { ethers } from "hardhat";
import { ProdigiKill } from "../typechain-types";
import { parseEther, TransactionReceipt } from "ethers";
import { describe } from "mocha";
// Prodigi Kill Unit Testing
// Excluding testing with another account almost everything is basically tested
describe("ProdigiKill", function () {
  let ProdigiKill: ProdigiKill;
  const title = "Test title";
  const details = "Test details";
  const noOfDays = 1;

  beforeEach(async () => {
    const ProdigiKillFactory = await ethers.getContractFactory("ProdigiKill");
    ProdigiKill = (await ProdigiKillFactory.deploy()) as ProdigiKill;
    await ProdigiKill.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should have the owner address and it should be equal", async function () {
      const [owner] = await ethers.getSigners();
      expect(await ProdigiKill.owner()).to.be.equal(owner);
    });
  });

  describe("Task Apply", async () => {
    it("task apply with less collateral", async function () {
      await expect(
        ProdigiKill.taskApply(title, details, noOfDays, {
          value: parseEther("0.1"),
        }),
      ).to.be.revertedWithCustomError(ProdigiKill, "Err__Apply");
    });

    it("task apply with more collateral", async function () {
      await expect(
        ProdigiKill.taskApply(title, details, noOfDays, {
          value: parseEther("0.6"),
        }),
      ).to.be.revertedWithCustomError(ProdigiKill, "Err__Apply");
    });

    it("task apply with absolute args and collateral but blacklisted address", async function () {
      const [owner] = await ethers.getSigners();
      await ProdigiKill.addToBlackList(owner.address);
      await expect(
        ProdigiKill.taskApply(title, details, noOfDays, {
          value: parseEther("0.5"),
        }),
      ).to.be.revertedWith("Sorry you are black listed");
    });

    it("task apply with absolute args and collateral without blacklisted address", async function () {
      const [owner] = await ethers.getSigners();
      const contactAddress = await ProdigiKill.getAddress();

      const beforeEthAmountInContract = await ethers.provider.getBalance(contactAddress);
      const beforeEthAmountAccount = await ethers.provider.getBalance(owner);

      const txResult = await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });

      const receipt: TransactionReceipt = (await ethers.provider.getTransactionReceipt(txResult.hash))!;
      const gasCost = txResult.gasPrice * receipt.gasUsed!;

      const afterEthAmountInContract = await ethers.provider.getBalance(contactAddress);
      const afterEthAmountAccount = await ethers.provider.getBalance(owner);

      const [id, address, resultTitle, , withdrawStatus, status] = await ProdigiKill.getTaskById(0);
      expect(beforeEthAmountInContract + afterEthAmountInContract).equal(parseEther("0.5"));
      expect(afterEthAmountAccount).equal(beforeEthAmountAccount - parseEther("0.5") - gasCost);
      expect(address).equal(owner.address);
      expect(resultTitle).equal(title);
      expect(id).equal(0n);
      expect(withdrawStatus).equal(false);
      expect(status).equal(0n);
    });

    it("task apply with absolute args and collateral without blacklisted address multiple data adding", async function () {
      const [owner] = await ethers.getSigners();
      const contactAddress = await ProdigiKill.getAddress();
      const beforeEthAmountInContract = await ethers.provider.getBalance(contactAddress);

      const beforeEthAmountAccount = await ethers.provider.getBalance(owner);
      let gasCost: bigint = 0n;
      for (let index = 0; index < 3; index++) {
        const txResult = await ProdigiKill.taskApply(`${title + index}`, details, noOfDays, {
          value: parseEther("0.5"),
        });

        const receipt: TransactionReceipt = (await ethers.provider.getTransactionReceipt(txResult.hash))!;
        gasCost += txResult.gasPrice * receipt.gasUsed!;

        const [id, address, resultTitle, , withdrawStatus, status] = await ProdigiKill.getTaskById(index);
        expect(address).equal(owner.address);
        expect(resultTitle).equal(`${title + index}`);
        expect(id).equal(BigInt(index));
        expect(withdrawStatus).equal(false);
        expect(status).equal(0n);
      }
      const afterEthAmountInContract = await ethers.provider.getBalance(contactAddress);
      const afterEthAmountAccount = await ethers.provider.getBalance(owner);

      expect(afterEthAmountInContract - beforeEthAmountInContract).equal(parseEther("1.5"));
      expect(afterEthAmountAccount).equal(beforeEthAmountAccount - parseEther("1.5") - gasCost);
    });
  });

  describe("Task Application Rating", async () => {
    it("task application rate", async function () {
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      await expect(ProdigiKill.rateApplication(0)).to.be.revertedWith("you are the task owner");
    });
  });

  describe("Task Bulk Status Change", async () => {
    it("bulk status change", async function () {
      for (let index = 0; index <= 3; index++) {
        await ProdigiKill.taskApply(title, details, noOfDays, {
          value: parseEther("0.5"),
        });
        if (index % 2 !== 0) await ProdigiKill.applicationBulkStatusChange([index], 1);
        const [id, , , , , status] = await ProdigiKill.getTaskById(index);
        expect(id).equal(BigInt(index));
        expect(status).equal(index % 2 !== 0 ? 1n : 0n);
      }
    });
  });

  describe("Renew application", async () => {
    it("renew apply with accurate ETH but it's status is still pending", async function () {
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      await expect(
        ProdigiKill.renewApply(0, details, noOfDays, {
          value: parseEther("0.05"),
        }),
      ).to.be.revertedWith("something went wrong");
    });

    it("renew apply with less ETH", async function () {
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      await ProdigiKill.applicationBulkStatusChange([0], 1);

      await expect(
        ProdigiKill.renewApply(0, details, noOfDays, {
          value: parseEther("0.04"),
        }),
      ).to.be.revertedWithCustomError(ProdigiKill, "Err__Renew");
    });

    it("renew apply with more ETH", async function () {
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });

      await ProdigiKill.applicationBulkStatusChange([0], 1);

      await expect(
        ProdigiKill.renewApply(0, details, noOfDays, {
          value: parseEther("0.06"),
        }),
      ).to.be.revertedWithCustomError(ProdigiKill, "Err__Renew");
    });

    it("renew apply with accurate ETH and it's status is accepted", async function () {
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      await ProdigiKill.applicationBulkStatusChange([0], 1);

      const [owner] = await ethers.getSigners();
      const contactAddress = await ProdigiKill.getAddress();
      const beforeEthAmountInContract = await ethers.provider.getBalance(contactAddress);
      const beforeEthAmountAccount = await ethers.provider.getBalance(owner);
      const txResult = await ProdigiKill.renewApply(0, details, noOfDays, {
        value: parseEther("0.05"),
      });
      await expect(txResult).to.ok;

      const afterEthAmountInContract = await ethers.provider.getBalance(contactAddress);
      const afterEthAmountAccount = await ethers.provider.getBalance(owner);
      const receipt: TransactionReceipt = (await ethers.provider.getTransactionReceipt(txResult.hash))!;
      const gasCost = txResult.gasPrice * receipt.gasUsed!;

      expect(afterEthAmountInContract - beforeEthAmountInContract).equal(parseEther("0.05"));
      expect(afterEthAmountAccount).equal(beforeEthAmountAccount - parseEther("0.05") - gasCost);
    });
  });

  describe("Task Renew Application Rating", async () => {
    it("task renew application rate", async function () {
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      await ProdigiKill.applicationBulkStatusChange([0], 1);
      await expect(ProdigiKill.rateRenewApplication(0)).to.be.revertedWith("you are the task owner");
    });
  });

  describe("Task Renew Application Accept", async () => {
    it("task application accept", async function () {
      const dateInUnix = Math.floor(Date.now() / 1000);
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      await ProdigiKill.applicationBulkStatusChange([0], 1);
      await ProdigiKill.renewApply(0, details, noOfDays, {
        value: parseEther("0.05"),
      });
      await expect(ProdigiKill.renewApplicationAccept(0, dateInUnix)).to.be.ok;
    });

    it("task application accept on status pending task", async function () {
      const dateInUnix = Math.floor(Date.now() / 1000);
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      await expect(ProdigiKill.renewApplicationAccept(0, dateInUnix)).to.be.revertedWith("something went wrong");
    });
  });

  describe("Task Renew Application Reject", async () => {
    it("task application reject", async function () {
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      await ProdigiKill.applicationBulkStatusChange([0], 1);

      await ProdigiKill.renewApply(0, details, noOfDays, {
        value: parseEther("0.05"),
      });
      await expect(ProdigiKill.rejectRenewApplication(0)).to.be.ok;
    });

    it("task application reject on status pending task", async function () {
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      await expect(ProdigiKill.rejectRenewApplication(0)).to.be.revertedWith("something went wrong");
    });
  });

  describe("Submit application", async () => {
    it("submit proof with accurate it's status is still pending", async function () {
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      await expect(ProdigiKill.submitProof(0, details)).to.be.revertedWith("something went wrong");
    });

    it("submit proof and it's status is accepted", async function () {
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      await ProdigiKill.applicationBulkStatusChange([0], 1);
      await expect(ProdigiKill.submitProof(0, details)).to.be.ok;
    });
  });

  describe("Submit application Rating", async () => {
    it("submit proof application rate", async function () {
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      await ProdigiKill.applicationBulkStatusChange([0], 1);
      await expect(ProdigiKill.rateCompletedProof(0)).to.be.revertedWith("you are the task owner");
    });
  });

  describe("Withdrawals colladral", async () => {
    it("withdraw colladral", async function () {
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      await ProdigiKill.applicationBulkStatusChange([0], 2);
      await expect(ProdigiKill.withdrawCollateral(0)).to.be.ok;
    });
    it("withdraw colladral on status not equal to reject", async function () {
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      await ProdigiKill.applicationBulkStatusChange([0], 1);
      await expect(ProdigiKill.withdrawCollateral(0)).to.be.revertedWithCustomError(ProdigiKill, "Err__Not__Rejected");
    });
  });

  describe("Withdrawals reward", async () => {
    it("withdraw reward", async function () {
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      await ProdigiKill.applicationBulkStatusChange([0], 4);
      await expect(ProdigiKill.withdrawReward(0)).to.be.ok;
    });
    it("withdraw reward on status not equal to completed", async function () {
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      await ProdigiKill.applicationBulkStatusChange([0], 1);
      await expect(ProdigiKill.withdrawReward(0)).to.be.revertedWithCustomError(ProdigiKill, "Err__Not__Completed");
    });
  });

  describe("Propose Idea", async () => {
    it("propose idea with black listed", async function () {
      const [owner] = await ethers.getSigners();
      await ProdigiKill.addToBlackList(owner.address);
      await expect(ProdigiKill.proposeIdea(title, details)).to.be.revertedWith("Sorry you are black listed");
    });

    it("propose idea without black listed account", async function () {
      const [owner] = await ethers.getSigners();
      await expect(await ProdigiKill.proposeIdea(title, details)).to.be.ok;
      const [ideaId, userAddress, proposedTitle] = await ProdigiKill.getIdeaById(0);
      await expect(ideaId).equal(0);
      await expect(userAddress).equal(owner.address);
      await expect(proposedTitle).equal(title);
    });
  });

  describe("Propose Idea Rating", async () => {
    it("propose idea rate", async function () {
      await ProdigiKill.proposeIdea(title, details);
      await expect(ProdigiKill.rateProposedIdea(0)).to.be.ok;
    });
  });

  describe("Winner of idea", async () => {
    it("idea winner", async function () {
      await ProdigiKill.donation({ value: parseEther("0.5") });
      await ProdigiKill.proposeIdea(title, details);
      const [owner] = await ethers.getSigners();
      const contactAddress = await ProdigiKill.getAddress();
      const beforeEthAmountInContract = await ethers.provider.getBalance(contactAddress);
      const beforeEthAmountAccount = await ethers.provider.getBalance(owner);
      const txResult = await ProdigiKill.winnerOfIdea(0);
      expect(txResult).to.be.ok;
      const afterEthAmountInContract = await ethers.provider.getBalance(contactAddress);
      const afterEthAmountAccount = await ethers.provider.getBalance(owner);
      const receipt: TransactionReceipt = (await ethers.provider.getTransactionReceipt(txResult.hash))!;
      const gasCost = txResult.gasPrice * receipt.gasUsed!;
      expect(afterEthAmountInContract).equal(beforeEthAmountInContract - parseEther("0.1"));
      expect(afterEthAmountAccount).equal(beforeEthAmountAccount - gasCost + parseEther("0.1"));
    });
  });

  describe("withdraw Running Fees", async () => {
    it("running fee's withdraw before date", async function () {
      await ProdigiKill.donation({ value: parseEther("1") });

      await expect(ProdigiKill.withdrawRunningFees()).to.be.revertedWithCustomError(
        ProdigiKill,
        "Err__Time__is__not_UP",
      );
    });

    // try after commenting constructor (+ 30 days)
    it("running fee's", async function () {
      await ProdigiKill.donation({ value: parseEther("1") });
      const [owner] = await ethers.getSigners();
      const contactAddress = await ProdigiKill.getAddress();
      const beforeEthAmountInContract = await ethers.provider.getBalance(contactAddress);
      const beforeEthAmountAccount = await ethers.provider.getBalance(owner);
      const txResult = await ProdigiKill.withdrawRunningFees();
      expect(txResult).to.be.ok;
      const afterEthAmountInContract = await ethers.provider.getBalance(contactAddress);
      const afterEthAmountAccount = await ethers.provider.getBalance(owner);
      const receipt: TransactionReceipt = (await ethers.provider.getTransactionReceipt(txResult.hash))!;
      const gasCost = txResult.gasPrice * receipt.gasUsed!;
      expect(afterEthAmountInContract).equal(beforeEthAmountInContract - (2n * beforeEthAmountInContract) / 100n);
      expect(afterEthAmountAccount).equal(beforeEthAmountAccount - gasCost + (2n * beforeEthAmountInContract) / 100n);
    });
  });
});
