import { expect } from "chai";
import { ethers } from "hardhat";
import { ProdigiKill } from "../typechain-types";
import { parseEther } from "ethers";
import { describe } from "mocha";

describe("ProdigiKill", function () {
  let ProdigiKill: ProdigiKill;
  const title = "Test title";
  const details = "Test details";
  const noOfDays = 1;

  before(async () => {
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
      await ProdigiKill.addToBlackList(owner.address);
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });
      const [id, address, resultTitle, , withdrawStatus, status] = await ProdigiKill.getTaskById(0);
      expect(address).equal(owner.address);
      expect(resultTitle).equal(title);
      expect(id).equal(0n);
      expect(withdrawStatus).equal(false);
      expect(status).equal(0n);
    });

    it("task apply with absolute args and collateral without blacklisted address multiple data adding", async function () {
      const [owner] = await ethers.getSigners();
      for (let index = 1; index <= 3; index++) {
        await ProdigiKill.taskApply(`${title + index}`, details, noOfDays, {
          value: parseEther("0.5"),
        });
        const [id, address, resultTitle, , withdrawStatus, status] = await ProdigiKill.getTaskById(index);
        expect(address).equal(owner.address);
        expect(resultTitle).equal(`${title + index}`);
        expect(id).equal(BigInt(index));
        expect(withdrawStatus).equal(false);
        expect(status).equal(0n);
      }
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
    it("renew apply with less ETH", async function () {
      await ProdigiKill.taskApply(title, details, noOfDays, {
        value: parseEther("0.5"),
      });

      await expect(
        ProdigiKill.renewApply(0, details, noOfDays, {
          value: parseEther("0.04"),
        }),
      ).to.be.revertedWithCustomError(ProdigiKill, "Err__Renew");
    });

    it("renew apply with more ETH", async function () {
      await expect(
        ProdigiKill.renewApply(0, details, noOfDays, {
          value: parseEther("0.06"),
        }),
      ).to.be.revertedWithCustomError(ProdigiKill, "Err__Renew");
    });

    it("renew apply with more ETH", async function () {
      await expect(
        ProdigiKill.renewApply(0, details, noOfDays, {
          value: parseEther("0.06"),
        }),
      ).to.be.revertedWithCustomError(ProdigiKill, "Err__Renew");
    });

    it("renew apply with accurate ETH but it's status is still pending", async function () {
      await expect(
        ProdigiKill.renewApply(0, details, noOfDays, {
          value: parseEther("0.05"),
        }),
      ).to.be.revertedWithCustomError(ProdigiKill, "Err__Renew");
    });

    it("renew apply with accurate ETH and it's status is accepted", async function () {
      await ProdigiKill.applicationBulkStatusChange([0], 1);
      await expect(
        await ProdigiKill.renewApply(0, details, noOfDays, {
          value: parseEther("0.05"),
        }),
      ).to.ok;
    });

    describe("Task Renew Application Rating", async () => {
      it("task application rate", async function () {
        await ProdigiKill.taskApply(title, details, noOfDays, {
          value: parseEther("0.5"),
        });
        await ProdigiKill.applicationBulkStatusChange([0], 1);
        await expect(ProdigiKill.rateRenewApplication(0)).to.be.revertedWith("you are the task owner");
      });
    });
  });
});
