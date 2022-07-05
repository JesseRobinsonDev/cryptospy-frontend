import Link from "next/link";

export default function PageNavigationBarButton(props) {
  return (
    <li>
      {props.current ? (
        <Link href={`${props.url}&page=${parseInt(props.page) + props.inc}`}>
          <a className="px-3 py-1 bg-blue-600 rounded-lg">
            <span className="text-lg text-white font-semibold">
              {parseInt(props.page) + props.inc}
            </span>
          </a>
        </Link>
      ) : (
        <Link href={`${props.url}&page=${parseInt(props.page) + props.inc}`}>
          <a className="px-3 py-1 rounded-lg hover:bg-opacity-30 hover:bg-blue-600 hover:border-blue-400 hover:text-white duration-200">
            <span className="text-lg text-white font-semibold">
              {parseInt(props.page) + props.inc}
            </span>
          </a>
        </Link>
      )}
    </li>
  );
}
