import React from "react";
import { Timeline  } from '@alifd/next';
import moment from 'moment';

import './index.scss'

const TimelineItem = Timeline.Item;

function Journal() {

    return (
        <div className="journal">
          <h2 className='title'> 温室日志</h2>
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
    )
  }

export default Journal;