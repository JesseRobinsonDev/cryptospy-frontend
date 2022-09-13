import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../components/layout/Layout";
import parse from "html-react-parser";
import CoinPageTitleSection from "../../../components/coinpage/CoinPageTitleSection";
import ScatterLineGraph from "../../../components/chart/ScatterLineGraph";

export default function CoinPage(props) {
  const [priceChange, setPriceChange] = useState("7d");
  const [coinHistory, setCoinHistory] = useState([]);

  useEffect(() => {
    getCoinHistoryData(7);
  }, []);

  function changePriceTimeframe(timeframe) {
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
        prices.forEach((e) => {
          priceHistory.push(e[1]);
        });
        setCoinHistory(priceHistory);
      });
  }

  return (
    <Layout
      title={`${props.coinData.name} - CryptoSpy`}
      description={`Get the latest ${props.coinData.name} information, current price, market cap, volume, supply and data`}
    >
      <div className="w-full p-2">
        <CoinPageTitleSection
          coinData={props.coinData}
          language={props.language}
          currency={props.currency}
          tab="Overview"
        />
        <div className="flex flex-col gap-1 border-b border-neutral-800">
          <div className="flex flex-col md:flex-row items-center gap-1 border-b border-neutral-800 py-1">
            <span className="text-3xl text-white font-light">
              {props.coinData.localization[props.language]} Price Chart
            </span>
            <div className="flex flex-row gap-1">
              <button onClick={() => getCoinHistoryData(1, true)}>
                {priceChange == "1h" ? (
                  <span className="px-3 py-1 bg-blue-700 text-white font-bold rounded-md">
                    1h
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-zinc-700 text-gray-400 font-bold rounded-md hover:bg-blue-700 hover:text-white duration-300">
                    1h
                  </span>
                )}
              </button>
              <button onClick={() => getCoinHistoryData(1)}>
                {priceChange == "24h" ? (
                  <span className="px-3 py-1 bg-blue-700 text-white font-bold rounded-md">
                    24h
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-zinc-700 text-gray-400 font-bold rounded-md hover:bg-blue-700 hover:text-white duration-300">
                    24h
                  </span>
                )}
              </button>
              <button onClick={() => getCoinHistoryData(7)}>
                {priceChange == "7d" ? (
                  <span className="px-3 py-1 bg-blue-700 text-white font-bold rounded-md">
                    7d
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-zinc-700 text-gray-400 font-bold rounded-md hover:bg-blue-700 hover:text-white duration-300">
                    7d
                  </span>
                )}
              </button>
              <button onClick={() => getCoinHistoryData(30)}>
                {priceChange == "30d" ? (
                  <span className="px-3 py-1 bg-blue-700 text-white font-bold rounded-md">
                    30d
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-zinc-700 text-gray-400 font-bold rounded-md hover:bg-blue-700 hover:text-white duration-300">
                    30d
                  </span>
                )}
              </button>
              <button onClick={() => getCoinHistoryData(365)}>
                {priceChange == "1y" ? (
                  <span className="px-3 py-1 bg-blue-700 text-white font-bold rounded-md">
                    1y
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-zinc-700 text-gray-400 font-bold rounded-md hover:bg-blue-700 hover:text-white duration-300">
                    1y
                  </span>
                )}
              </button>
            </div>
          </div>
          <ScatterLineGraph
            color={"green"}
            y={coinHistory}
            x={Array(coinHistory.length)
              .fill()
              .map((x, i) => i)}
            width={1400}
            height={600}
            yShowGrid={true}
            yVisible={true}
            yZeroline={true}
            lMargin={48}
          />
        </div>
        <div>
          <div className="flex flex-col">
            <span className="text-4xl text-white font-light">
              {props.coinData.name} Description
            </span>
            <p className="unreset text-zinc-400 font-semibold">
              {parse(
                props.coinData.description[props.language] == "" ||
                  props.coinData.description[props.language] == undefined
                  ? props.coinData.description["en"]
                  : props.coinData.description[props.language]
              )}
            </p>
          </div>
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
  const validLanguages = [
    "ar",
    "bg",
    "cs",
    "da",
    "de",
    "el",
    "en",
    "es",
    "fi",
    "fr",
    "he",
    "hi",
    "hr",
    "hu",
    "id",
    "it",
    "ja",
    "ko",
    "lt",
    "nl",
    "no",
    "pl",
    "pt",
    "ro",
    "ru",
    "sk",
    "sl",
    "sv",
    "th",
    "tr",
    "uk",
    "vi",
    "zh",
    "zh-tw",
  ];
  const currency =
    context.query.currency != undefined &&
    acceptCurrencies.includes(context.query.currency)
      ? context.query.currency
      : "usd";
  const language =
    context.query.language != undefined &&
    validLanguages.includes(context.query.language)
      ? context.query.language
      : "en";
  const coin = context.params.id.toLowerCase();
  const coinData = await axios
    .get(`https://api.coingecko.com/api/v3/coins/${coin}?sparkline=true`)
    .then((response) => {
      return response.data;
    });
  return { props: { coinData, currency, language } };
};
