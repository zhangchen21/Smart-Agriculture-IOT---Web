import React from "react";
import { Avatar, Progress, Icon } from '@alifd/next';
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
      photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAoyHttAX5eceiW6iPae99CGiWxADx5OsEw&usqp=CAU',
      isSigned: true
    }
  ]
  const greenHouseNum = 1;

  return (
    <div className="dashBoard">
      <div className="nav">
          <Navigation></Navigation>
      </div>
      <div className="head">
        <Avatar size={94} src="https://img.alicdn.com/tfs/TB1QS.4l4z1gK0jSZSgXXavwpXa-1024-1024.png" />
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
                onClick={() => navigate('/greenHouse')}
                >
                <img src={area.photoUrl} alt="" />
                <div className="areaInfo">
                  <div className="name">{area.name}</div>
                  <div className="address">地址:{area.address}</div>
                </div>
                <div className="status">
                  <Icon type="success" style={{ color: "#1DC11D", marginRight: "10px" }} />
                  在线
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