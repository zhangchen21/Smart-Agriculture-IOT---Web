import React, {useState} from "react";
import Navigation from "../../components/navigation/index";
import { Nav } from '@alifd/next';
import { Outlet, useNavigate } from "react-router-dom";

import './index.scss';

const { Item } = Nav;
const navItems = [
  {
    name: '害虫识别',
    id: 1,
    path: '/predictionArea',
  },
  {
    name: '害虫预测统计',
    id: 2,
    path: '/resultHistory',
  },
];

function Prediction() {
    let navigate = useNavigate();
    const [page, setPage] = useState('/predictionArea');
    page !== window.location.href.split('/').at(4) && setPage(window.location.href.split('/').at(4));

    return (
        <div className="pridiction">
            <div className="nav">
                <Navigation></Navigation>
            </div>
            <div className="body">
                <div className="sideBar">
                    <div className="title">害虫识别与统计</div>
                    <Nav type='line' defaultSelectedKeys={[page || 'predictionArea']}>
                        {
                        navItems.map((navItem) => (
                            <Item
                                icon="chart-pie"
                                key={navItem.path.split('/')[1]}
                                onClick={() => navigate(`/prediction${navItem.path}`)}
                            >
                                {navItem.name}
                            </Item>
                        ))
                        }
                    </Nav>
                </div>
                <div className='details'><Outlet /></div>       
            </div>
        </div>
    )
  }

export default Prediction;