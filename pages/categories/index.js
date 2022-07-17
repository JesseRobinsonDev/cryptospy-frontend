import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useState, useEffect } from "react";

export default function CoinCategoriesPage(props) {
  const [categoryData, setCategoryData] = useState([]);
  const [categorySort, setCategorySort] = useState("numberasc");

  useEffect(() => {
    setCategoryData(() => [
      ...props.categories.map((obj) => ({
        ...obj,
        num: props.categories.indexOf(obj) + 1,
      })),
    ]);
  }, [props]);

  function sortCategoryData(sort) {
    var data = categoryData;
    switch (sort) {
      case "category":
        if (categorySort == "categoryasc") {
          setCategoryData(() => [
            ...data.sort((a, b) =>
              a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            ),
          ]);
          setCategorySort("categorydes");
        } else {
          setCategoryData(() => [
            ...data.sort((a, b) =>
              b.name.toLowerCase().localeCompare(a.name.toLowerCase())
            ),
          ]);
          setCategorySort("categoryasc");
        }
        break;
      case "marketcap":
        if (categorySort == "marketcapasc") {
          setCategoryData(() => [
            ...data.sort((a, b) => a.market_cap - b.market_cap),
          ]);
          setCategorySort("marketcapdes");
        } else {
          setCategoryData(() => [
            ...data.sort((a, b) => b.market_cap - a.market_cap),
          ]);
          setCategorySort("marketcapasc");
        }
        break;
      case "pricechange24h":
        if (categorySort == "pricechange24hasc") {
          setCategoryData(() => [
            ...data.sort(
              (a, b) => a.market_cap_change_24h - b.market_cap_change_24h
            ),
          ]);
          setCategorySort("pricechange24hdes");
        } else {
          setCategoryData(() => [
            ...data.sort(
              (a, b) => b.market_cap_change_24h - a.market_cap_change_24h
            ),
          ]);
          setCategorySort("pricechange24hasc");
        }
        break;
      case "volume":
        if (categorySort == "volumeasc") {
          setCategoryData(() => [
            ...data.sort((a, b) => a.volume_24h - b.volume_24h),
          ]);
          setCategorySort("volumedes");
        } else {
          setCategoryData(() => [
            ...data.sort((a, b) => b.volume_24h - a.volume_24h),
          ]);
          setCategorySort("volumeasc");
        }
        break;
      default:
        if (categorySort == "numberasc") {
          setCategoryData(() =>
            [
              ...props.categories.map((obj) => ({
                ...obj,
                num: props.categories.indexOf(obj) + 1,
              })),
            ].reverse()
          );
          setCategorySort("numberdes");
        } else {
          setCategoryData(() => [
            ...props.categories.map((obj) => ({
              ...obj,
              num: props.categories.indexOf(obj) + 1,
            })),
          ]);
          setCategorySort("numberasc");
        }
        break;
    }
  }

  return (
    <Layout title={`Categories - CryptoSpy`}>
      <div className="w-full flex flex-col p-4 px-4">
        <div className="flex flex-col">
          <header className="h-12 sticky top-0 items-center bg-neutral-900 grid grid-cols-6 p-1 border-b border-neutral-800">
            <button
              onClick={() => sortCategoryData("number")}
              className="flex justify-center text-gray-200 hover:text-green-500 duration-300"
            >
              #
            </button>
            <button
              onClick={() => sortCategoryData("category")}
              className="flex justify-start text-gray-200 hover:text-green-500 duration-300 text-lg font-semibold"
            >
              Category
            </button>
            <button
              onClick={() => sortCategoryData("marketcap")}
              className="flex justify-start text-gray-200 hover:text-green-500 duration-300"
            >
              Market Cap
            </button>
            <button
              onClick={() => sortCategoryData("pricechange24h")}
              className="flex justify-start text-gray-200 hover:text-green-500 duration-300"
            >
              24h %
            </button>
            <button
              onClick={() => sortCategoryData("volume")}
              className="flex justify-start text-gray-200 hover:text-green-500 duration-300"
            >
              Volume
            </button>
            <span className="flex justify-start text-gray-200">Top Coins</span>
          </header>
          <ul>
            {categoryData.map((category) => (
              <li
                key={category.id}
                className="h-16 items-center border-b border-neutral-800 grid grid-cols-6"
              >
                <span className="flex justify-center text-neutral-500 font-semibold text-lg">
                  {category.num}
                </span>
                <span className="text-white text-xl font-light">
                  {category.name}
                </span>
                <span className="text-white">
                  $
                  {category.market_cap
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <div className="flex justify-start">
                  {category.market_cap_change_24h > 0 ? (
                    <span className="text-green-500">
                      +
                      {category.market_cap_change_24h != null
                        ? category.market_cap_change_24h.toFixed(2) + "%"
                        : "0%"}
                    </span>
                  ) : (
                    <span className="text-red-500">
                      {category.market_cap_change_24h != null
                        ? category.market_cap_change_24h.toFixed(2) + "%"
                        : "0%"}
                    </span>
                  )}
                </div>
                <span className="text-white">
                  $
                  {category.volume_24h
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <div className="flex flex-row gap-1">
                  {category.top_3_coins.map((coin) => (
                    <img key={coin} src={coin} alt={coin} />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const categories = await axios
    .get(`https://api.coingecko.com/api/v3/coins/categories`)
    .then((response) => {
      return response.data;
    });
  return {
    props: {
      categories,
    },
  };
};
