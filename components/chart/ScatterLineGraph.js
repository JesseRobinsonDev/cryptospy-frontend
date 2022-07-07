import dynamic from "next/dynamic";

const Plot = dynamic(import("react-plotly.js"), {
  ssr: false,
});

export default function ScatterLineGraph(props) {
  return (
    <Plot
      data={[
        {
          x: props.x,
          y: props.y,
          type: "scatter",
          mode: "lines",
          marker: { color: props.color },
          text: props.y,
        },
      ]}
      layout={{
        height: props.height,
        plot_bgcolor: "rgba(0, 0, 0, 0)",
        paper_bgcolor: "rgba(0, 0, 0, 0)",
        xaxis: {
          showgrid: props.xShowGrid != undefined ? props.xShowGrid : false,
          zeroline: props.xZeroLine != undefined ? props.xZeroLine : false,
          visible: props.xVisible != undefined ? props.xVisible : false,
        },
        yaxis: {
          showgrid: props.yShowGrid != undefined ? props.yShowGrid : false,
          zeroline: props.yZeroLine != undefined ? props.yZeroLine : false,
          visible: props.yVisible != undefined ? props.yVisible : false,
          color: "rgba(180, 180, 180, 1)",
          linecolor: "rgba(60, 60, 60, 1)",
          gridcolor: "rgba(40, 40, 40, 1)",
        },
        margin: {
          l: props.lMargin != undefined ? props.lMargin : 0,
          r: props.rMargin != undefined ? props.rMargin : 0,
          t: props.tMargin != undefined ? props.tMargin : 0,
          b: props.bMargin != undefined ? props.bMargin : 0,
        },
        autosize: true,
      }}
      useResizeHandler={true}
      style={{ width: "100%" }}
      config={{ staticPlot: true }}
    />
  );
}
