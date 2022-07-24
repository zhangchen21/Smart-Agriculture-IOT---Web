import React from "react";
import { Avatar, Progress, Icon, Message } from '@alifd/next';
import Navigation from "../../components/navigation/index";
import DeviceChart  from "./components/deviceChart";
import { useNavigate } from "react-router-dom";
import './index.scss';
import moment from "moment";

function DashBoard() {
  let navigate = useNavigate();
  const areas = [
    {
      name: '我的温室1',
      address: '西安交通大学创新港',
      photoUrl: 'https://img2.baidu.com/it/u=22876370,3173813154&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      isSigned: true
    },
    {
      name: '测试温室',
      address: '测试地点***',
      photoUrl: 'https://img1.baidu.com/it/u=1999542200,2877663993&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      isSigned: false
    },
  ]
  const greenHouseNum = areas.length;

  return (
    <div className="dashBoard">
      <div className="nav">
          <Navigation></Navigation>
      </div>
      <div className="head">
        <Avatar size={94} src="https://img2.baidu.com/it/u=2331153596,856026569&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" />
        <div className="helloText">
          <h1>欢迎来到您的 IOT 系统控制台</h1>
          <h2>这是您在本系统度过的第 {moment().diff(moment('2022/07/06'),'days')} 天</h2>
        </div>
      </div>
      <div className="content">
        <div className="infos">
          <div className="infoTitle">我的设备</div>
          <div className="houseInfo">
            <span>已注册的温室数目</span>: {greenHouseNum}
            <Progress percent={greenHouseNum / 10 * 100} size="large"/>
          </div>
          <div className="deviceInfo">
            <span>已注册的设备统计</span>:
            <div className="chart"><DeviceChart /></div>            
          </div>
        </div>
        <div className="areas">
          <div className="areaTitle">我的温室</div>
          {
            areas.map((area) => (
              <div
                className="area"
                onClick={() => {
                  if(area.isSigned) navigate('/greenHouse')
                  else Message.notice("未检测到该温室上线！");
                }}
                >
                <img src={area.photoUrl} alt="" />
                <div className="areaInfo">
                  <div className="name">{area.name}</div>
                  <div className="address">地址:{area.address}</div>
                </div>
                <div className="status">
                  <Icon type={area.isSigned ? 'success' : 'error'} style={{ color: `${area.isSigned ? '#1DC11D' : 'red'}`, marginRight: "10px" }} />
                  {area.isSigned ? '在线' : '离线'}
                </div>
              </div>  
            ))
          }
        </div>
      </div>
    </div>
  );
}


export default DashBoard;