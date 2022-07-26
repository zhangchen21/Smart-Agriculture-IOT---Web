import React, {memo} from 'react';
import { List, Box, Button, Divider } from '@alifd/next';
import PieChart from './components/PieChart/index';

import './index.scss'

const mockdata = [
  {
    title: "缺钾",
    description:
      "钾元素对于植物生长很关键,如果缺少钾肥的话,会导致植物的老叶叶缘处开始发黄,但是叶子中间位置和叶脉部分仍然是绿色的,底下的根系很少,也比较的短,所以植物容易发生倒伏,果实生长不良,看起来不健康,上面的颜色也不均匀",
    author: "1 分钟前更新",
    img: "https://img0.baidu.com/it/u=2920649049,2265020254&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=474"
  },
  {
    title: "缺钾",
    description:
      "钾元素对于植物生长很关键,如果缺少钾肥的话,会导致植物的老叶叶缘处开始发黄,但是叶子中间位置和叶脉部分仍然是绿色的,底下的根系很少,也比较的短,所以植物容易发生倒伏,果实生长不良,看起来不健康,上面的颜色也不均匀",
    author: "1 分钟前更新",
    img: "https://img0.baidu.com/it/u=2920649049,2265020254&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=474"
  },
  {
    title: "缺氮",
    description:
      "缺少氮肥的植物表现为植株矮小,叶色发黄。 氮肥能够提高作物产量、改善农产品质量,当氮素充足时,植物可合成较多的蛋白质,促进细胞的分裂和增长,因此植物叶面积增长快,能有更多的叶面积用来进行光合作用",
    author: "1 分钟前更新",
    img: "https://img0.baidu.com/it/u=2016151914,1611298480&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=334"
  },
];

const actions = (
  <Box
    direction="row"
    align="center"
    style={{ whiteSpace: "nowrap", height: "100%", paddingLeft: 100 }}
  >
    <Button text type="primary">
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

export const IllnessresultHistory = memo((props) => {

  return (
    <div className="resultHistory">
      <div className="Statistics">
        <PieChart data={mockdata} id={'bugPieChart'} title={'作物病态识别统计'} />
      </div>
      <div className="list">
        <h2>历史识别数据</h2>
        <List
          dataSource={mockdata}
          size={'medium'}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              extra={actions}
              media={<img width="161" height="108" src={item.img} alt='上传图片'/>}
              title={item.title}
            >
              <p style={{ margin: "12px 0" }}>{item.description}</p>
              <div>{item.author}</div>
            </List.Item>
          )}
        />          
      </div>
    </div> 
  )
})