const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), "ether");
};

let transaction;
const ID = 1;
const NAME = "shoes";
const CATEGORY = "clothing";
const IMAGE =
	"https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg";
const PRICE = tokens(1);
const RATING = 4;
const STOCK = 5;

describe("Dappazon", () => {
	let dappazon;
	let deployer, buyer;

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

	describe("Listing", () => {
		beforeEach(async () => {
			transaction = await dappazon
				.connect(deployer)
				.list(ID, NAME, CATEGORY, IMAGE, PRICE, RATING, STOCK);

			await transaction.wait();
		});

		it("returns item attributes", async () => {
			const item = await dappazon.items(1);
			expect(item.id).to.equal(1);
			expect(item.name).to.equal(NAME);
			expect(item.category).to.equal(CATEGORY);
			expect(item.image).to.equal(IMAGE);
			expect(item.rating).to.equal(RATING);
			expect(item.stock).to.equal(STOCK);
		});

		it("Emits List event", () => {
			expect(transaction).to.emit(dappazon, "List");
		});
	});
});
