import Layout from "../../../components/layout/Layout";
import axios from "axios";
import ExchangePageTitleSection from "../../../components/exchangepage/ExchangePageTitleSection";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ExchangePage(props) {
  const [marketData, setMarketData] = useState([]);
  const [marketSort, setMarketSort] = useState("numberasc");

  useEffect(() => {
    setMarketData(() => [
      ...props.exchangeData.tickers.map((obj) => ({
        ...obj,
        num: props.exchangeData.tickers.indexOf(obj) + 1,
      })),
    ]);
  }, [props]);

  function sortMarketData(sort) {
    var data = marketData;
    switch (sort) {
      case "usdprice":
        if (marketSort == "usdpriceasc") {
          setMarketData(() => [
            ...data.sort((a, b) => a.converted_last.usd - b.converted_last.usd),
          ]);
          setMarketSort("usdpricedes");
        } else {
          setMarketData(() => [
            ...data.sort((a, b) => b.converted_last.usd - a.converted_last.usd),
          ]);
          setMarketSort("usdpriceasc");
        }
        break;
      case "usdvolume":
        if (marketSort == "usdvolumeasc") {
          setMarketData(() => [
            ...data.sort(
              (a, b) => a.converted_volume.usd - b.converted_volume.usd
            ),
          ]);
          setMarketSort("usdvolumedes");
        } else {
          setMarketData(() => [
            ...data.sort(
              (a, b) => b.converted_volume.usd - a.converted_volume.usd
            ),
          ]);
          setMarketSort("usdvolumeasc");
        }
        break;
      case "lastprice":
        if (marketSort == "lastpriceasc") {
          setMarketData(() => [...data.sort((a, b) => a.last - b.last)]);
          setMarketSort("lastpricedes");
        } else {
          setMarketData(() => [...data.sort((a, b) => b.last - a.last)]);
          setMarketSort("lastpriceasc");
        }
        break;
      case "lastvolume":
        if (marketSort == "lastvolumeasc") {
          setMarketData(() => [...data.sort((a, b) => a.volume - b.volume)]);
          setMarketSort("lastvolumedes");
        } else {
          setMarketData(() => [...data.sort((a, b) => b.volume - a.volume)]);
          setMarketSort("lastvolumeasc");
        }
        break;
      case "pair":
        if (marketSort == "pairasc") {
          setMarketData(() => [
            ...data.sort((a, b) =>
              a.target.toLowerCase().localeCompare(b.target.toLowerCase())
            ),
          ]);
          setMarketSort("pairdes");
        } else {
          setMarketData(() => [
            ...data.sort((a, b) =>
              b.target.toLowerCase().localeCompare(a.target.toLowerCase())
            ),
          ]);
          setMarketSort("pairasc");
        }
        break;
      default:
        if (marketSort == "numberasc") {
          setMarketData(() =>
            [
              ...props.exchangeData.tickers.map((obj) => ({
                ...obj,
                num: props.exchangeData.tickers.indexOf(obj) + 1,
              })),
            ].reverse()
          );
          setMarketSort("numberdes");
        } else {
          setMarketData(() => [
            ...props.exchangeData.tickers.map((obj) => ({
              ...obj,
              num: props.exchangeData.tickers.indexOf(obj) + 1,
            })),
          ]);
          setMarketSort("numberasc");
        }
        break;
    }
  }

  return (
    <Layout>
      <div className="w-full p-2">
        <ExchangePageTitleSection exchangeData={props.exchangeData} />
        <div className="w-full">
          <header className="h-12 sticky top-0 items-center bg-neutral-900 grid grid-cols-6 p-1 border-b border-neutral-800">
            <button
              onClick={() => sortMarketData("number")}
              className="flex justify-center text-gray-200 hover:text-green-500 duration-300"
            >
              #
            </button>
            <button
              onClick={() => sortMarketData("pair")}
              className="flex justify-start text-gray-200 hover:text-green-500 duration-300"
            >
              Pair
            </button>
            <button
              onClick={() => sortMarketData("usdprice")}
              className="flex justify-start text-gray-200 hover:text-green-500 duration-300"
            >
              USD Price
            </button>
            <button
              onClick={() => sortMarketData("usdvolume")}
              className="flex justify-start text-gray-200 hover:text-green-500 duration-300"
            >
              USD Volume
            </button>
            <button
              onClick={() => sortMarketData("lastprice")}
              className="flex justify-start text-gray-200 hover:text-green-500 duration-300"
            >
              Target Price
            </button>
            <button
              onClick={() => sortMarketData("lastvolume")}
              className="flex justify-start text-gray-200 hover:text-green-500 duration-300"
            >
              Target Volume
            </button>
          </header>
          <ul>
            {marketData.map((ticker) => (
              <li
                key={`${ticker.market.identifier}-${ticker.base}/${ticker.target}`}
                className="grid grid-cols-6 h-10 text-white border-b border-neutral-800 items-center"
              >
                <span className="flex justify-center text-neutral-500 font-semibold text-lg">
                  {ticker.num}
                </span>
                <Link href={ticker.trade_url != null ? ticker.trade_url : "/"}>
                  <a className="text-blue-500 font-semibold hover:text-blue-300 duration-200">
                    <span>{ticker.base}</span>
                    <span>/</span>
                    <span>{ticker.target}</span>
                  </a>
                </Link>
                <span>
                  $
                  {ticker.converted_last.usd >= 1
                    ? ticker.converted_last.usd
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                    : ticker.converted_last.usd
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <span>
                  $
                  {ticker.converted_volume.usd
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <span>
                  $
                  {ticker.last >= 1
                    ? ticker.converted_last.usd
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                    : ticker.last
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <span>
                  $
                  {ticker.volume
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const exchange = context.params.id.toLowerCase();
  const exchangeData = await axios
    .get(`https://api.coingecko.com/api/v3/exchanges/${exchange}`)
    .then((response) => {
      return response.data;
    });
  return { props: { exchangeData } };
};
