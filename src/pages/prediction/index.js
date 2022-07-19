import React, { useState } from "react";
import Navigation from "../../components/navigation/index";
import { Step, Button, Upload, Message } from '@alifd/next';
import { Serve, port } from "../../constant";
import api from '../../api/api';

import './index.scss';

const { getPredictionResult } = api;

const info = {
    
}

function Prediction() {
    const [step, setStep] = useState(-1);
    const [photoName, setPhotoName] = useState("");
    const [resultGetting, setResultGetting] = useState(false);
    const [photo1, setPhoto1] = useState("https://img0.baidu.com/it/u=1642242308,788079207&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500");
    const [photo2, setPhoto2] = useState("");
    const [bugName, setBugName] = useState("");

    const upLoadPhoto = {
        action: "图片上传",
        onclick: function() { 
            if(step !== -1) {
                Message.notice("现在不是进行这一步的时候哦");
            } else {
                setStep(0);
            }
        }
    };

    const prediction = () => {
        if(step !== 0) {
            Message.notice("现在不是进行这一步的时候哦");
        } else {
            getPredictionResult(photoName).then((res) => {
                setResultGetting(false);
                setPhoto2(`${Serve}/attachment/result.jpg`)
                setBugName(res.bugName)
            });
            setResultGetting(true);
            setStep(1);                                        
        }
    }

    function onSuccess(info) {
        Message.notice("图片上传成功");
        console.log("onSuccess : ", info);
        setPhotoName(info.response.photoName);
        setPhoto1(`${Serve}/attachment/${info.response.photoName}`);
    }

    return (
        <div className="home">
            <div className="nav">
                <Navigation></Navigation>
            </div>
            <div className="steps">
                <Step current={step}>
                <Step.Item title="上传图片" />
                <Step.Item title="智能预测结果" />
                </Step>
            </div>
            <div className="content">
                <div className="upLoad">
                    <img src={photo1} alt="bugsPhoto"/>
                    <Upload
                        action={`${Serve}:${port}/postPhoto`}
                        onSuccess={onSuccess}
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
                <div className="result">
                    {
                        photo2.length === 0 
                        ?   
                            <Button
                                type="secondary" 
                                onClick={prediction}
                                loading={resultGetting}
                            >
                                点击进行预测
                            </Button>
                        : 
                            <div className="resultContent">
                                <img src={photo2} alt="resultPhoto" />
                                <h2>{bugName}</h2>
                                <h3>{info[bugName]}</h3>
                            </div>
                    }
                </div>                
            </div>

        </div>
    )
  }

export default Prediction;