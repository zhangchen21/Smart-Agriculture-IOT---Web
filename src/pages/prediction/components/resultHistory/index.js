import React, {memo, useEffect, useState} from 'react';
import { List, Box, Button, Divider, Dialog, Progress, Icon } from '@alifd/next';
import PieChart from './components/PieChart/index';
import api from '../../../../api/api';
import { Serve } from '../../../../constant'

import './index.scss'

const { getPredictionHistory } = api;

const mockdata = [
  {
    title: "这是Mock数据，接口未返回信息时显示",
    description:
      "随着互联网行业的聚变式发展，在电商业务从“信息透出” 到 “在线交易” 的过程中，网站 UI 构建也经历了“体验一致性”、“设计效率”、“UI系统构建/应用效率”、“多端适配” …",
    author: "谢瑶 3 小时前更新",
    img: "https://img.alicdn.com/tfs/TB1R5fio4v1gK0jSZFFXXb0sXXa-322-216.png"
  },
  {
    title: "这是Mock数据，接口未返回信息时显示",
    description:
      "随着互联网行业的聚变式发展，在电商业务从“信息透出” 到 “在线交易” 的过程中，网站 UI 构建也经历了“体验一致性”、“设计效率”、“UI系统构建/应用效率”、“多端适配” …",
    author: "谢瑶 3 小时前更新",
    img: "https://img.alicdn.com/tfs/TB1R5fio4v1gK0jSZFFXXb0sXXa-322-216.png"
  },
];

export const ResultHistory = memo((props) => {
  const [data, setData] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [percent, setPercent] = useState(0);
  var timer = null;
  const opentimer = () => {
    setDialog(true);
    timer = setInterval(() => {
      setPercent(old => percent < 100 ? old + 10 : old)
    }, 800)
  }
  const stoptimer = () => {console.log(timer);setDialog(false); setPercent(0); clearInterval(timer)}

  useEffect(() => {
    getPredictionHistory().then(res => {
      setData(res);
    })}, [])

  const textRender = percent => {
    if (percent > 100) {
      return <Icon type="select" size="medium" />;
    }
    return `${percent}%`;
  };

  const actions = (
    <Box
      direction="row"
      align="center"
      style={{ whiteSpace: "nowrap", height: "100%", paddingLeft: 100 }}
    >
      <Button text type="primary" onClick={opentimer}>
        紧急
      </Button>
      <Divider direction="ver" />
      <Button text type="primary">
        待办
      </Button>
      <Divider direction="ver" />
      <Button text type="primary">
        安全
      </Button>
    </Box>
  );

  return (
    <div className="resultHistory">
      <div className="Statistics">
        <PieChart data={data} id={'bugPieChart'} title={'害虫识别结果统计'} />
      </div>
      <div className="list">
        <h2>历史识别数据</h2>
        <List
          dataSource={data.reverse() || mockdata}
          size={'medium'}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              extra={actions}
              media={<img width="161" height="108" src={`${Serve}/attachment/${item.picName}`} alt='上传图片'/>}
              title={`${item.chineseName}( ${item.pestName})`}
            >
              <p style={{ margin: "12px 0" }}>{item.description}</p>
              <div>{item.picName}</div>
            </List.Item>
          )}
        />          
      </div>
      <Dialog
            v2
            title="正在进行智能匹配农药喷洒"
            visible={dialog}
            onOk={stoptimer}
            onClose={() => {setDialog(false); setPercent(0); clearInterval(timer)}}
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
          >
            <p>已开启智能匹配农药喷洒，以下为喷洒进度</p>
            <Progress
              percent={percent > 100 ? 100 : percent}
              textRender={textRender}
              shape="circle"
              color={`hsl(${percent * 6 + 60}, 90%, 50%)`}
            />
      </Dialog>
    </div> 
  )
})