import React, {useEffect} from 'react';
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

const PieChart = (props) => {
  const { data, id, title } = props;
  let series = new Map();
  data.forEach((el) => {
    if(series.has(el)) series.set(el, series.get(el) + 1);
    else series.set(el, 1);
  })

  var option = {
    title: {
      text: title,
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      top: 'bottom',
      data: Array.from(new Set(data))
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Area Mode',
        type: 'pie',
        radius: [20, 140],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data: 
          Array.from(new Set(data)).map((el) => {
            return {
              value: series.get(el),
              name: el
            }
          })
      }
    ]
  };

  useEffect(() => {
    echarts.use([GaugeChart, CanvasRenderer]);
    var chartDom = document.getElementById(id);
    var myChart = echarts.init(chartDom);
    myChart.setOption(option); 
    return(() => myChart.dispose())
    // eslint-disable-next-line 
  })

  return (
    <div id={id} style={{width: '70%', height: 400}}>
    </div>
  );
};

export default React.memo(PieChart);





