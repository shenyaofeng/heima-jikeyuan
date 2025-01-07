import * as echarts from "echarts";
import { useEffect } from "react";




const Home = () => {
  //保证dom可用
  useEffect(()=>{
    //获取节点
    const chartDom = document.getElementById("main");
    //图标初始化
    const myChart = echarts.init(chartDom);
    //图标参数
    const option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    };

    //使用参数完成渲染
    option && myChart.setOption(option);
  },[])
  return (
    <div>
      <div id="main" style={{width:"500px",height:'400px'}}>

      </div>
    </div>
  );
};

export default Home;
