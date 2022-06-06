import React, { useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const DeviceChart = () => {
  const option = {
    tooltip: {},
    legend: {
      data: ['可选数量', '实际数量']
    },
    radar: {
      // shape: 'circle',
      indicator: [
          { name: '摄像头', max: 20},
          { name: '温度传感', max: 40},
          { name: '湿度传感', max: 40},
          { name: '水泵', max: 5},
          { name: '电表', max: 20},
          { name: '水表', max: 20}
      ]
    },
    series: [{
      name: '预算 vs 开销',
      type: 'radar',
      // areaStyle: {normal: {}},
      data : [
        {
          value : [10, 10, 10, 3, 10, 10],
          name : '可选数量'
        },
          {
          value : [1, 4, 3, 1, 1, 2],
          name : '实际数量'
        }
      ]
    }]
  };

  let timer;

  useEffect(() => {
    return () => clearTimeout(timer);
  });

  const loadingOption = {
    text: '加载中...',
    color: '#4413c2',
    textColor: '#270240',
    // maskColor: 'rgba(194, 88, 86, 0.3)',
    zlevel: 0
  };

  function onChartReady(echarts) {
    timer = setTimeout(function() {
      echarts.hideLoading();
    }, 1000);
  }

  return <ReactECharts
    option={option}
    style={{ height: 400 }}
    onChartReady={onChartReady}
    loadingOption={loadingOption}
    showLoading={true}
  />;
};

export default DeviceChart;