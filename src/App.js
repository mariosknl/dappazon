import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Section from "./components/Section";
import Product from "./components/Product";

// ABIs
import Dappazon from "./abis/Dappazon.json";

// Config
import config from "./config.json";

function App() {
	const [account, setAccount] = useState(null);
	const [provider, setProvider] = useState(null);
	const [dappazon, setDappazon] = useState(null);
	const [electronics, setElectronics] = useState(null);
	const [clothing, setClothing] = useState(null);
	const [toys, setToys] = useState(null);

	const togglePop = () => {};

	const loadBlockchainData = async () => {
		// connect to blockchain
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(provider);

		const network = await provider.getNetwork();

		// connect to smart contracts (Create JS Versions)
		const dappazon = new ethers.Contract(
			config[network.chainId].dappazon.address,
			Dappazon,
			provider
		);
		setDappazon(dappazon);

		// load products

		const items = [];

		for (let i = 0; i < 9; i++) {
			const item = await dappazon.items(i + 1);
			items.push(item);
		}

		setElectronics(items.filter((item) => item.category === "electronics"));
		setClothing(items.filter((item) => item.category === "clothing"));
		setToys(items.filter((item) => item.category === "toys"));
	};

	useEffect(() => {
		loadBlockchainData();
	}, []);

	return (
		<div>
			<Navigation account={account} setAccount={setAccount} />
			<h2>Dappazon Best Sellers</h2>

			{electronics && clothing && toys && (
				<>
					<Section
						title="Clothing & Jewelry"
						items={clothing}
						togglePop={togglePop}
					/>
					<Section
						title="Electronics & Gadgets"
						items={electronics}
						togglePop={togglePop}
					/>
					<Section title="Toys & Gaming" items={toys} togglePop={togglePop} />
				</>
			)}
		</div>
	);
}

export default App;
