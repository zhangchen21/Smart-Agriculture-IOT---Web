import React, { useState, memo } from 'react';
import { Step, Button, Upload, Message } from '@alifd/next';
import { Serve, port } from "../../../../constant";
import { ResultContent } from './components/resultContent/index';
import api from '../../../../api/api';

import './index.scss'

const { getPredictionResult } = api;


export const PredictionArea = memo(() => {
  const [step, setStep] = useState(-1);
  const [photoName, setPhotoName] = useState("");
  const [resultGetting, setResultGetting] = useState(false);
  const [photo1, setPhoto1] = useState("https://img0.baidu.com/it/u=1642242308,788079207&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500");
  const [photo2, setPhoto2] = useState("https://img0.baidu.com/it/u=1642242308,788079207&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500");
  const [bugData, setBugData] = useState(null);

  const upLoadPhoto = {
    action: "图片上传",
    onclick: () => setStep(0)
  };

  const prediction = () => {
    if(photo1.search(`${Serve}`) === -1) {
      Message.notice("请先上传您要检测的图片");
    } else {
      getPredictionResult(photoName, 'getPredictionResult').then((res) => {
        setResultGetting(false);
        setPhoto2(`${Serve}/attachment/result.jpg`)
        setBugData(res?.data?.[0])
      });
      setResultGetting(true);
      setStep(1);                                        
    }
  }

  function upLoadPhotoSuccess(info) {
    Message.notice("图片上传成功");
    setPhotoName(info.response.photoName);
    setPhoto1(`${Serve}/attachment/${info.response.photoName}`);
  }

  return (
    <div className="predictionArea">
      <div className='predictionContent'>
        <h2>上传图片进行识别</h2>
        <div className="steps">
          <Step current={step}>
          <Step.Item title="上传图片" />
          <Step.Item title="智能识别结果" />
          </Step>
        </div>
        <div className="content">
          <div className="upLoad">
              <img src={photo1} alt="bugsPhoto"/>
              <Upload
                action={`${Serve}:${port}/postPhoto`}
                onSuccess={upLoadPhotoSuccess}
                withCredentials={false}
                name="image"
              >
                <Button 
                type="secondary"
                onClick={upLoadPhoto.onclick}
                key={upLoadPhoto.action}
                >
                  {upLoadPhoto.action}
                </Button>      
              </Upload>
          </div>
            <div className="resultPhoto">
              <img src={photo2} alt="resultPhoto" /> 
              <Button
                type="secondary" 
                onClick={prediction}
                loading={resultGetting}
              >
                点击进行识别
              </Button>
            </div>
          </div>
        
      </div>
      {
        bugData
        ?
        <div className='resultContent'>
          {
            photo2.search(`${Serve}`) !== -1
            ? <ResultContent bugData={bugData}/>
            : null
          }
        </div>   
        : null
      }         
    </div>
  )
})