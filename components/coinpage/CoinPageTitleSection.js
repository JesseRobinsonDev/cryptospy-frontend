import CoinPageNavigationBar from "./CoinPageNavigationBar";
import DropdownMenuInput from "../input/DropdownMenuInput";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "../../pages/_app";

export default function CoinPageTitleSection(props) {
  const [priceChangeSelect, setPriceChangeSelect] = useState(false);
  const [priceChange, setPriceChange] = useState("7d");
  const [coinLow, setCoinLow] = useState(0);
  const [coinHigh, setCoinHigh] = useState(0);
  const [coinInitial, setCoinInitial] = useState(0);
  const [tracked, setTracked] = useState(false);
  const { userID } = useContext(UserContext);

  function trackCoinHandler() {
    if (userID == null) {
      return;
    }
    axios
      .put(
        `${process.env.NEXT_PUBLIC_APIURL}/user/${userID}/${
          props.coinData.id
        }/${tracked ? "untrack" : "track"}`
      )
      .then(() => {
        setTracked(!tracked);
      });
  }

  useEffect(() => {
    if (userID == null) {
      setTracked(false);
      return;
    }
    axios
      .get(`${process.env.NEXT_PUBLIC_APIURL}/user/get/${userID}`)
      .then((response) => {
        setTracked(response.data.tracked_coins.includes(props.coinData.id));
      });
  }, [userID]);

  useEffect(() => {
    getCoinHistoryData(7);
  }, []);

  function changePriceTimeframe(timeframe) {
    setPriceChangeSelect(false);
    setPriceChange(timeframe);
  }

  function getCoinHistoryData(days, oneHour = false) {
    changePriceTimeframe(
      days == 1 && oneHour
        ? "1h"
        : days == 1
        ? "24h"
        : days == 7
        ? "7d"
        : days == 30
        ? "30d"
        : "1y"
    );
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${props.coinData.id}/market_chart?vs_currency=${props.currency}&days=${days}`
      )
      .then((response) => {
        var prices = !oneHour
          ? response.data.prices
          : response.data.prices.slice(
              response.data.prices.length - 12,
              response.data.prices.length
            );
        var priceHistory = [];
        setCoinInitial(prices[0][1]);
        var highPrice = prices[0][1];
        var lowPrice = prices[0][1];
        for (let e of prices) {
          if (e[1] > highPrice) {
            highPrice = e[1];
          }
          if (lowPrice > e[1]) {
            lowPrice = e[1];
          }
          priceHistory.push(e[1]);
        }
        setCoinHigh(highPrice);
        setCoinLow(lowPrice);
      });
  }

  return (
    <section className="flex flex-col gap-1">
      <div className="flex flex-row">
        <div className="w-5/12 flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <img src={props.coinData.image.large} className="w-12 h-12" />
            <span className="text-4xl font-semibold text-white">
              {props.coinData.name}
            </span>
            <span className="text-gray-400 bg-zinc-700 py-1 px-3 text-sm rounded-md font-bold">
              {props.coinData.symbol.toUpperCase()}
            </span>
            <button className="flex items-center justify-center relative group">
              {tracked ? (
                <img
                  src="/svgs/Yellow Star.svg"
                  className="w-8 h-8"
                  onClick={trackCoinHandler}
                />
              ) : (
                <img
                  src="/svgs/White Star.svg"
                  className="w-8 h-8"
                  onClick={trackCoinHandler}
                />
              )}
              <div className="absolute invisible w-44 px-1 py-0.5 bottom-6 rounded-md group-hover:visible bg-neutral-800 text-white">
                {tracked ? (
                  <span className="text-sm">Remove from Watchlist</span>
                ) : (
                  <span className="text-sm">Add to Watchlist</span>
                )}
              </div>
            </button>
          </div>
          <div>
            <span className="text-gray-400 bg-zinc-700 py-1 px-3 text-sm rounded-md font-bold">
              Rank #{props.coinData.market_cap_rank}
            </span>
          </div>
          <div>
            <span className="text-white text-lg">Categories</span>
            <ul className="flex flex-row flex-wrap gap-1">
              {props.coinData.categories.map((category) => (
                <li key={category}>
                  {category != null && (
                    <Link
                      href={`${
                        process.env.NEXT_PUBLIC_SITEURL
                      }/?category=${category
                        .replaceAll(" ", "-")
                        .toLowerCase()}`}
                    >
                      <a className="px-3 py-1 text-sm font-bold text-gray-400 bg-zinc-700 rounded-md tracking-wide hover:bg-green-600 hover:text-white duration-300">
                        {category}
                      </a>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-lg">Social Info</span>
            <div className="flex flex-row flex-wrap gap-1">
              {props.coinData.links.homepage[0] != null &&
                props.coinData.links.homepage[0] != "" && (
                  <Link href={props.coinData.links.homepage[0]}>
                    <a className="px-3 py-1 text-sm font-bold text-gray-400 bg-zinc-700 rounded-md tracking-wide hover:bg-green-600 hover:text-white duration-300">
                      {props.coinData.links.homepage[0]
                        .replace("https", "")
                        .replace("http", "")
                        .replace(":", "")
                        .replace("//", "")
                        .replace("/", "")
                        .replace("www.", "")
                        .replace("/", "")
                        .replace("/", "")
                        .replace("/", "")
                        .replace("/", "")}
                    </a>
                  </Link>
                )}
              {props.coinData.links.twitter_screen_name != null &&
                props.coinData.links.twitter_screen_name != "" && (
                  <Link
                    href={`https://twitter.com/${props.coinData.links.twitter_screen_name}/`}
                  >
                    <a className="px-3 py-1 text-sm font-bold text-gray-400 bg-zinc-700 rounded-md tracking-wide hover:bg-green-600 hover:text-white duration-300">
                      Twitter
                    </a>
                  </Link>
                )}
              {props.coinData.links.subreddit_url != null &&
                props.coinData.links.subreddit_url != "" && (
                  <Link href={props.coinData.links.subreddit_url}>
                    <a className="px-3 py-1 text-sm font-bold text-gray-400 bg-zinc-700 rounded-md tracking-wide hover:bg-green-600 hover:text-white duration-300">
                      Reddit
                    </a>
                  </Link>
                )}
              {props.coinData.links.facebook_username != null &&
                props.coinData.links.facebook_username != "" && (
                  <Link
                    href={`https://www.facebook.com/${props.coinData.links.facebook_username}/`}
                  >
                    <a className="px-3 py-1 text-sm font-bold text-gray-400 bg-zinc-700 rounded-md tracking-wide hover:bg-green-600 hover:text-white duration-300">
                      Facebook
                    </a>
                  </Link>
                )}
              {props.coinData.links.official_forum_url[0] != null &&
                props.coinData.links.official_forum_url[0] != "" && (
                  <Link href={props.coinData.links.official_forum_url[0]}>
                    <a className="px-3 py-1 text-sm font-bold text-gray-400 bg-zinc-700 rounded-md tracking-wide hover:bg-green-600 hover:text-white duration-300">
                      Forum
                    </a>
                  </Link>
                )}
            </div>
          </div>
        </div>
        <div className="w-7/12 flex flex-col">
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2">
              <span className="text-zinc-400 text-3xl font-light">
                {props.coinData.localization[props.language]} Price
              </span>
              <DropdownMenuInput
                dropdownButton={{
                  text: `${priceChange} V`,
                  onClick: () => setPriceChangeSelect(!priceChangeSelect),
                }}
                dropdownButtons={[
                  { text: "1h", onClick: () => getCoinHistoryData(1, true) },
                  { text: "24h", onClick: () => getCoinHistoryData(1) },
                  { text: "7d", onClick: () => getCoinHistoryData(7) },
                  { text: "30d", onClick: () => getCoinHistoryData(30) },
                  { text: "1y", onClick: () => getCoinHistoryData(365) },
                ]}
                toggleState={priceChangeSelect}
              />
            </div>
            <div className="flex flex-row items-center gap-1">
              <span className="text-white text-4xl font-semibold">
                $
                {props.coinData.market_data.current_price[props.currency]
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
              </span>
              <span className="text-white text-4xl font-light">
                {props.currency.toUpperCase()}
              </span>
              <div>
                <span>
                  {props.coinData.market_data[
                    "price_change_percentage_" + priceChange + "_in_currency"
                  ][props.currency] > 0 ? (
                    <span className="text-xl text-white font-semibold bg-green-600 px-2 py-1 rounded-md">
                      +
                      {props.coinData.market_data[
                        "price_change_percentage_" +
                          priceChange +
                          "_in_currency"
                      ][props.currency].toFixed(2)}
                      %
                    </span>
                  ) : (
                    <span className="text-xl text-white font-semibold bg-red-500 px-2 py-1 rounded-md">
                      {props.coinData.market_data[
                        "price_change_percentage_" +
                          priceChange +
                          "_in_currency"
                      ][props.currency] != null
                        ? props.coinData.market_data[
                            "price_change_percentage_" +
                              priceChange +
                              "_in_currency"
                          ][props.currency].toFixed(2)
                        : "0"}
                      %
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-4  border-b border-neutral-800">
              <div className="flex flex-row gap-1">
                <span className="text-zinc-400 font-semibold">Low:</span>
                <span className="text-white font-semibold">
                  $
                  {coinLow >= 1
                    ? coinLow
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                    : coinLow.toFixed(7)}
                </span>
              </div>
              <div className="flex flex-row gap-1">
                <span className="text-zinc-400 font-semibold">Start:</span>
                <span className="text-white font-semibold">
                  $
                  {coinInitial >= 1
                    ? coinInitial
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                    : coinInitial.toFixed(7)}
                </span>
              </div>
              <div className="flex flex-row gap-1">
                <span className="text-zinc-400 font-semibold">High:</span>
                <span className="text-white font-semibold">
                  $
                  {coinHigh >= 1
                    ? coinHigh
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                    : coinHigh.toFixed(7)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-1/2 flex flex-col">
              <div className="flex flex-row justify-between border-b border-neutral-800">
                <span className="text-zinc-400 font-semibold">Market Cap</span>
                <span className="text-white">
                  $
                  {props.coinData.market_data.market_cap[props.currency]
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  {props.currency.toUpperCase()}
                </span>
              </div>
              <div className="flex flex-row justify-between border-b border-neutral-800">
                <span className="text-zinc-400 font-semibold">
                  Volume (24h)
                </span>
                <span className="text-white">
                  $
                  {props.coinData.market_data.total_volume[props.currency]
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  {props.currency.toUpperCase()}
                </span>
              </div>
              <div className="flex flex-row justify-between border-b border-neutral-800">
                <span className="text-zinc-400 font-semibold">
                  Fully Diluted Market Cap
                </span>
                <span className="text-white">
                  {props.coinData.market_data.fully_diluted_valuation[
                    props.currency
                  ] != null
                    ? "$" +
                      props.coinData.market_data.fully_diluted_valuation[
                        props.currency
                      ]
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                    : "∞"}{" "}
                  {props.currency.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="w-1/2 flex flex-col">
              <div className="flex flex-row justify-between border-b border-neutral-800">
                <span className="text-zinc-400 font-semibold">
                  Circulating Supply
                </span>
                <span className="text-white">
                  {props.coinData.market_data.circulating_supply != null
                    ? props.coinData.market_data.circulating_supply
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                    : "0"}{" "}
                  {props.coinData.symbol.toUpperCase()}
                </span>
              </div>
              <div className="flex flex-row justify-between border-b border-neutral-800">
                <span className="text-zinc-400 font-semibold">
                  Total Supply
                </span>
                <span className="text-white">
                  {props.coinData.market_data.total_supply != null
                    ? props.coinData.market_data.total_supply
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                    : "∞"}{" "}
                  {props.coinData.symbol.toUpperCase()}
                </span>
              </div>
              <div className="flex flex-row justify-between border-b border-neutral-800">
                <span className="text-zinc-400 font-semibold">Max Supply</span>
                <span className="text-white">
                  {props.coinData.market_data.max_supply != null
                    ? props.coinData.market_data.max_supply
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                    : "∞"}{" "}
                  {props.coinData.symbol.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CoinPageNavigationBar id={props.coinData.id} tab={props.tab} />
    </section>
  );
}
