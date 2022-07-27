import React, {useEffect, useMemo, useState} from 'react';
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import moment from 'moment';

const Water = (props) => {
  const { data, id, isArea = false, title } = props;
  if(data.length > 12) data.splice(0, data.length - 12);
  const [myChart, setMyChart] = useState(null);
  const timeData = data.map(el => moment(el.time).format('HH:mm:ss'));
  const valueData = data.map(el => Number(el.data));

  var option = useMemo(() => {
    return {
    title: {
      text: title,
      textStyle: {
        fontWeight: 'normal'
      }
    },
    xAxis: {
      type: 'category',
      data: timeData
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: valueData,
        type: 'line',
        smooth: true,
        label: {
          show: false,
          position: 'top'
        },
      }
    ],
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
  }}, [timeData, valueData, title]);

  isArea && option.series.forEach((el) => el.areaStyle = {});

  useEffect(() => {
    echarts.use([GaugeChart, CanvasRenderer]);
    var chartDom = document.getElementById(id);
    setMyChart(echarts.init(chartDom));
    return(() => myChart?.dispose())
  }, [id, myChart])

  useEffect(() => {
    myChart?.setOption(option); 
  }, [myChart, option])

  return (
    <div id={id} style={{width: '100%', height: 300}}>
    </div>
  );
};

export default React.memo(Water);





