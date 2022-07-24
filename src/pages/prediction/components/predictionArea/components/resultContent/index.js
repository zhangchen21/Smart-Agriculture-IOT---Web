import React, {memo} from 'react';
import { Typography } from '@alifd/next';

const { H1, H2, Paragraph } = Typography;

export const ResultContent = memo((props) => {
  const { chineseName, description, methon} = props?.bugData;
  console.log(props)

  return (
    <div style={{width: '100%'}}>
      <Typography >
        <H1>识别结果</H1>
        {
          props?.bugData
          ? 
            <div>
              <H2>昆虫种类</H2>
              <Paragraph>{chineseName}</Paragraph>
              <H2>昆虫习性</H2>
              <Paragraph>{description}</Paragraph>
              <H2>防治方法</H2>
              <Paragraph>{methon}</Paragraph>              
            </div>
          :
            <H2>未识别出害虫</H2>
        }
      </Typography>                                   
    </div> 
  )
})