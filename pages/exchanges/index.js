import Layout from "../../components/layout/Layout";
import axios from "axios";
import Link from "next/link";
import PageNavigationBar from "../../components/navigation/PageNavigationBar";
import DropdownMenuInput from "../../components/input/DropdownMenuInput";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ExchangesPage(props) {
  const [exchangesData, setExchangesData] = useState([]);
  const [exchangeSort, setExchangeSort] = useState("exchangeasc");
  const [perPageDropdown, setPerPageDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setExchangesData(() => [...props.exchangesData]);
  }, [props]);

  function sortExchangesData(sort) {
    var data = exchangesData;
    switch (sort) {
      case "name":
        if (exchangeSort == "nameasc") {
          setExchangesData(() => [
            ...data.sort((a, b) =>
              a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            ),
          ]);
          setExchangeSort("namedes");
        } else {
          setExchangesData(() => [
            ...data.sort((a, b) =>
              b.name.toLowerCase().localeCompare(a.name.toLowerCase())
            ),
          ]);
          setExchangeSort("nameasc");
        }
        break;
      case "btcvolume":
        if (exchangeSort == "btcvolumeasc") {
          setExchangesData(() => [
            ...data.sort(
              (a, b) => a.trade_volume_24h_btc - b.trade_volume_24h_btc
            ),
          ]);
          setExchangeSort("btcvolumedes");
        } else {
          setExchangesData(() => [
            ...data.sort(
              (a, b) => b.trade_volume_24h_btc - a.trade_volume_24h_btc
            ),
          ]);
          setExchangeSort("btcvolumeasc");
        }
        break;
      case "trust":
        if (exchangeSort == "trustasc") {
          setExchangesData(() => [
            ...data.sort((a, b) => a.trust_score - b.trust_score),
          ]);
          setExchangeSort("trustdesc");
        } else {
          setExchangesData(() => [
            ...data.sort((a, b) => b.trust_score - a.trust_score),
          ]);
          setExchangeSort("trustasc");
        }
        break;
      default:
        if (exchangeSort == "exchangeasc") {
          setExchangesData(() => [...props.exchangesData].reverse());
          setExchangeSort("exchangedes");
        } else {
          setExchangesData(() => [...props.exchangesData]);
          setExchangeSort("exchangeasc");
        }
        break;
    }
  }

  return (
    <Layout title="Exchanges - CryptoSpy">
      <div className="w-full p-4 px-4">
        <div className="flex flex-col gap-1 p-1">
          <span className="text-6xl text-white font-light">Exchanges</span>
          <p className="text-xl text-neutral-500 font-semibold">
            Data set from the CoinGecko cryptocurrency API
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-1 border-b p-2 border-neutral-800">
          <PageNavigationBar
            url={`${process.env.NEXT_PUBLIC_SITEURL}/exchanges?perpage=${props.perpage}`}
            page={props.page}
          />
          <DropdownMenuInput
            dropdownButton={{
              text: `${props.perpage} V`,
              onClick: () => setPerPageDropdown(!perPageDropdown),
            }}
            dropdownButtons={[
              {
                text: "25",
                onClick: () =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_SITEURL}/exchanges/?page=${props.page}&perpage=25`
                  ),
              },
              {
                text: "50",
                onClick: () =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_SITEURL}/exchanges/?page=${props.page}&perpage=50`
                  ),
              },
              {
                text: "100",
                onClick: () =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_SITEURL}/exchanges/?page=${props.page}&perpage=100`
                  ),
              },
              {
                text: "200",
                onClick: () =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_SITEURL}/exchanges/?page=${props.page}&perpage=200`
                  ),
              },
            ]}
            toggleState={perPageDropdown}
          />
        </div>
        <header className="w-full h-12 items-center grid grid-cols-6 bg-neutral-900 border-b border-neutral-800 sticky top-0">
          <button
            onClick={() => sortExchangesData("rank")}
            className="text-gray-200 hover:text-green-500 duration-300 w-full flex justify-center"
          >
            Rank
          </button>
          <button
            onClick={() => sortExchangesData("name")}
            className="col-span-2 text-gray-200 hover:text-green-500 duration-300 w-full flex justify-start font-semibold text-lg"
          >
            Exchange
          </button>
          <button
            onClick={() => sortExchangesData("btcvolume")}
            className="text-gray-200 hover:text-green-500 duration-300 w-full flex justify-start"
          >
            Bitcoin Volume (24h)
          </button>
          <button
            onClick={() => sortExchangesData("trust")}
            className="text-gray-200 hover:text-green-500 duration-300 w-full flex justify-start"
          >
            Trust Score
          </button>
          <span className="text-gray-200 w-full flex justify-start">Link</span>
        </header>
        <ul>
          {exchangesData.map((exchange) => (
            <li
              key={exchange.id}
              className="grid grid-cols-6 h-12 border-b border-neutral-800 items-center"
            >
              <div className="text-neutral-500 font-semibold text-lg w-full flex justify-center">
                {exchange.trust_score_rank}
              </div>
              <Link
                href={`${process.env.NEXT_PUBLIC_SITEURL}/exchange/${exchange.id}`}
              >
                <a className="flex flex-row col-span-2 items-center gap-1 text-white hover:text-green-600 duration-500">
                  <img
                    src={exchange.image}
                    alt={exchange.name}
                    className="w-9 h-9"
                  />
                  <span className="text-xl font-light">{exchange.name}</span>
                </a>
              </Link>
              <span className="text-white">
                $
                {exchange.trade_volume_24h_btc
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
              <span className="text-white">{exchange.trust_score}</span>
              <Link href={exchange.url}>
                <a className="text-blue-500">Link</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
//

export const getServerSideProps = async (context) => {
  const page =
    context.query.page != undefined && context.query.page > 0
      ? context.query.page
      : 1;
  const perpage =
    context.query.perpage != undefined && context.query.perpage > 0
      ? context.query.perpage
      : 50;
  const exchangesData = await axios
    .get(
      `https://api.coingecko.com/api/v3/exchanges?per_page=${perpage}&page=${page}`
    )
    .then((response) => {
      return response.data;
    });
  return {
    props: {
      exchangesData,
      page,
      perpage,
    },
  };
};
