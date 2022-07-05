import Link from "next/link";

export default function MiniCoinBar(props) {
  return (
    <li className="w-full h-20 grid grid-cols-10 items-center justify-between text-center gap-2 overflow-hidden border-b border-neutral-800">
      <div className="text-lg text-neutral-500 font-semibold">{props.rank}</div>
      <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/coin/${props.id}`}>
        <a className="flex flex-row items-center col-span-2 gap-2">
          <img className="w-9 h-9" src={props.image} alt={props.name} />
          <span className="text-xl text-white font-light">{props.name}</span>
          <span className="text-sm text-gray-400 font-bold px-3 py-1 bg-zinc-700 rounded-lg tracking-wide mt-1">
            {props.symbol.toUpperCase()}
          </span>
        </a>
      </Link>
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
          : "0"}
      </span>
      {/*
      <ScatterLineGraph
        color={props.priceChange7d >= 0 ? "green" : "red"}
        y={props.priceHistory}
        x={Array(props.priceHistory.length)
          .fill()
          .map((x, i) => i)}
        width={140}
        height={80}
        />
        */}
    </li>
  );
}
