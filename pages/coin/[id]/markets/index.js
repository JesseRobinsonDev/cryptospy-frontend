import Layout from "../../../../components/layout/Layout";
import axios from "axios";
import { useEffect } from "react";
import CoinPageTitleSection from "../../../../components/coinpage/CoinPageTitleSection";

export default function CoinMarketsPage(props) {
  console.log(props);

  return (
    <Layout
      title={`${props.coinData.name} Markets - CryptoSpy`}
      description={`Get the latest ${props.coinData.name} information, current price, market cap, volume, supply and data`}
    >
      <div className="w-full flex flex-col">
        <CoinPageTitleSection
          coinData={props.coinData}
          language={props.language}
          currency={props.currency}
          tab="Markets"
        />
        <div className="w-full p-4 px-4">
          <header className="grid grid-cols-6 text-white">
            <span>Exchange</span>
            <span>Pair</span>
            <span>USD Price</span>
            <span>USD Volume</span>
            <span>Target Price</span>
            <span>Target Volume</span>
          </header>
          <ul className="flex flex-col">
            {props.marketData.tickers.map((ticker) => (
              <li
                key={`${ticker.market.identifier}-${ticker.base}/${ticker.target}`}
                className="grid grid-cols-6 p-2 text-white border-b border-neutral-800 items-center"
              >
                <div className="flex flex-row items-center">
                  <img src={ticker.market.logo} alt={ticker.market.name} />
                  <span>{ticker.market.name}</span>
                </div>
                <div>
                  <span>{ticker.base}</span>
                  <span>/</span>
                  <span>{ticker.target}</span>
                </div>
                <span>
                  {ticker.converted_last.usd
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <span>
                  {ticker.converted_volume.usd
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <span>
                  {ticker.last
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <span>
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
      `https://api.coingecko.com/api/v3/coins/${coin}/tickers?include_exchange_logo=true&depth=true`
    )
    .then((response) => {
      return response.data;
    });
  return { props: { coinData, marketData, currency, language } };
};
