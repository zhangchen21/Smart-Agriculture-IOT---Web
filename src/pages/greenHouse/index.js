import React, {useEffect} from 'react';
import { Nav, Breadcrumb, Tab, Timeline  } from '@alifd/next';
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/navigation/index";
import Tem from './components/tem';
// import Tem1 from './components/tem1';
import Hum from './components/hum';
import Water from './components/water';
import axios from 'axios';
import { Serve } from '../../constant';

import './index.scss';
import { useState } from 'react';

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
const TimelineItem = Timeline.Item;

const GreenHouse = () => {
  let navigate = useNavigate();
  const [dataList, setDataList] = useState({temp: [], hum: [], water: []})

  useEffect(() => {
    axios({
      url:`${Serve}/getTemp`,
      method:'get'
    }).then(
      res => setDataList((oldState) => {return {...oldState, temp: res.data}})
    );
    axios({
      url:`${Serve}/getHum`,
      method:'get'
    }).then(
        res => setDataList((oldState) => {return {...oldState, hum: res.data}})
    );
    axios({
      url:`${Serve}/getWater`,
      method:'get'
    }).then(
      res => setDataList((oldState) => {return {...oldState, water: res.data}})
    )
  }, []);

  console.log(dataList['temp'].sort((a, b) => a.data - b.data))

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
                <h2>今日详细数据</h2>
                <div className="temHum">
                  <div className='tem'>
                    <div className="title">当前温度</div>
                    <Tem data={dataList.temp}></Tem>
                  </div>
                  <div className='tem'>
                    <div className='title'> 当前湿度</div>
                    <Hum data={dataList.hum}></Hum>
                  </div>                             
                </div>
                {/* <div className='tem1'><Tem1></Tem1></div>         */}
                <div className='water'>
                  <div className='title'> 今日水位变化</div>
                  <Water data={dataList.water}></Water>
                </div>        
              </div>            
            </div>
            <div className="right">
              <div className='title'> 温室日志</div>
                <Timeline>
                  <TimelineItem
                    title="上线"
                    content="[Xi'an] 温室上线"
                    time={"2022-07-07 10:30:00"}
                    state="success"
                  />
                  <TimelineItem
                    title="上线"
                    content="[Xi'an] 温湿度传感器上线"
                    time={"2022-07-07 10:30:00"}
                    state="success"
                  />
                  <TimelineItem
                    title="上线"
                    content="[Xi'an] 水泵控制系统上线"
                    time={"2022-07-07 10:30:00"}
                    state="success"
                  />
                  <TimelineItem
                    title="运行"
                    content="[Xi'an] 温室正常运行，温湿度传感器正常，水泵控制系统正常，无报警"
                    time={"2022-07-07 10:30:00"}
                    state="success"
                  />
                  <TimelineItem
                    title="运行"
                    content="[Xi'an City] 温室正常运行，温湿度传感器正常，水泵控制系统正常，无报警"
                    time={"2022-07-07 10:30:00"}
                    state="success"
                  />
                  <TimelineItem
                    title="运行"
                    content="[Xi'an City] 温室正常运行，温湿度传感器正常，水泵控制系统正常，无报警"
                    time={"2022-07-07 10:30:00"}
                    state="process"
                  />
                </Timeline> 
              </div>            
            </div>
        </div>        
      </div>
    </div>
  );
};

export default GreenHouse;