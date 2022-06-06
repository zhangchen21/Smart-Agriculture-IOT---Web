import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactECharts from 'echarts-for-react';
import { Icon } from '@alifd/next';
import Navigation from "../../components/navigation/index";

import './index.scss';

function Portal() {
  let navigate = useNavigate();
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}%"
    },
    series: [
      {
        name: '预期',
        type: 'funnel',
        left: '10%',
        width: '80%',
        label: {
          normal: {
            formatter: '{b}'
          },
          emphasis: {
            position:'inside',
            formatter: '{b}'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            opacity: 1
          }
        },
        data: [
          {value: 60, name: 'IOT'},
          {value: 40, name: 'Web App'},
          {value: 20, name: '目标检测'},
          {value: 80, name: '温室管理'},
          {value: 100, name: '智慧农业'}
        ]
      },
      {
        name: '实际',
        type: 'funnel',
        left: '10%',
        width: '80%',
        maxSize: '80%',
        label: {
          normal: {
            position: 'inside',
            formatter: '{c}%',
            textStyle: {
              color: '#fff'
            }
          },
          emphasis: {
            position:'inside',
            formatter: '{b}'
          }
        },
        itemStyle: {
          normal: {
            opacity: 0.5,
            borderColor: '#fff',
            borderWidth: 2
          }
        },
        data: [
          {value: 30, name: 'IOT'},
          {value: 10, name: 'Web App'},
          {value: 5, name: '目标检测'},
          {value: 50, name: '温室管理'},
          {value: 80, name: '智慧农业'}
        ]
      }
    ]
  };
  const instance = useRef(null);

  return (
    <div className="portal">
      <div className="nav">
        <Navigation></Navigation>
      </div>
      <div className="content">
        <div className="leftBox">
          <p>
            智慧农业温室 IOT 系统
          </p>
          <div className="info">
            一个现代的 IOT 智慧农业 Web 管理系统
          </div>
          <div className="btns">
            <div className="btn" onClick={() => navigate('/dashBoard')}>
              快速开始<Icon type="arrow-right" />
            </div>     
            <div className="btn" onClick={() => navigate('/')} style={{backgroundColor: 'white', color: '#F72C5B', border: '1px #F72C5B solid'}}>
              查看介绍<Icon type="arrow-right" />
            </div>     
          </div>
        </div>
        <>
          <ReactECharts
            ref={instance}
            option={option}
            style={{ height: '65vh', width: '50vw' }}
          />
        </>        
      </div>
      <div className="msg">
        <span><Icon type="sorting" />致力于构建现代端到端的<span style={{color: '#5E7AD9', fontWeight: 'bold'}}> 智慧农业 </span>生产工具</span>
      </div>
    </div>
  );
}

export default Portal;