import React, {useEffect} from 'react';
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import moment from 'moment';

const Water = (props) => {
  const { data, id, isArea = false, title } = props;

  var option = {
    title: {
      text: title,
      textStyle: {
        fontWeight: 'normal'
      }
    },
    xAxis: {
      type: 'category',
      data: data.map((el) => {return moment(el.time).format('HH:mm:ss')})
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data.map((el) => {return el.data}),
        type: 'line',
        smooth: true,
        label: {
          show: true,
          position: 'top'
        },
      }
    ],
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
  };

  isArea && option.series.forEach((el) => el.areaStyle = {});

  useEffect(() => {
    echarts.use([GaugeChart, CanvasRenderer]);
    var chartDom = document.getElementById(id);
    var myChart = echarts.init(chartDom);
    myChart.setOption(option); 
    return(() => myChart.dispose())
    // eslint-disable-next-line 
  })

  return (
    <div id={id} style={{width: '100%', height: 300}}>
    </div>
  );
};

export default React.memo(Water);





