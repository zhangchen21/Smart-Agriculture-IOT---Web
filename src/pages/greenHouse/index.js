import React, { useEffect, useState } from 'react';
import { Nav, Breadcrumb, Tab, Switch, NumberPicker, Button, Message  } from '@alifd/next';
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/navigation/index";
import Tem from './components/tem';
import Hum from './components/hum';
import Water from './components/water';
import Journal from './components/journal';
import api from '../../api/api'

import './index.scss';

const { Item } = Nav;
const Houses = [
  {
    name: '我的温室1',
    id: 1
  },
  // {
  //   name: '我的温室2',
  //   id: 2
  // },
  // {
  //   name: '我的温室3',
  //   id: 3
  // },
];
const { getIrrigationValue, getTemp, getHum, getWater, sendAutoIrrigationValue, getFanValue, sendAutoFanValue } = api;

const GreenHouse = () => {
  let navigate = useNavigate();
  const [dataList, setDataList] = useState({temp: [], hum: [], water: []});
  const [autoIrrigation, setAutoIrrigation] = useState(false);
  const [autoIrrigationValue, setAutoIrrigationValue] = useState(0);
  const [autoIrrigationLoading, setAutoIrrigationLoading] = useState(false);
  const [autoFan, setAutoFan] = useState(false);
  const [autoFanValue, setAutoFanValue] = useState(0);
  const [autoFanLoading, setAutoFanLoading] = useState(false);

  useEffect(() => {
    getIrrigationValue().then(res => {
      const { irrigationValue } = res;
      setAutoIrrigation(irrigationValue > 0);
      setAutoIrrigationValue(irrigationValue);       
    });
    getFanValue().then(res => {
      const { getFanValue } = res;
      setAutoFan(getFanValue > 0);
      setAutoFanValue(getFanValue);       
    });
    getTemp().then(res => 
      setDataList((oldState) => {return {...oldState, temp: res}})
    );
    getHum().then(res => 
      setDataList((oldState) => {return {...oldState, hum: res}})
    );
    getWater().then(res => 
      setDataList((oldState) => {return {...oldState, water: res}})
    )
  }, []);

  const postAutoIrrigationValue = async (shutFlag = false) => {
    setAutoIrrigationLoading(true);
    sendAutoIrrigationValue(shutFlag ? 0 : autoIrrigationValue).then(() => {
      setAutoIrrigationLoading(false);
      Message.notice(`智慧灌溉${shutFlag ? '已关闭' : '阈值设定成功'}`);
    });
  }

  const postAutoFanValue = async (shutFlag = false) => {
    setAutoFanLoading(true);
    sendAutoFanValue(shutFlag ? 0 : autoFanValue).then(() => {
      setAutoFanLoading(false);
      Message.notice(`智慧控温${shutFlag ? '已关闭' : '阈值设定成功'}`);
    });
  }

  const createAutoBar = (text, state, setState, value, setValue, loading, postValue) => {
    return (
      <div style={{fontSize: '30px', fontWeight: '600'}}>
        <Switch
          size="small"
          onChange={() => {
            if(state) postValue(true);
            setState(!state)
          }}
          style={{ verticalAlign: "middle" }}
          checked={state}
        />
        <span style={{fontSize: '15px', marginLeft: '5px', verticalAlign: "middle"}}>
          {state ? '已开启' : '开启'}{text}
        </span>
        {
          state &&
          <div style={{fontSize: '15px'}}>
            请设定您期望{text}的阈值： 
            <NumberPicker onChange={setValue} alwaysShowTrigger value={value}/>
            <Button 
              type="primary" 
              style={{marginLeft: '5px'}}
              loading={loading}
              onClick={postValue}
            >确定</Button>
          </div>
        }
      </div>
    )
  }

  return (
    <div className="greenHouse">
      <div className="nav">
        <Navigation></Navigation>
      </div>
      <div className="house">
        <div className="sideBar">
          <div className="title">我的温室</div>
          <Nav style={{ width: "200px" }} type='line' defaultSelectedKeys={['1']} >
            {
              Houses.map((house) => (
                <Item icon="chart-pie" key={house.id}>{house.name}</Item>
              ))
            }
          </Nav>
        </div>
        <div className="details">
          <Breadcrumb style={{width: '100%'}}>
            <Breadcrumb.Item onClick={() => navigate('/dashBoard')}>控制台</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => navigate('/greenHouse')}>我的温室</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => navigate('/greenHouse')}>
              我的温室1
            </Breadcrumb.Item>
          </Breadcrumb>
          <div style={{display: 'flex'}}>
            <div className="left">
              <div className="datas">
                <Tab size='medium'>
                  <Tab.Item title="概览数据" key="1">
                    <div className='dataSet'>
                      {
                        Object.keys(dataList).map((key) => 
                          <div className='dataBlock'>
                            <div className="p1">当日最高{key}</div>
                            <div className="data">{dataList[key].sort((a, b) => a.data - b.data).at(-1)?.data}</div>
                            <div className="p2">最低 {dataList[key].sort((a, b) => a.data - b.data)[0]?.data}</div>
                          </div>
                        )
                      }                  
                    </div>
                    <div className='ps'>注：概览页中数据统计时间仅为当日数据</div>
                  </Tab.Item>
                  <Tab.Item title="资源统计" key="2">
                    暂无数据
                  </Tab.Item>
                </Tab>            
              </div>
              <div className="content">
                <h2>今日温度数据</h2>
                {createAutoBar('智慧控温', autoFan, setAutoFan, autoFanValue, setAutoFanValue, autoFanLoading, setAutoFanLoading, postAutoFanValue)}
                <div className='temHum' style={{marginTop: '15px'}}>
                  <Tem data={dataList.temp} title={'当前温度'}></Tem>
                  <Water data={dataList.temp} id={'tempLineChart'} title={'今日温度变化'}></Water>
                </div>
                <h2>今日湿度数据</h2>
                <div className='temHum'>
                  <Hum data={dataList.hum} title={'当前湿度'}></Hum>
                  <Water data={dataList.temp} id={'humLineChart'} title={'今日湿度变化'}></Water>
                </div>                             
                <div className='water'>
                  <h2> 今日水位数据</h2>
                  {createAutoBar('智慧灌溉', autoIrrigation, setAutoIrrigation, autoIrrigationValue, setAutoIrrigationValue, autoIrrigationLoading, setAutoIrrigationLoading, postAutoIrrigationValue)}
                  <div style={{height: '15px'}}/> 
                  <Water 
                    data={dataList.water} 
                    id={'waterLineChart'} 
                    isArea={true} 
                    title={'今日水位线变化图'}
                  ></Water>
                </div>        
              </div>            
            </div>
            <div className="right">
              <Journal />
            </div>            
          </div>
        </div>        
      </div>
    </div>
  );
};

export default GreenHouse;