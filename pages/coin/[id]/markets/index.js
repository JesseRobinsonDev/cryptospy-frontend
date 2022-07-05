import Layout from "../../../../components/layout/Layout";
import axios from "axios";
import { useEffect } from "react";

export default function CoinMarketsPage(props) {
  console.log(props);

  return (
    <Layout
      title={`${props.coinData.name} Markets - CryptoSpy`}
      description={`Get the latest ${props.coinData.name} information, current price, market cap, volume, supply and data`}
    >
      <div className="w-full">
        <header className="grid grid-cols-6 text-white">
          <span>Exchange</span>
          <span>Pair</span>
          <span>USD Price</span>
          <span>USD Volume</span>
          <span>Target Price</span>
          <span>Target Volume</span>
        </header>
        <ul>
          {props.coinData.tickers.map((ticker) => (
            <li
              key={`${ticker.market.identifier}-${ticker.base}/${ticker.target}`}
              className="grid grid-cols-6 text-white"
            >
              <div className="flex flex-row">
                <img src={ticker.market.logo} alt={ticker.market.name} />
                <span>{ticker.market.name}</span>
              </div>
              <div>
                <span>{ticker.base}</span>
                <span>/</span>
                <span>{ticker.target}</span>
              </div>
              <span>{ticker.converted_last.usd.toFixed(2)}</span>
              <span>{ticker.converted_volume.usd.toFixed(2)}</span>
              <span>{ticker.last.toFixed(2)}</span>
              <span>{ticker.volume.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const coinData = await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${"bitcoin"}/tickers?include_exchange_logo=true&depth=true`
    )
    .then((response) => {
      return response.data;
    });
  return { props: { coinData } };
};
