import Layout from "../../../../components/layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import CoinPageTitleSection from "../../../../components/coinpage/CoinPageTitleSection";
import PageNavigationBar from "../../../../components/navigation/PageNavigationBar";

export default function CoinMarketsPage(props) {
  const [marketData, setMarketData] = useState([]);
  const [marketSort, setMarketSort] = useState("numberasc");

  useEffect(() => {
    setMarketData(() => [
      ...props.marketData.tickers.map((obj) => ({
        ...obj,
        num: props.marketData.tickers.indexOf(obj) + 1,
      })),
    ]);
  }, [props]);

  function sortMarketData(sort) {
    var data = marketData;
    switch (sort) {
      case "exchange":
        if (marketSort == "exchangeasc") {
          setMarketData(() => [
            ...data.sort((a, b) =>
              a.market.name
                .toLowerCase()
                .localeCompare(b.market.name.toLowerCase())
            ),
          ]);
          setMarketSort("exchangedes");
        } else {
          setMarketData(() => [
            ...data.sort((a, b) =>
              b.market.name
                .toLowerCase()
                .localeCompare(a.market.name.toLowerCase())
            ),
          ]);
          setMarketSort("exchangeasc");
        }
        break;
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
              ...props.marketData.tickers.map((obj) => ({
                ...obj,
                num: props.marketData.tickers.indexOf(obj) + 1,
              })),
            ].reverse()
          );
          setMarketSort("numberdes");
        } else {
          setMarketData(() => [
            ...props.marketData.tickers.map((obj) => ({
              ...obj,
              num: props.marketData.tickers.indexOf(obj) + 1,
            })),
          ]);
          setMarketSort("numberasc");
        }
        break;
    }
  }

  return (
    <Layout
      title={`${props.coinData.name} Markets - CryptoSpy`}
      description={`Get the latest ${props.coinData.name} information, current price, market cap, volume, supply and data`}
    >
      <div className="w-full flex flex-col p-2">
        <CoinPageTitleSection
          coinData={props.coinData}
          language={props.language}
          currency={props.currency}
          tab="Markets"
        />
        <div className="border-b border-neutral-800 p-2">
          <PageNavigationBar
            url={`${process.env.NEXT_PUBLIC_SITEURL}/coin/${props.coinData.id}/markets?currency=${props.currency}`}
            page={props.page}
          />
        </div>
        <div className="w-full">
          <header className="h-12 sticky top-0 items-center bg-neutral-900 grid grid-cols-7 p-1 border-b border-neutral-800">
            <button
              onClick={() => sortMarketData("number")}
              className="flex justify-center text-gray-200 hover:text-green-500 duration-300"
            >
              #
            </button>
            <button
              onClick={() => sortMarketData("exchange")}
              className="flex justify-start text-gray-200 hover:text-green-500 duration-300 text-lg font-semibold"
            >
              Exchange
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
          <ul className="flex flex-col">
            {marketData.map((ticker) => (
              <li
                key={`${ticker.market.identifier}-${ticker.base}/${ticker.target}`}
                className="grid grid-cols-7 h-10 text-white border-b border-neutral-800 items-center"
              >
                <span className="flex justify-center text-neutral-500 font-semibold text-lg">
                  {ticker.num}
                </span>
                <Link
                  href={`${process.env.NEXT_PUBLIC_SITEURL}/exchange/${ticker.market.identifier}`}
                >
                  <a className="flex flex-row items-center gap-1 hover:underline">
                    <img
                      src={ticker.market.logo}
                      alt={ticker.market.name}
                      className="w-8 h-8"
                    />
                    <span>{ticker.market.name}</span>
                  </a>
                </Link>
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
  const page = context.query.page != undefined ? context.query.page : 1;
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
  const marketData = await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${coin}/tickers?include_exchange_logo=true&depth=true&page=${page}`
    )
    .then((response) => {
      return response.data;
    });
  return { props: { coinData, marketData, currency, language, page } };
};
