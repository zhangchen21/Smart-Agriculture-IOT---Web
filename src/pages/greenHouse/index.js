import React, { useCallback, useEffect, useState, useMemo } from 'react';
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
    id: 1,
    isSigned: true
  },
  {
    name: '我的温室2',
    id: 2,
    isSigned: false
  },
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

  const getData = useCallback(() => {
    getTemp().then(res => 
      setDataList((oldState) => {return {...oldState, temp: res}})
    );
    getHum().then(res => 
      setDataList((oldState) => {return {...oldState, hum: res}})
    );
    getWater().then(res => 
      setDataList((oldState) => {return {...oldState, water: res}})
    )
  }, [setDataList])

  useEffect(() => {
    getIrrigationValue().then(res => {
      const { irrigationValue } = res;
      if(irrigationValue > 0) {
        setAutoIrrigation(true);
        setAutoIrrigationValue(irrigationValue);       
      }
    });
    getFanValue().then(res => {
      const { fanValue } = res;
      if(fanValue > 0) {
        setAutoFan(true);
        setAutoFanValue(fanValue);        
      }
    });
    getData();

    const timer = setInterval(() => {
      getData();
    }, 1000)

    return () => clearInterval(timer)
  }, [getData]);

  const postAutoIrrigationValue = async (shutFlag = false) => {
    setAutoIrrigationLoading(true);
    sendAutoIrrigationValue(shutFlag ? 0 : autoIrrigationValue).then(() => {
      setAutoIrrigationLoading(false);
      Message.notice(`智慧灌溉${shutFlag ? '已关闭' : '阈值设定成功'}`);
    });
  }

  const postAutoFanValue = async (shutFlag) => {
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
          disabled={loading}
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
              onClick={() => {
                postValue(value ? false : true);
                value || setState(false)
              }}
            >确定</Button>
          </div>
        }
      </div>
    )
  }

  const cloneList = useMemo(() => JSON.parse(JSON.stringify(dataList)), [dataList]);

  return (
    <div className="greenHouse">
      <div className="nav">
        <Navigation></Navigation>
      </div>
      <div className="house">
        <div className="sideBar">
          <div className="title">我的温室</div>
          <Nav type='line' defaultSelectedKeys={['1']} >
            {
              Houses.map((house) => (
                <Item icon="chart-pie" key={house.id} disabled={!house.isSigned}>{house.name}</Item>
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
                        Object.keys(cloneList).map((key) => 
                          <div className='dataBlock'>
                            <div className="p1">当日最高{key}</div>
                            <div className="data">{cloneList[key].sort((a, b) => a.data - b.data).at(-1)?.data}</div>
                            <div className="p2">最低 {cloneList[key].sort((a, b) => a.data - b.data)[0]?.data}</div>
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
                {createAutoBar('智慧控温', autoFan, setAutoFan, autoFanValue, setAutoFanValue, autoFanLoading, postAutoFanValue)}
                <div className='temHum' style={{marginTop: '15px'}}>
                  <Tem data={dataList.temp} title={'当前温度'}></Tem>
                  <div className='LineChart'><Water data={dataList.temp} id={'tempLineChart'} title={'今日温度变化'}></Water></div>
                </div>
                <h2>今日湿度数据</h2>
                <Switch
                  size="small"
                  style={{ verticalAlign: "middle" }}
                  disabled
                />
                <span style={{fontSize: '15px', marginLeft: '5px', verticalAlign: "middle"}}>
                  开启湿度控制
                </span>
                <div className='temHum'>
                  <Hum data={dataList.hum} title={'当前湿度'}></Hum>
                  <div className='LineChart'><Water data={dataList.hum} id={'humLineChart'} title={'今日湿度变化'}></Water></div>
                </div>                             
                <div className='water'>
                  <h2> 今日水位数据</h2>
                  {createAutoBar('智慧灌溉', autoIrrigation, setAutoIrrigation, autoIrrigationValue, setAutoIrrigationValue, autoIrrigationLoading, postAutoIrrigationValue)}
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