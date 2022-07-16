import React, { useEffect, useState } from 'react';
import { Nav, Breadcrumb, Tab, Timeline, Switch, NumberPicker, Button, Message  } from '@alifd/next';
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/navigation/index";
import Tem from './components/tem';
// import Tem1 from './components/tem1';
import Hum from './components/hum';
import Water from './components/water';
import axios from 'axios';
import { Serve } from '../../constant';
import moment from 'moment';

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
const TimelineItem = Timeline.Item;

const GreenHouse = () => {
  let navigate = useNavigate();
  const [dataList, setDataList] = useState({temp: [], hum: [], water: []});
  const [autoIrrigation, setAutoIrrigation] = useState(false);
  const [autoIrrigationValue, setAutoIrrigationValue] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios({
      url:`${Serve}/getIrrigationValue`,
      method:'get',
    }).then(
      (res) => {
        const { irrigationValue } = res.data;
        setAutoIrrigation(true);
        setAutoIrrigationValue(irrigationValue);
      }
    );
    axios({
      url:`${Serve}/getTemp`,
      method:'get',
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

  const postAutoIrrigationValue = async () => {
    setLoading(true);
    await axios({
      url:`${Serve}/setAutoIrrigationValue`,
      method:'get',
      params: {
        autoIrrigationValue
      }
    }).then(
      () => setLoading(false)
    );
    Message.notice("自动灌溉阈值设定成功");
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
                <h2>今日温湿度数据</h2>
                <div className="temHum">
                  <div className='tem'>
                    <Tem data={dataList.temp} title={'当前温度'}></Tem>
                    <Water data={dataList.temp} id={'tempLineChart'} title={'今日温度变化'}></Water>
                  </div>
                  <div className='tem'>
                    <Hum data={dataList.hum} title={'当前湿度'}></Hum>
                    <Water data={dataList.temp} id={'humLineChart'} title={'今日湿度变化'}></Water>
                  </div>                             
                </div>
                {/* <div className='tem1'><Tem1></Tem1></div>         */}
                <div className='water'>
                  <h2> 今日水位数据</h2>
                  <Switch
                    size="small"
                    onChange={() => setAutoIrrigation(!autoIrrigation)}
                    style={{ verticalAlign: "middle" }}
                    checked={autoIrrigation}
                  />
                  <span style={{fontSize: '15px', marginLeft: '5px', verticalAlign: "middle"}}>
                    {autoIrrigation ? '已开启' : '开启'}自动灌溉
                  </span>
                  {
                    autoIrrigation &&
                    <div style={{fontSize: '15px'}}>
                      请设定您期望自动灌溉的阈值： 
                      <NumberPicker onChange={setAutoIrrigationValue} alwaysShowTrigger value={autoIrrigationValue}/>
                      <Button 
                        type="primary" 
                        style={{marginLeft: '5px'}}
                        loading={loading}
                        onClick={postAutoIrrigationValue}
                      >确定</Button>
                    </div>
                  }       
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
              <div className='title'> 温室日志</div>
                <Timeline>
                  <TimelineItem
                    title="温室上线"
                    content="[Xi'an] 温室上线"
                    time={"2022-07-07 10:30:00"}
                    state="success"
                  />
                  <TimelineItem
                    title="温湿度传感器上线"
                    content="[Xi'an] 温湿度传感器上线"
                    time={"2022-07-07 10:30:00"}
                    state="success"
                  />
                  <TimelineItem
                    title="水泵控制系统上线"
                    content="[Xi'an] 水泵控制系统上线"
                    time={"2022-07-07 10:30:00"}
                    state="success"
                  />
                  <TimelineItem
                    title="正常运行"
                    content="[Xi'an] 温室正常运行，温湿度传感器正常，水泵控制系统正常，无报警"
                    time={moment().format('YYYY-MM-DD HH:mm:ss')}
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