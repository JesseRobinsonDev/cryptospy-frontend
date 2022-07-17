import Link from "next/link";
import ScatterLineGraph from "../chart/ScatterLineGraph";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../pages/_app";

export default function MiniCoinBar(props) {
  const [tracked, setTracked] = useState(false);
  const { userID } = useContext(UserContext);

  function trackCoinHandler() {
    if (userID == null) {
      return;
    }
    axios
      .put(
        `${process.env.NEXT_PUBLIC_APIURL}/user/${userID}/${props.id}/${
          tracked ? "untrack" : "track"
        }`
      )
      .then((response) => {
        setTracked(!tracked);
      });
  }

  useEffect(() => {
    setTracked(props.tracked);
  }, [props]);

  return (
    <li className="w-full h-20 grid grid-cols-10 items-center justify-between text-center gap-2 overflow-hidden border-b border-neutral-800">
      <div className="text-lg text-neutral-500 font-semibold">{props.rank}</div>
      <div className="flex flex-row col-span-2 gap-2 items-center">
        <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/coin/${props.id}`}>
          <a className="flex flex-row items-center gap-2">
            <img className="w-9 h-9" src={props.image} alt={props.name} />
            <span className="text-xl text-white font-light">{props.name}</span>
            <span className="text-sm text-gray-400 font-bold px-3 py-1 bg-zinc-700 rounded-lg tracking-wide mt-1">
              {props.symbol.toUpperCase()}
            </span>
          </a>
        </Link>
        <button className="relative flex items-center justify-center group">
          {tracked ? (
            <img
              src="/svgs/Yellow Star.svg"
              className="w-8 h-8"
              onClick={trackCoinHandler}
            />
          ) : (
            <img
              src="/svgs/White Star.svg"
              className="w-8 h-8"
              onClick={trackCoinHandler}
            />
          )}
          <div className="absolute invisible w-44 px-1 py-0.5 bottom-6 rounded-md group-hover:visible bg-neutral-800 text-white">
            {tracked ? (
              <span className="text-sm">Remove from Watchlist</span>
            ) : (
              <span className="text-sm">Add to Watchlist</span>
            )}
          </div>
        </button>
      </div>
      <div className="flex flex-row justify-start gap-1">
        <span className="text-white">
          $
          {props.price != null
            ? props.price
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            : "0"}
        </span>
        <span className="text-white">{props.currency.toUpperCase()}</span>
      </div>
      <div className="flex justify-start">
        {props.priceChange24h > 0 ? (
          <span className="text-green-500">
            +
            {props.priceChange24h != null
              ? props.priceChange24h.toFixed(2) + "%"
              : "0%"}
          </span>
        ) : (
          <span className="text-red-500">
            {props.priceChange24h != null
              ? props.priceChange24h.toFixed(2) + "%"
              : "0%"}
          </span>
        )}
      </div>
      <div className="flex justify-start">
        {props.priceChange7d > 0 ? (
          <span className="text-green-500">
            +
            {props.priceChange7d != null
              ? props.priceChange7d.toFixed(2) + "%"
              : "0%"}
          </span>
        ) : (
          <span className="text-red-500">
            {props.priceChange7d != null
              ? props.priceChange7d.toFixed(2) + "%"
              : "0%"}
          </span>
        )}
      </div>
      <span className="text-white flex justify-start">
        $
        {props.marketCap != null
          ? props.marketCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "0"}
      </span>
      <span className="text-white flex justify-start">
        $
        {props.totalVolume != null
          ? props.totalVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "0"}
      </span>
      <span className="text-white flex justify-start">
        {props.circulatingSupply != null
          ? Math.floor(props.circulatingSupply)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "0"}{" "}
        {props.symbol.toUpperCase()}
      </span>
      <ScatterLineGraph
        color={props.priceChange7d >= 0 ? "green" : "red"}
        y={props.priceHistory}
        x={Array(props.priceHistory.length)
          .fill()
          .map((x, i) => i)}
        width={140}
        height={80}
      />
    </li>
  );
}
