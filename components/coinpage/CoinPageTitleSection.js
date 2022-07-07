import CoinPageNavigationBar from "./CoinPageNavigationBar";
import DropdownMenuInput from "../input/DropdownMenuInput";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CoinPageTitleSection(props) {
  const [priceChangeSelect, setPriceChangeSelect] = useState(false);
  const [priceChange, setPriceChange] = useState("7d");
  const [coinLow, setCoinLow] = useState(0);
  const [coinHigh, setCoinHigh] = useState(0);
  const [coinInitial, setCoinInitial] = useState(0);

  useEffect(() => {
    changePriceTimeframe("7d");
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
    <section className="p-2 flex flex-col">
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
          </div>
          <span className="text-gray-400 bg-zinc-700 py-1 px-3 text-sm rounded-md font-bold">
            Rank #{props.coinData.market_cap_rank}
          </span>
          <div>
            <span className="text-white">Categories</span>
            <ul className="flex flex-row flex-wrap">
              {props.coinData.categories.map((category) => (
                <li
                  key={category}
                  className="text-gray-400 bg-zinc-700 py-1 px-3 text-sm rounded-md font-bold"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-white">Social Info</span>
          </div>
        </div>
        <div className="w-7/12 flex flex-col">
          <div className="flex flex-col">
            <div className="flex flex-row">
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
            <div className="flex flex-row gap-1">
              <span className="text-white text-4xl font-semibold">
                ${props.coinData.market_data.current_price[props.currency]}
              </span>
              <span className="text-white text-4xl font-light">
                {props.currency.toUpperCase()}
              </span>
              <span className="text-xl text-white font-semibold bg-green-600 px-2 py-1 rounded-md">
                {props.coinData.market_data[
                  "price_change_percentage_" + priceChange + "_in_currency"
                ][props.currency].toFixed(2)}
                %
              </span>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-1">
                <span className="text-zinc-400 font-semibold">Low:</span>
                <span className="text-white font-semibold">
                  $
                  {coinLow
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </div>
              <div className="flex flex-row gap-1">
                <span className="text-zinc-400 font-semibold">Start:</span>
                <span className="text-white font-semibold">
                  $
                  {coinInitial
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </div>
              <div className="flex flex-row gap-1">
                <span className="text-zinc-400 font-semibold">High:</span>
                <span className="text-white font-semibold">
                  $
                  {coinHigh
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="grid grid-cols-2">
              <span className="text-zinc-400 font-semibold">Total Supply</span>
              <span className="text-white">
                {props.coinData.market_data.total_supply
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                {props.coinData.symbol.toUpperCase()}
              </span>
              <span className="text-zinc-400 font-semibold">
                Circulating Supply
              </span>
              <span className="text-white">
                {props.coinData.market_data.circulating_supply
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                {props.coinData.symbol.toUpperCase()}
              </span>
              <span className="text-zinc-400 font-semibold">Max Supply</span>
              <span className="text-white">
                {props.coinData.market_data.max_supply
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                {props.coinData.symbol.toUpperCase()}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-zinc-400 font-semibold">Volume</span>
              <span className="text-white">
                $
                {props.coinData.market_data.total_volume[props.currency]
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                {props.currency.toUpperCase()}
              </span>
              <span className="text-zinc-400 font-semibold">Market Cap</span>
              <span className="text-white">
                $
                {props.coinData.market_data.market_cap[props.currency]
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                {props.currency.toUpperCase()}
              </span>
              <span className="text-zinc-400 font-semibold">
                Fully Diluted Valuation
              </span>
              <span className="text-white">
                $
                {props.coinData.market_data.fully_diluted_valuation[
                  props.currency
                ]
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                {props.currency.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <CoinPageNavigationBar id={props.coinData.id} tab={props.tab} />
    </section>
  );
}
