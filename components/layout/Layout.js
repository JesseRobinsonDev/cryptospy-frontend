import Head from "next/head";
import Header from "./Header";

export default function Layout(props) {
  return (
    <main>
      <Head>
        <title>{props.title}</title>
        {props.description != undefined && (
          <meta name="description" content={props.description} />
        )}
      </Head>
      <div className="flex flex-col h-screen">
        <div>{props.header == undefined && <Header />}</div>
        <section className="flex flex-grow bg-neutral-900">
          {props.children}
        </section>
      </div>
    </main>
  );
}
