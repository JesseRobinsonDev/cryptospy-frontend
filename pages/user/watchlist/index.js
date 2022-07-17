import Layout from "../../../components/layout/Layout";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../_app";
import axios from "axios";
import MiniCoinBar from "../../../components/coin/MiniCoinBar";

export default function UserWatchlistPage(props) {
  const [coinsData, setCoinsData] = useState([]);
  const [coinSort, setCoinSort] = useState("coinasc");
  const [username, setUsername] = useState("");
  const [trackedCoins, setTrackedCoins] = useState([]);
  const { userID } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (userID == null) {
      if (localStorage.getItem("userID") == null) {
        router.push(`${process.env.NEXT_PUBLIC_SITEURL}`);
      }
      return;
    }
    getCoinData(userID);
  }, [userID]);

  function getCoinData(userID, reverse = false) {
    axios
      .get(`${process.env.NEXT_PUBLIC_APIURL}/user/get/${userID}`)
      .then(async (response) => {
        setTrackedCoins(response.data.tracked_coins);
        setUsername(response.data.username);
        await axios
          .get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${response.data.tracked_coins.join(
              "%2C"
            )}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d%2C24h%2C1h%2C30d`
          )
          .then((response) => {
            if (reverse) {
              setCoinsData(response.data.reverse());
            } else {
              setCoinsData(response.data);
            }
          });
      });
  }

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
          getCoinData(userID, true);
          setCoinSort("coindes");
        } else {
          getCoinData(userID);
          setCoinSort("coinasc");
        }
        break;
    }
  }

  return (
    <Layout title={"Watchlist - Cryptospy"}>
      <div className="flex flex-col p-2">
        <div className="w-full flex flex-row gap-3">
          <span className="text-white text-5xl font-light">Welcome back</span>
          <span className="text-white text-5xl">{username}</span>
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
              currency={"usd"}
              symbol={coin.symbol}
              tracked={trackedCoins.includes(coin.id)}
            />
          ))}
        </ul>
      </div>
    </Layout>
  );
}
