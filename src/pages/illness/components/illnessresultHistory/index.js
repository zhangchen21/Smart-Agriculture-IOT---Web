import React, {memo, useEffect, useState} from 'react';
import { List, Box, Button, Divider, Dialog, Progress, Icon } from '@alifd/next';
import PieChart from './components/PieChart/index';
import api from '../../../../api/api';
import { Serve } from '../../../../constant'
import './index.scss'

const { getPredictionHistory } = api;

export const IllnessresultHistory = memo((props) => {
  const [data, setData] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [percent, setPercent] = useState(0);
  const opentimer = () => {
    setDialog(true);
    var timer = setInterval(() => {
      setPercent(old => old + 20)
    }, 1000)
    setTimeout(() => {
      clearInterval(timer)
    }, 5000)
  }
  const stoptimer = () => {
    setDialog(false);
    setPercent(0);
  }

  useEffect(() => {
    getPredictionHistory('getIllnessHistory').then(res => {
      setData(res.reverse());
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
        <PieChart data={data} id={'illnessPieChart'} title={'病害识别结果统计'} />
      </div>
      <div className="list">
        <h2>历史识别数据</h2>
        <List
          dataSource={data}
          size={'medium'}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              extra={actions}
              media={<img width="161" height="108" src={`${Serve}/attachment/${item.picName}`} alt='上传图片'/>}
              title={`${item.chineseName}( ${item.illnessName})`}
            >
              <p style={{ margin: "12px 0" }}>{item.description}</p>
              <div>{item.picName}</div>
            </List.Item>
          )}
        />          
      </div>
      <Dialog
            v2
            title="正在进行智能匹配营养液喷洒"
            visible={dialog}
            onOk={stoptimer}
            onClose={stoptimer}
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
          >
            <p>已为您开启智能匹配营养液喷洒，喷洒将在大约5秒后自动关闭</p>
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