import React, { useEffect, useMemo, useState } from 'react';
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

const Tem = (props) => {
  const data = props.data;
  const [myChart, setMyChart] = useState(null);

  var option = useMemo(() => {
    return {
    title: {
      text: props.title,
      textStyle: {
        fontWeight: 'normal'
      }
    },
    series: [
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: -20,
        max: 60,
        splitNumber: 8,
        itemStyle: {
          color: '#FFAB91'
        },
        progress: {
          show: true,
          width: 30
        },
        pointer: {
          show: false
        },
        axisLine: {
          lineStyle: {
            width: 30
          }
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 3,
            color: '#999'
          }
        },
        axisLabel: {
          distance: -20,
          color: '#999',
          fontSize: 15
        },
        anchor: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          width: '60%',
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, '-15%'],
          fontSize: 25,
          fontWeight: 'bolder',
          formatter: '{value} °C',
          color: 'auto'
        },
        data: [
          {
            value: data.length ? data.at(-1).data : 0
          }
        ]
      },
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: -20,
        max: 60,
        itemStyle: {
          color: '#FD7347'
        },
        progress: {
          show: true,
          width: 8
        },
        pointer: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        detail: {
          show: false
        },
        data: [
          {
            value: data.length ? data.at(-1).data : 0
          }
        ]
      }
    ]
  }}, [data, props?.title]);

  useEffect(() => {
    echarts.use([GaugeChart, CanvasRenderer]);
    var chartDom = document.getElementById('main');
    setMyChart(echarts.init(chartDom));
    return(() => myChart?.dispose())
  }, [myChart])

  useEffect(() => {
    myChart?.setOption(option); 
  }, [myChart, option])

  return (
    <div id='main' style={{width: 400, height: 300}}>
    </div>
  );
};

export default React.memo(Tem);
