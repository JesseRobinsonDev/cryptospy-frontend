import axios from "axios";
import Layout from "../../../components/layout/Layout";

export default function CoinPage(props) {
  console.log(props);
  return (
    <Layout
      title={`${props.coinData.name} - CryptoSpy`}
      description={`Get the latest ${props.coinData.name} information, current price, market cap, volume, supply and data`}
    >
      <main className="w-full text-white">
        <img src={props.coinData.image.large} />
        <div>{props.coinData.symbol}</div>
        <div>{props.coinData.name}</div>
        <div>{props.coinData.market_cap_rank}</div>
        <div>{props.coinData.categories}</div>
        <div>{props.coinData.market_data.total_supply}</div>
        <div>{props.coinData.market_data.circulating_supply}</div>
        <div>{props.coinData.market_data.max_supply}</div>
        <div>{props.coinData.market_data.total_volume[props.currency]}</div>
        <div>{props.coinData.market_data.market_cap[props.currency]}</div>
        <div>{props.coinData.market_data.current_price[props.currency]}</div>
        <div>{props.coinData.description[props.language]}</div>
      </main>
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
  const coin = context.params.id;
  const coinData = await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}?sparkline=true`
    )
    .then((response) => {
      return response.data;
    });
  return { props: { coinData, currency, language } };
};
