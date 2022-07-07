import Layout from "../../../../components/layout/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import CoinPageTitleSection from "../../../../components/coinpage/CoinPageTitleSection";

export default function CoinHistoryPage(props) {
  const [coinOHLC, setCoinOHLC] = useState([]);

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
    var time = hour + ":" + min + " GMT, " + month + " " + date + ", " + year;
    return time;
  }

  console.log(props);
  return (
    <Layout
      title={`${props.coinData.name} History - CryptoSpy`}
      description={`Get the latest ${props.coinData.name} information, current price, market cap, volume, supply and data`}
    >
      <div className="w-full flex flex-col">
        <CoinPageTitleSection
          coinData={props.coinData}
          language={props.language}
          currency={props.currency}
          tab="History"
        />
        <div className="w-full">
          <div className="flex flex-row gap-8">
            <button onClick={() => getCoinOHLC(1)}>CLICK</button>
            <button onClick={() => getCoinOHLC(7)}>CLICK</button>
            <button onClick={() => getCoinOHLC(14)}>CLICK</button>
            <button onClick={() => getCoinOHLC(30)}>CLICK</button>
            <button onClick={() => getCoinOHLC(90)}>CLICK</button>
            <button onClick={() => getCoinOHLC(180)}>CLICK</button>
            <button onClick={() => getCoinOHLC(365)}>CLICK</button>
          </div>
          <ul className="flex flex-col text-white">
            <li className="grid grid-cols-5">
              <span>Date</span>
              <span>Open</span>
              <span>High</span>
              <span>Low</span>
              <span>Close</span>
            </li>
            {coinOHLC.map((ohlc) => (
              <li key={ohlc[0]} className="grid grid-cols-5">
                <span>{timeConverter(ohlc[0])}</span>
                <span>{ohlc[1]}</span>
                <span>{ohlc[2]}</span>
                <span>{ohlc[3]}</span>
                <span>{ohlc[4]}</span>
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
