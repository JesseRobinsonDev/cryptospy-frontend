import Link from "next/link";

export default function ExchangePageTitleSection(props) {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-5/12 flex flex-col gap-1">
          <div className="flex flex-row gap-1 items-center">
            <img src={props.exchangeData.image} className="w-12 h-12" />
            <span className="text-4xl font-semibold text-white">
              {props.exchangeData.name}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-fit flex flex-row gap-1 bg-zinc-700 py-1 px-3 rounded-md">
              <span className="text-gray-400 text-sm font-bold">
                Trust Score Rank:
              </span>
              <span className="text-gray-400 text-sm font-bold">
                {props.exchangeData.trust_score_rank}
              </span>
            </div>
            <div className="w-fit flex flex-row gap-1 bg-zinc-700 py-1 px-3 rounded-md">
              <span className="text-gray-400 text-sm font-bold">
                Trust Score:
              </span>
              <span className="text-gray-400 text-sm font-bold">
                {props.exchangeData.trust_score}
              </span>
            </div>
          </div>
          <Link href={props.exchangeData.url}>
            <a className="text-blue-500 hover:text-blue-400 duration-300">
              {props.exchangeData.url}
            </a>
          </Link>
        </div>
        <div className="w-full lg:w-7/12 flex flex-col">
          <span className="text-zinc-400 text-3xl font-light">
            24h BTC Volume
          </span>
          <span className="text-white text-4xl font-semibold">
            $
            {props.exchangeData.trade_volume_24h_btc
              .toFixed(2)
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-1">
        <span>{props.exchangeData.twitter_handle}</span>
        <span>{props.exchangeData.telegram_url}</span>
        <span>{props.exchangeData.slack_url}</span>
        <span>{props.exchangeData.reddit_url}</span>
        <span>{props.exchangeData.other_url_2}</span>
        <span>{props.exchangeData.other_url_1}</span>
        <span>{props.exchangeData.facebook_url}</span>
        <span>{props.exchangeData.public_notice}</span>
        <span>{props.exchangeData.alert_notice}</span>
      </div>
    </section>
  );
}
