const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Dappazon", () => {
	let dappazon;
	let deployer;
	let buyer;

	beforeEach(async () => {
		// Setup Accounts
		[deployer, buyer] = await ethers.getSigners();

		// Deployments
		const Dappazon = await ethers.getContractFactory("Dappazon");
		dappazon = await Dappazon.deploy();
	});

	describe("Deployment", () => {
		it("sets the owner", async () => {
			expect(await dappazon.owner()).to.equal(deployer.address);
		});
	});
});
