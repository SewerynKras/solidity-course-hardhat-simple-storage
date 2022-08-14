import { expect } from "chai";
import { SimpleStorage as SimpleStorageI } from "./../typechain-types/SimpleStorage";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { BigNumber } from "ethers";

describe("Simple storage", () => {
  const setup = async () => {
    const [owner, otherAccount] = await ethers.getSigners();
    const simpleStorageFactory = await ethers.getContractFactory(
      "SimpleStorage"
    );
    const contract = await simpleStorageFactory.deploy();

    return { contract, owner, otherAccount };
  };

  describe("store/retrieve", () => {
    it("retrieves 0 if nothing was stored before", async () => {
      const { contract } = await loadFixture(setup);

      const favNumber = await contract.retrieve();

      const isEqual = BigNumber.from("0").eq(favNumber);
      expect(isEqual).to.be.true;
    });

    it("retrieves 0 if nothing was stored before", async () => {
      const { contract } = await loadFixture(setup);

      await contract.store(BigNumber.from("123"));

      const favNumber = await contract.retrieve();

      const isEqual = BigNumber.from("123").eq(favNumber);
      expect(isEqual).to.be.true;
    });
  });
  describe("addPerson", () => {
    it("stores a person's favoriteNumber", async () => {
      const { contract } = await loadFixture(setup);

      await contract.addPerson("person0", BigNumber.from("555"));

      const favNumber = await contract.nameToFavoriteNumber("person0");
      const isEqual = BigNumber.from("555").eq(favNumber);
      expect(isEqual).to.be.true;
    });
  });
});
