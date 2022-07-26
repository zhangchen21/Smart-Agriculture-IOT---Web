import React, { useState } from "react";
import { Nav } from '@alifd/next';
import { useNavigate } from "react-router-dom";
import './index.scss'

const { Item } = Nav;

function Navigation() {
    let navigate = useNavigate();
    const [page, setPage] = useState('portal');
    const header = <span 
        className="fusion" 
        style={{color: 'black'}}
    >智慧农业温室 IOT 系统</span>;
    // 根据 url 设置 defaultSelectedKeys
    page !== window.location.href.split('/').at(3) && setPage(window.location.href.split('/').at(3));
    return (
        <div className="header">
            <Nav
                className="basic-nav"
                direction="hoz"
                type="line"
                header={header}
                defaultSelectedKeys={[page]}
                triggerType="hover"
                activeDirection={null}
                >
                <Item key="portal" onClick={() => navigate('/portal')}>首页</Item>
                <Item key="dashBoard" onClick={() => navigate('/dashBoard')}>控制台</Item>
                <Item key="prediction" onClick={() => navigate('/prediction')}>虫害识别</Item>
                <Item key="illness" onClick={() => navigate('/illness')}>作物病态识别</Item>
                <Item key="greenHouse" onClick={() => navigate('/greenHouse')}>我的温室</Item>
            </Nav>            
        </div>
    )
  }

export default Navigation;