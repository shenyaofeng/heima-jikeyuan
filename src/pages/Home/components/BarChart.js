import * as echarts from "echarts";
import { useEffect, useRef } from "react";
const BarChart = ({ title }) => {
  const chartRef = useRef();
  //保证dom可用
  useEffect(() => {
    //获取节点
    const chartDom = chartRef.current;
    //图标初始化
    const myChart = echarts.init(chartDom);
    //图标参数
    const option = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: ["Vue", "React", "Angular"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [10, 40, 70],
          type: "bar",
        },
      ],
    };
    //使用参数完成渲染
    option && myChart.setOption(option);
  }, [title]);
  return (
    <div>
      <div ref={chartRef} style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export default BarChart;
