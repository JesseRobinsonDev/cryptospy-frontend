import axios from "axios";
import Layout from "../../../components/layout/Layout";
import Link from "next/link";
import CoinPageTitleSection from "../../../components/coinpage/CoinPageTitleSection";

export default function CoinPage(props) {
  console.log(props);
  return (
    <Layout
      title={`${props.coinData.name} - CryptoSpy`}
      description={`Get the latest ${props.coinData.name} information, current price, market cap, volume, supply and data`}
    >
      <div className="w-full">
        <CoinPageTitleSection
          coinData={props.coinData}
          language={props.language}
          currency={props.currency}
          tab="Overview"
        />
        <span>{props.coinData.description[props.language]}</span>
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
