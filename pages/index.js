import axios from "axios";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MiniCoinBar from "../components/coin/MiniCoinBar";
import PageNavigationBar from "../components/navigation/PageNavigationBar";
import DropdownMenuInput from "../components/input/DropdownMenuInput";

export default function Home(props) {
  const [coinsData, setCoinsData] = useState([]);
  const [coinSort, setCoinSort] = useState("coinasc");
  const [perPageDropdown, setPerPageDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCoinsData(() => [...props.coinsData]);
  }, [props]);

  function sortCoinsData(sort) {
    var data = coinsData;
    switch (sort) {
      case "name":
        if (coinSort == "nameasc") {
          setCoinsData(() => [
            ...data.sort((a, b) =>
              a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            ),
          ]);
          setCoinSort("namedes");
        } else {
          setCoinsData(() => [
            ...data.sort((a, b) =>
              b.name.toLowerCase().localeCompare(a.name.toLowerCase())
            ),
          ]);
          setCoinSort("nameasc");
        }
        break;
      case "price":
        if (coinSort == "priceasc") {
          setCoinsData(() => [
            ...data.sort((a, b) => a.current_price - b.current_price),
          ]);
          setCoinSort("pricedes");
        } else {
          setCoinsData(() => [
            ...data.sort((a, b) => b.current_price - a.current_price),
          ]);
          setCoinSort("priceasc");
        }
        break;
      case "pricechange24h":
        if (coinSort == "pricechange24hasc") {
          setCoinsData(() => [
            ...data.sort(
              (a, b) =>
                a.price_change_percentage_24h_in_currency -
                b.price_change_percentage_24h_in_currency
            ),
          ]);
          setCoinSort("pricechange24hdes");
        } else {
          setCoinsData(() => [
            ...data.sort(
              (a, b) =>
                b.price_change_percentage_24h_in_currency -
                a.price_change_percentage_24h_in_currency
            ),
          ]);
          setCoinSort("pricechange24hasc");
        }
        break;
      case "pricechange7d":
        if (coinSort == "pricechange7dasc") {
          setCoinsData(() => [
            ...data.sort(
              (a, b) =>
                a.price_change_percentage_7d_in_currency -
                b.price_change_percentage_7d_in_currency
            ),
          ]);
          setCoinSort("pricechange7ddes");
        } else {
          setCoinsData(() => [
            ...data.sort(
              (a, b) =>
                b.price_change_percentage_7d_in_currency -
                a.price_change_percentage_7d_in_currency
            ),
          ]);
          setCoinSort("pricechange7dasc");
        }
        break;
      case "marketcap":
        if (coinSort == "marketcapasc") {
          setCoinsData(() => [
            ...data.sort((a, b) => a.market_cap - b.market_cap),
          ]);
          setCoinSort("marketcapdes");
        } else {
          setCoinsData(() => [
            ...data.sort((a, b) => b.market_cap - a.market_cap),
          ]);
          setCoinSort("marketcapasc");
        }
        break;
      case "volume":
        if (coinSort == "volumeasc") {
          setCoinsData(() => [
            ...data.sort((a, b) => a.total_volume - b.total_volume),
          ]);
          setCoinSort("volumedes");
        } else {
          setCoinsData(() => [
            ...data.sort((a, b) => b.total_volume - a.total_volume),
          ]);
          setCoinSort("volumeasc");
        }
        break;
      case "circulatingsupply":
        if (coinSort == "circulatingsupplyasc") {
          setCoinsData(() => [
            ...data.sort((a, b) => a.circulating_supply - b.circulating_supply),
          ]);
          setCoinSort("circulatingsupplydes");
        } else {
          setCoinsData(() => [
            ...data.sort((a, b) => b.circulating_supply - a.circulating_supply),
          ]);
          setCoinSort("circulatingsupplyasc");
        }
        break;
      default:
        if (coinSort == "coinasc") {
          setCoinsData(() => [...props.coinsData].reverse());
          setCoinSort("coindes");
        } else {
          setCoinsData(() => [...props.coinsData]);
          setCoinSort("coinasc");
        }
        break;
    }
  }

  return (
    <Layout title="CryptoSpy">
      <div className="w-full p-4 px-4 flex flex-col gap-1">
        <div className="flex flex-col gap-1 p-1">
          <span className="text-6xl text-white font-light">
            Welcome to CryptoSpy.
          </span>
          <p className="text-xl text-neutral-500 font-semibold">
            Your gateway to cyrptocurrency statistics, prices, and information.
          </p>
        </div>
        <ul className="w-full px-4 grid grid-cols-2 gap-4">
          <li className="w-full h-auto p-2 bg-neutral-800 rounded-lg">
            <span className="text-gray-100 text-lg font-semibold">
              Trending
            </span>
            <ul>
              {props.trendingCoins.coins.slice(0, 5).map((coin) => (
                <li key={coin.item.id}>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_SITEURL}/coin/${coin.item.id}`}
                  >
                    <a className="w-full flex flex-row gap-4 group">
                      <span className="width-1/12 text-neutral-500 font-bold">
                        {props.trendingCoins.coins.indexOf(coin) + 1}
                      </span>
                      <div className="w-11/12 flex flex-row justify-between">
                        <div>
                          <span className="text-gray-200 group-hover:text-green-500 duration-300">
                            {coin.item.name}
                          </span>
                        </div>
                        <span className="text-gray-200">
                          #{coin.item.market_cap_rank}
                        </span>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="w-full h-auto p-2 bg-neutral-800 rounded-lg">
            <div className="flex flex-row justify-between">
              <span className="text-gray-100 text-lg font-semibold">
                Exchanges
              </span>
              <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/exchanges`}>
                <a className="text-blue-500 hover:text-blue-400 duration-300">
                  More
                </a>
              </Link>
            </div>
            <ul>
              {props.exchanges.map((exchange) => (
                <li key={exchange.id}>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_SITEURL}/exchange/${exchange.id}`}
                  >
                    <a className="w-full flex flex-row gap-4 group">
                      <span className="width-1/12 text-neutral-500 font-bold">
                        {props.exchanges.indexOf(exchange) + 1}
                      </span>
                      <div className="w-11/12 flex flex-row justify-between">
                        <span className="text-gray-200 group-hover:text-green-500 duration-300">
                          {exchange.name}
                        </span>
                        <span className="text-gray-200">
                          $
                          {exchange.trade_volume_24h_btc
                            .toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <div>
          <div className="flex flex-row gap-2">
            <PageNavigationBar
              url={`${process.env.NEXT_PUBLIC_SITEURL}/?perpage=${props.perpage}&currency=${props.currency}&category=${props.category}`}
              page={props.page}
            />
            <DropdownMenuInput
              dropdownButton={{
                text: `${props.perpage} V`,
                onClick: () => setPerPageDropdown(!perPageDropdown),
              }}
              dropdownButtons={[
                {
                  text: "25",
                  onClick: () =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_SITEURL}/?page=${props.page}&perpage=25&currency=${props.currency}&category=${props.category}`
                    ),
                },
                {
                  text: "50",
                  onClick: () =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_SITEURL}/?page=${props.page}&perpage=50&currency=${props.currency}&category=${props.category}`
                    ),
                },
                {
                  text: "100",
                  onClick: () =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_SITEURL}/?page=${props.page}&perpage=100&currency=${props.currency}&category=${props.category}`
                    ),
                },
                {
                  text: "200",
                  onClick: () =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_SITEURL}/?page=${props.page}&perpage=200&currency=${props.currency}&category=${props.category}`
                    ),
                },
              ]}
              toggleState={perPageDropdown}
            />
            <ul className="flex flex-row items-center gap-1">
              {props.categories.slice(0, 4).map((category) => (
                <li
                  key={category.id}
                  className="px-3 py-1 text-sm font-bold text-gray-400 bg-zinc-700 rounded-md tracking-wide hover:bg-green-600 hover:text-white duration-300"
                >
                  <Link
                    href={`${process.env.NEXT_PUBLIC_SITEURL}/?page=${props.page}&perpage=${props.perpage}&currency=${props.currency}&category=${category.id}`}
                  >
                    <a>{category.name}</a>
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/categories`}>
                  <a className="text-xl text-blue-500 hover:text-blue-400 duration-300">
                    More {">"}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <header className="w-full h-12 sticky top-0 grid grid-cols-10 items-center justify-between text-center gap-2 overflow-hidden bg-neutral-900 border-b border-neutral-800">
            <button
              onClick={() => sortCoinsData("coin")}
              className="text-gray-200 hover:text-green-500 duration-300"
            >
              #
            </button>
            <button
              onClick={() => sortCoinsData("name")}
              className="col-span-2 flex justify-start text-gray-200 hover:text-green-500 duration-300 font-semibold text-lg"
            >
              Coin
            </button>
            <button
              onClick={() => sortCoinsData("price")}
              className="flex justify-start text-gray-200 hover:text-green-500 duration-30"
            >
              Price
            </button>
            <button
              onClick={() => sortCoinsData("pricechange24h")}
              className="flex justify-start text-gray-200 hover:text-green-500 duration-300"
            >
              24h %
            </button>
            <button
              onClick={() => sortCoinsData("pricechange7d")}
              className="flex justify-start text-gray-200 hover:text-green-500 duration-300"
            >
              7d %
            </button>
            <button
              onClick={() => sortCoinsData("marketcap")}
              className="flex justify-start text-gray-200 hover:text-green-500 duration-300"
            >
              Marketcap
            </button>
            <button
              onClick={() => sortCoinsData("volume")}
              className="flex justify-start text-gray-200 hover:text-green-500 duration-300"
            >
              Volume (24h)
            </button>
            <button
              onClick={() => sortCoinsData("circulatingsupply")}
              className="w-full flex justify-start text-gray-200 hover:text-green-500 duration-300"
            >
              Circulating Supply
            </button>
            <span className="w-full flex justify-start text-gray-200">
              Price Graph (7d)
            </span>
          </header>
          <ul>
            {coinsData.map((coin) => (
              <MiniCoinBar
                key={coin.id}
                id={coin.id}
                image={coin.image}
                name={coin.name}
                circulatingSupply={coin.circulating_supply}
                totalVolume={coin.total_volume}
                marketCap={coin.market_cap}
                rank={coin.market_cap_rank}
                price={coin.current_price}
                priceChange7d={coin.price_change_percentage_7d_in_currency}
                priceChange24h={coin.price_change_percentage_24h_in_currency}
                priceHistory={coin.sparkline_in_7d.price}
                currency={props.currency}
                symbol={coin.symbol}
              />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const acceptCurrencies = [
    "aed",
    "ars",
    "aud",
    "bch",
    "bdt",
    "bhd",
    "bmd",
    "bnb",
    "brl",
    "btc",
    "cad",
    "chf",
    "clp",
    "cny",
    "czk",
    "dkk",
    "dot",
    "eos",
    "eth",
    "eur",
    "gbp",
    "hkd",
    "huf",
    "idr",
    "ils",
    "inr",
    "jpy",
    "krw",
    "kwd",
    "lkr",
    "ltc",
    "mmk",
    "mxn",
    "myr",
    "ngn",
    "nok",
    "nzd",
    "php",
    "pkr",
    "pln",
    "rub",
    "sar",
    "sek",
    "sgd",
    "thb",
    "try",
    "twd",
    "uah",
    "usd",
    "vef",
    "vnd",
    "xag",
    "xau",
    "xdr",
    "xlm",
    "xrp",
    "yfi",
    "zar",
    "bits",
    "link",
    "sats",
  ];
  const validCategories = [
    {
      category_id: "aave-tokens",
      name: "Aave Tokens",
    },
    {
      category_id: "analytics",
      name: "Analytics",
    },
    {
      category_id: "arbitrum-ecosystem",
      name: "Arbitrum Ecosystem",
    },
    {
      category_id: "artificial-intelligence",
      name: "Artificial Intelligence",
    },
    {
      category_id: "asset-backed-tokens",
      name: "Asset-backed Tokens",
    },
    {
      category_id: "asset-manager",
      name: "Asset Manager",
    },
    {
      category_id: "augmented-reality",
      name: "Augmented Reality",
    },
    {
      category_id: "automated-market-maker-amm",
      name: "Automated Market Maker (AMM)",
    },
    {
      category_id: "avalanche-ecosystem",
      name: "Avalanche Ecosystem",
    },
    {
      category_id: "axie-infinity",
      name: "Axie Infinity",
    },
    {
      category_id: "big-data",
      name: "Big Data",
    },
    {
      category_id: "binance-launchpool",
      name: "Binance Launchpool",
    },
    {
      category_id: "binance-smart-chain",
      name: "BNB Chain Ecosystem",
    },
    {
      category_id: "business-platform",
      name: "Business Platform",
    },
    {
      category_id: "business-services",
      name: "Business Services",
    },
    {
      category_id: "cardano-ecosystem",
      name: "Cardano Ecosystem",
    },
    {
      category_id: "celo-ecosystem",
      name: "Celo Ecosystem",
    },
    {
      category_id: "centralized-exchange-token-cex",
      name: "Centralized Exchange Token (CEX)",
    },
    {
      category_id: "charity",
      name: "Charity",
    },
    {
      category_id: "cny-stablecoin",
      name: "CNY Stablecoin",
    },
    {
      category_id: "collectibles",
      name: "Collectibles",
    },
    {
      category_id: "communication",
      name: "Communication",
    },
    {
      category_id: "compound-tokens",
      name: "Compound Tokens",
    },
    {
      category_id: "cosmos-ecosystem",
      name: "Cosmos Ecosystem",
    },
    {
      category_id: "cryptocurrency",
      name: "Cryptocurrency",
    },
    {
      category_id: "ctokens",
      name: "cToken",
    },
    {
      category_id: "daomaker-ecosystem",
      name: "DaoMaker Ecosystem",
    },
    {
      category_id: "decentralized-exchange",
      name: "Decentralized Exchange Token (DEX)",
    },
    {
      category_id: "decentralized-finance-defi",
      name: "Decentralized Finance (DeFi)",
    },
    {
      category_id: "defi-index",
      name: "DeFi Index",
    },
    {
      category_id: "decentralized-derivatives",
      name: "Derivatives",
    },
    {
      category_id: "edgeware-ecosystem",
      name: "Edgeware Ecosystem",
    },
    {
      category_id: "education",
      name: "Education",
    },
    {
      category_id: "elrond-ecosystem",
      name: "Elrond Ecosystem",
    },
    {
      category_id: "energy",
      name: "Energy",
    },
    {
      category_id: "entertainment",
      name: "Entertainment",
    },
    {
      category_id: "etf",
      name: "ETF",
    },
    {
      category_id: "eth-2-0-staking",
      name: "Eth 2.0 Staking",
    },
    {
      category_id: "ethereum-ecosystem",
      name: "Ethereum Ecosystem",
    },
    {
      category_id: "eur-stablecoin",
      name: "EUR Stablecoin",
    },
    {
      category_id: "exchange-based-tokens",
      name: "Exchange-based Tokens",
    },
    {
      category_id: "fan-token",
      name: "Fan Token",
    },
    {
      category_id: "fantom-ecosystem",
      name: "Fantom Ecosystem",
    },
    {
      category_id: "farming-as-a-service-faas",
      name: "Farming-as-a-Service (FaaS)",
    },
    {
      category_id: "finance-banking",
      name: "Finance / Banking",
    },
    {
      category_id: "fractionalized-nft",
      name: "Fractionalized NFT",
    },
    {
      category_id: "gambling",
      name: "Gambling",
    },
    {
      category_id: "gaming",
      name: "GameFi",
    },
    {
      category_id: "gbp-stablecoin",
      name: "GBP Stablecoin",
    },
    {
      category_id: "gig-economy",
      name: "Gig Economy",
    },
    {
      category_id: "xdai-ecosystem",
      name: "Gnosis Chain Ecosystem",
    },
    {
      category_id: "gotchiverse",
      name: "Gotchiverse",
    },
    {
      category_id: "governance",
      name: "Governance",
    },
    {
      category_id: "guild-scholarship",
      name: "Guild and Scholarship",
    },
    {
      category_id: "harmony-ecosystem",
      name: "Harmony Ecosystem",
    },
    {
      category_id: "healthcare",
      name: "Healthcare",
    },
    {
      category_id: "heco-chain-ecosystem",
      name: "HECO Chain Ecosystem",
    },
    {
      category_id: "impossible-launchpad",
      name: "Impossible Launchpad",
    },
    {
      category_id: "index-coin",
      name: "Index",
    },
    {
      category_id: "infrastructure",
      name: "Infrastructure",
    },
    {
      category_id: "insurance",
      name: "Insurance",
    },
    {
      category_id: "internet-of-things-iot",
      name: "Internet of Things (IOT)",
    },
    {
      category_id: "investment",
      name: "Investment",
    },
    {
      category_id: "iotex-ecosystem",
      name: "IoTeX Ecosystem",
    },
    {
      category_id: "kardiachain-ecosystem",
      name: "KardiaChain Ecosystem",
    },
    {
      category_id: "krw-stablecoin",
      name: "KRW Stablecoin",
    },
    {
      category_id: "launchpad",
      name: "Launchpad",
    },
    {
      category_id: "layer-1",
      name: "Layer 1",
    },
    {
      category_id: "legal",
      name: "Legal",
    },
    {
      category_id: "lending-borrowing",
      name: "Lending/Borrowing",
    },
    {
      category_id: "leveraged-token",
      name: "Leveraged Token",
    },
    {
      category_id: "liquid-staking-tokens",
      name: "Liquid Staking Tokens",
    },
    {
      category_id: "lp-tokens",
      name: "LP Tokens",
    },
    {
      category_id: "manufacturing",
      name: "Manufacturing",
    },
    {
      category_id: "marketing",
      name: "Marketing",
    },
    {
      category_id: "masternodes",
      name: "Masternodes",
    },
    {
      category_id: "media",
      name: "Media",
    },
    {
      category_id: "meme-token",
      name: "Meme Tokens",
    },
    {
      category_id: "metagovernance",
      name: "Metagovernance",
    },
    {
      category_id: "metaverse",
      name: "Metaverse",
    },
    {
      category_id: "mev-protection",
      name: "MEV Protection",
    },
    {
      category_id: "mirrored-assets",
      name: "Mirrored Assets",
    },
    {
      category_id: "moonbeam-ecosystem",
      name: "Moonbeam Ecosystem",
    },
    {
      category_id: "moonriver-ecosystem",
      name: "Moonriver Ecosystem",
    },
    {
      category_id: "move-to-earn",
      name: "Move To Earn",
    },
    {
      category_id: "music",
      name: "Music",
    },
    {
      category_id: "near-protocol-ecosystem",
      name: "Near Protocol Ecosystem",
    },
    {
      category_id: "nft-index",
      name: "NFT Index",
    },
    {
      category_id: "niftex-shards",
      name: "Niftex Shards",
    },
    {
      category_id: "non-fungible-tokens-nft",
      name: "Non-Fungible Tokens (NFT)",
    },
    {
      category_id: "number",
      name: "Number",
    },
    {
      category_id: "oec-ecosystem",
      name: "OEC Ecosystem",
    },
    {
      category_id: "ohm-fork",
      name: "Ohm Fork",
    },
    {
      category_id: "olympus-pro",
      name: "Olympus Pro",
    },
    {
      category_id: "decentralized-options",
      name: "Options",
    },
    {
      category_id: "oracle",
      name: "Oracle",
    },
    {
      category_id: "decentralized-perpetuals",
      name: "Perpetuals",
    },
    {
      category_id: "play-to-earn",
      name: "Play To Earn",
    },
    {
      category_id: "dot-ecosystem",
      name: "Polkadot Ecosystem",
    },
    {
      category_id: "polygon-ecosystem",
      name: "Polygon Ecosystem",
    },
    {
      category_id: "prediction-markets",
      name: "Prediction Markets",
    },
    {
      category_id: "privacy-coins",
      name: "Privacy Coins",
    },
    {
      category_id: "protocol",
      name: "Protocol",
    },
    {
      category_id: "real-estate",
      name: "Real Estate",
    },
    {
      category_id: "realt-tokens",
      name: "RealT Tokens",
    },
    {
      category_id: "rebase-tokens",
      name: "Rebase Tokens",
    },
    {
      category_id: "reddit-points",
      name: "Reddit Points",
    },
    {
      category_id: "remittance",
      name: "Remittance",
    },
    {
      category_id: "retail",
      name: "Retail",
    },
    {
      category_id: "seigniorage",
      name: "Seigniorage",
    },
    {
      category_id: "smart-contract-platform",
      name: "Smart Contract Platform",
    },
    {
      category_id: "social-money",
      name: "Social Money",
    },
    {
      category_id: "software",
      name: "Software",
    },
    {
      category_id: "solana-ecosystem",
      name: "Solana Ecosystem",
    },
    {
      category_id: "sports",
      name: "Sports",
    },
    {
      category_id: "stablecoins",
      name: "Stablecoins",
    },
    {
      category_id: "storage",
      name: "Storage",
    },
    {
      category_id: "structured-products",
      name: "Structured Products",
    },
    {
      category_id: "synthetic-assets",
      name: "Synthetic Issuer",
    },
    {
      category_id: "synths",
      name: "Synths",
    },
    {
      category_id: "technology-science",
      name: "Technology & Science",
    },
    {
      category_id: "terra-ecosystem",
      name: "Terra Ecosystem",
    },
    {
      category_id: "tezos-ecosystem",
      name: "Tezos Ecosystem",
    },
    {
      category_id: "tokenized-btc",
      name: "Tokenized BTC",
    },
    {
      category_id: "tokenized-gold",
      name: "Tokenized Gold",
    },
    {
      category_id: "tokenized-products",
      name: "Tokenized Products",
    },
    {
      category_id: "tokenized-stock",
      name: "Tokenized Stock",
    },
    {
      category_id: "tokensets",
      name: "TokenSets",
    },
    {
      category_id: "tourism",
      name: "Tourism",
    },
    {
      category_id: "usd-stablecoin",
      name: "USD Stablecoin",
    },
    {
      category_id: "us-election-2020",
      name: "US Election 2020",
    },
    {
      category_id: "utokens",
      name: "uTokens",
    },
    {
      category_id: "virtual-reality",
      name: "Virtual Reality",
    },
    {
      category_id: "wallets",
      name: "Wallets",
    },
    {
      category_id: "wormhole-assets",
      name: "Wormhole Assets",
    },
    {
      category_id: "wrapped-tokens",
      name: "Wrapped-Tokens",
    },
    {
      category_id: "xdc-ecosystem",
      name: "XDC Ecosystem",
    },
    {
      category_id: "yearn-yfi-partnerships-mergers",
      name: "Yearn Ecosystem",
    },
    {
      category_id: "yield-aggregator",
      name: "Yield Aggregator",
    },
    {
      category_id: "yield-farming",
      name: "Yield Farming",
    },
    {
      category_id: "zilliqa-ecosystem",
      name: "Zilliqa Ecosystem",
    },
  ];
  const page =
    context.query.page != undefined && context.query.page > 0
      ? context.query.page
      : 1;
  const perpage =
    context.query.perpage != undefined && context.query.perpage > 0
      ? context.query.perpage
      : 50;
  const currency =
    context.query.currency != undefined &&
    acceptCurrencies.includes(context.query.currency)
      ? context.query.currency
      : "usd";
  const category =
    context.query.category != undefined &&
    validCategories.some((x) => x.category_id === context.query.category)
      ? context.query.category
      : null;
  const coinsData = await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}${
        category != null ? `&category=${category}` : ""
      }&order=market_cap_desc&per_page=${perpage}&page=${page}&sparkline=true&price_change_percentage=7d%2C24h%2C1h%2C30d`
    )
    .then((response) => {
      return response.data;
    });
  const trendingCoins = await axios
    .get(`https://api.coingecko.com/api/v3/search/trending`)
    .then((response) => {
      return response.data;
    });
  const exchanges = await axios
    .get(`https://api.coingecko.com/api/v3/exchanges?per_page=5&page=1`)
    .then((response) => {
      return response.data;
    });
  const categories = await axios
    .get(`https://api.coingecko.com/api/v3/coins/categories`)
    .then((response) => {
      return response.data;
    });
  return {
    props: {
      coinsData,
      currency,
      perpage,
      page,
      category,
      trendingCoins,
      exchanges,
      categories,
    },
  };
};
