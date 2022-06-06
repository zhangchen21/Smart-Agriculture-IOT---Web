import React, {useEffect} from 'react';
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

const Tem3 = () => {
  var option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  };

  useEffect(() => {
    echarts.use([GaugeChart, CanvasRenderer]);
    var chartDom = document.getElementById('main3');
    var myChart = echarts.init(chartDom);
    myChart.setOption(option); 
    // eslint-disable-next-line 
  }, [])

  return (
    <div id='main3' style={{width: 550, height: 300}}>
    </div>
  );
};

export default Tem3;





