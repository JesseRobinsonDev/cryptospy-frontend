import PageNavigationBarButton from "./PageNavigationBarButton";
import Link from "next/link";

export default function PageNavigationBar(props) {
  return (
    <ol className="flex flex-row justify-center items-center gap-2">
      <Link href={`${props.url}?page=${parseInt(props.page) - 1}`}>
        <a className="text-white text-xl font-semibold">{"<"}</a>
      </Link>
      {props.page > 3 && (
        <PageNavigationBarButton
          url={props.url}
          page={props.page}
          inc={-3}
          current={false}
        />
      )}
      {props.page > 2 && (
        <PageNavigationBarButton
          url={props.url}
          page={props.page}
          inc={-2}
          current={false}
        />
      )}
      {props.page > 1 && (
        <PageNavigationBarButton
          url={props.url}
          page={props.page}
          inc={-1}
          current={false}
        />
      )}
      <PageNavigationBarButton
        url={props.url}
        page={props.page}
        inc={0}
        current={true}
      />
      <PageNavigationBarButton
        url={props.url}
        page={props.page}
        inc={1}
        current={false}
      />
      <PageNavigationBarButton
        url={props.url}
        page={props.page}
        inc={2}
        current={false}
      />
      <PageNavigationBarButton
        url={props.url}
        page={props.page}
        inc={3}
        current={false}
      />
      {props.page < 4 && (
        <PageNavigationBarButton
          url={props.url}
          page={props.page}
          inc={4}
          current={false}
        />
      )}
      {props.page < 3 && (
        <PageNavigationBarButton
          url={props.url}
          page={props.page}
          inc={5}
          current={false}
        />
      )}
      {props.page < 2 && (
        <PageNavigationBarButton
          url={props.url}
          page={props.page}
          inc={6}
          current={false}
        />
      )}
      <Link href={`${props.url}?page=${parseInt(props.page) + 1}`}>
        <a className="text-white text-xl font-semibold">{">"}</a>
      </Link>
    </ol>
  );
}
