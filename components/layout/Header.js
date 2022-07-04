import Link from "next/link";

export default function Header(props) {
  return (
    <header className="w-full h-20 bg-stone-900 flex flex-row gap-2 items-center justify-between px-8">
      <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/`}>
        <a className="text-2xl text-white font-light hover:text-green-600 duration-500">
          CryptoSpy
        </a>
      </Link>
      <ul className="flex flex-row gap-12">
        <li>
          <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/coins`}>
            <a className="text-xl text-white font-light hover:text-green-600 duration-500">
              Coins
            </a>
          </Link>
        </li>
        <li>
          <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/exchanges`}>
            <a className="text-xl text-white font-light hover:text-green-600 duration-500">
              Exchanges
            </a>
          </Link>
        </li>
        <li>
          <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/news`}>
            <a className="text-xl text-white font-light hover:text-green-600 duration-500">
              News
            </a>
          </Link>
        </li>
      </ul>
    </header>
  );
}
