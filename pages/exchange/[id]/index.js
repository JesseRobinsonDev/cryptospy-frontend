import Layout from "../../../components/layout/Layout";

export default function ExchangePage(props) {
  return <Layout></Layout>;
}

export const getServerSideProps = async (context) => {
  const exchange = context.params.id.toLowerCase();
  const exchangeData = await axios
    .get(`add api link here .__.`)
    .then((response) => {
      return response.data;
    });
  return { props: { exchangeData } };
};
