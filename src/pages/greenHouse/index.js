import React from 'react';
import { Nav, Breadcrumb } from '@alifd/next';
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/navigation/index";
import Tem from './components/tem';
import Tem1 from './components/tem1';
import Tem2 from './components/tem2';
import Tem3 from './components/tem3';

import './index.scss';

const { Item } = Nav;
const Houses = [
  {
    name: '我的温室1',
    id: 1
  },
  {
    name: '我的温室2',
    id: 2
  },
  {
    name: '我的温室3',
    id: 3
  },
]

const GreenHouse = () => {
  let navigate = useNavigate();
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
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => navigate('/dashBoard')}>控制台</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => navigate('/greenHouse')}>我的温室</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => navigate('/greenHouse')}>
              我的温室1
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className='tem'><Tem></Tem></div>
          <div className='tem1'><Tem1></Tem1></div>        
          <div className='tem2'><Tem2></Tem2></div>        
          <div className='tem3'><Tem3></Tem3></div>        
        </div>        
      </div>
    </div>
  );
};

export default GreenHouse;