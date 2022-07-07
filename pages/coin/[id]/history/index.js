import Layout from "../../../../components/layout/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import CoinPageTitleSection from "../../../../components/coinpage/CoinPageTitleSection";

export default function CoinHistoryPage(props) {
  const [coinOHLC, setCoinOHLC] = useState([]);
  const [timeframe, setTimeframe] = useState("1y");

  useEffect(() => {
    setCoinOHLC([...props.ohlc]);
  }, []);

  function getCoinOHLC(days) {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${props.coinData.id}/ohlc?vs_currency=usd&days=${days}`
      )
      .then((response) => {
        setCoinOHLC([...response.data]);
      });
  }

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
    var time = hour + ":" + min + ", " + month + " " + date + ", " + year;
    return time;
  }

  console.log(props);
  return (
    <Layout
      title={`${props.coinData.name} History - CryptoSpy`}
      description={`Get the latest ${props.coinData.name} information, current price, market cap, volume, supply and data`}
    >
      <div className="w-full flex flex-col p-2">
        <CoinPageTitleSection
          coinData={props.coinData}
          language={props.language}
          currency={props.currency}
          tab="History"
        />
        <div className="w-full">
          <div className="flex flex-row gap-4 p-2">
            <button
              onClick={() => {
                getCoinOHLC(1);
                setTimeframe("24h");
              }}
            >
              {timeframe == "24h" ? (
                <span className="text-white text-lg font-semibold bg-blue-700 py-2 px-4 duration-300 rounded-lg">
                  24h
                </span>
              ) : (
                <span className="text-white text-lg font-semibold hover:bg-blue-700 hover:bg-opacity-50 py-2 px-4 duration-300 rounded-lg">
                  24h
                </span>
              )}
            </button>
            <button
              onClick={() => {
                getCoinOHLC(7);
                setTimeframe("7d");
              }}
            >
              {timeframe == "7d" ? (
                <span className="text-white text-lg font-semibold bg-blue-700 py-2 px-4 duration-300 rounded-lg">
                  7d
                </span>
              ) : (
                <span className="text-white text-lg font-semibold hover:bg-blue-700 hover:bg-opacity-50 py-2 px-4 duration-300 rounded-lg">
                  7d
                </span>
              )}
            </button>
            <button
              onClick={() => {
                getCoinOHLC(14);
                setTimeframe("14d");
              }}
            >
              {timeframe == "14d" ? (
                <span className="text-white text-lg font-semibold bg-blue-700 py-2 px-4 duration-300 rounded-lg">
                  14d
                </span>
              ) : (
                <span className="text-white text-lg font-semibold hover:bg-blue-700 hover:bg-opacity-50 py-2 px-4 duration-300 rounded-lg">
                  14d
                </span>
              )}
            </button>
            <button
              onClick={() => {
                getCoinOHLC(30);
                setTimeframe("1m");
              }}
            >
              {timeframe == "1m" ? (
                <span className="text-white text-lg font-semibold bg-blue-700 py-2 px-4 duration-300 rounded-lg">
                  1m
                </span>
              ) : (
                <span className="text-white text-lg font-semibold hover:bg-blue-700 hover:bg-opacity-50 py-2 px-4 duration-300 rounded-lg">
                  1m
                </span>
              )}
            </button>
            <button
              onClick={() => {
                getCoinOHLC(90);
                setTimeframe("3m");
              }}
            >
              {timeframe == "3m" ? (
                <span className="text-white text-lg font-semibold bg-blue-700 py-2 px-4 duration-300 rounded-lg">
                  3m
                </span>
              ) : (
                <span className="text-white text-lg font-semibold hover:bg-blue-700 hover:bg-opacity-50 py-2 px-4 duration-300 rounded-lg">
                  3m
                </span>
              )}
            </button>
            <button
              onClick={() => {
                getCoinOHLC(180);
                setTimeframe("6m");
              }}
            >
              {timeframe == "6m" ? (
                <span className="text-white text-lg font-semibold bg-blue-700 py-2 px-4 duration-300 rounded-lg">
                  6m
                </span>
              ) : (
                <span className="text-white text-lg font-semibold hover:bg-blue-700 hover:bg-opacity-50 py-2 px-4 duration-300 rounded-lg">
                  6m
                </span>
              )}
            </button>
            <button
              onClick={() => {
                getCoinOHLC(365);
                setTimeframe("1y");
              }}
            >
              {timeframe == "1y" ? (
                <span className="text-white text-lg font-semibold bg-blue-700 py-2 px-4 duration-300 rounded-lg">
                  1y
                </span>
              ) : (
                <span className="text-white text-lg font-semibold hover:bg-blue-700 hover:bg-opacity-50 py-2 px-4 duration-300 rounded-lg">
                  1y
                </span>
              )}
            </button>
          </div>
          <ul className="flex flex-col text-white">
            <li className="grid grid-cols-5 p-2 border-y border-neutral-800">
              <span>Date</span>
              <span>Open</span>
              <span>High</span>
              <span>Low</span>
              <span>Close</span>
            </li>
            {coinOHLC.map((ohlc) => (
              <li
                key={ohlc[0]}
                className="grid grid-cols-5 border-b border-neutral-800 p-2"
              >
                <span>{timeConverter(ohlc[0])}</span>
                <span>
                  $
                  {ohlc[1]
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <span>
                  $
                  {ohlc[2]
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <span>
                  $
                  {ohlc[3]
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <span>
                  $
                  {ohlc[4]
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
  const ohlc = await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=usd&days=365`
    )
    .then((response) => {
      return response.data;
    });
  return { props: { coinData, ohlc, currency, language } };
};
