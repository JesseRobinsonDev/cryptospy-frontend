import Link from "next/link";

export default function CoinPageNavigationBar(props) {
  return (
    <nav className="w-full h-16 border-y border-zinc-800">
      <ul className="w-full h-full flex flex-row items-center gap-4">
        <li>
          <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/coin/${props.id}`}>
            <a>
              {props.tab == "Overview" ? (
                <span className="text-white text-lg font-semibold bg-blue-700 py-2 px-4 duration-300 rounded-lg">
                  Overview
                </span>
              ) : (
                <span className="text-white text-lg font-semibold hover:bg-blue-700 hover:bg-opacity-50 py-2 px-4 duration-300 rounded-lg">
                  Overview
                </span>
              )}
            </a>
          </Link>
        </li>
        <li>
          <Link
            href={`${process.env.NEXT_PUBLIC_SITEURL}/coin/${props.id}/markets`}
          >
            <a>
              {props.tab == "Markets" ? (
                <span className="text-white text-lg font-semibold bg-blue-700 py-2 px-4 duration-300 rounded-lg">
                  Markets
                </span>
              ) : (
                <span className="text-white text-lg font-semibold hover:bg-blue-700 hover:bg-opacity-50 py-2 px-4 duration-300 rounded-lg">
                  Markets
                </span>
              )}
            </a>
          </Link>
        </li>
        <li>
          <Link
            href={`${process.env.NEXT_PUBLIC_SITEURL}/coin/${props.id}/history`}
          >
            <a>
              {props.tab == "History" ? (
                <span className="text-white text-lg font-semibold bg-blue-700 py-2 px-4 duration-300 rounded-lg">
                  History
                </span>
              ) : (
                <span className="text-white text-lg font-semibold hover:bg-blue-700 hover:bg-opacity-50 py-2 px-4 duration-300 rounded-lg">
                  History
                </span>
              )}
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
