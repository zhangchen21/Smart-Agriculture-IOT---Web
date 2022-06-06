import React, { useState } from "react";
import Navigation from "../../components/navigation/index";
import { Step, Button, Upload, Message } from '@alifd/next';
import { Serve } from "../../constant";
import axios from 'axios';

import './index.scss'

function Home() {
    const [step, setStep] = useState(-1);
    const [photoName, setPhotoName] = useState("");
    const [photo1, setPhoto1] = useState("https://img0.baidu.com/it/u=1642242308,788079207&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500");
    const [photo2, setPhoto2] = useState("");
    const [photo3, setPhoto3] = useState("");
    const [photo4, setPhoto4] = useState("");

    const Photos = [ photo1, photo2, photo3, photo4 ];
    const Actions = [
        {
            action: "图片上传",
            onclick: function() { 
                if(step !== -1) {
                    Message.notice("现在不是进行这一步的时候哦");
                    return
                }
                else setStep(0); 
            }
        },
        {
            action: "图像预处理",
            onclick: function() { 
                if(step !== 0) {
                    Message.notice("现在不是进行这一步的时候哦");
                    return
                }
                else {
                    axios({
                        url:`${Serve}/preProcessing`,
                        params:{ photoName },
                        method:'get'
                    }).then(
                        res => setPhoto2(res)
                    )
                    setStep(1); 
                }
            }
        },
        {
            action: "PIV处理与修正",
            onclick: function() { 
                if(step !== 1) {
                    Message.notice("现在不是进行这一步的时候哦");
                    return
                }
                axios({
                    url:`${Serve}/PIV`,
                    params:{ photoName },
                    method:'get'
                }).then(
                    res => setPhoto3(res)
                )
                setStep(2); 
            }
        },
        {
            action: "最终图像",
            onclick: function() { 
                if(step !== 2) {
                    Message.notice("现在不是进行这一步的时候哦");
                    return
                }
                axios({
                    url:`${Serve}/getFinalPhoto`,
                    params:{ photoName },
                    method:'get'
                }).then(
                    res => setPhoto4(res)
                )
                setStep(3); 
            }
        },
    ];
    function onSuccess(info) {
        Message.notice("图片上传成功");
        console.log("onSuccess : ", info);
        setPhotoName(info.response.photoName);
        setPhoto1(info.response.url);
    }
    return (
        <div className="home">
            <div className="nav">
                <Navigation></Navigation>
            </div>
            <div className="steps">
                <Step current={step}>
                <Step.Item title="上传图片" />
                <Step.Item title="图像预处理" />
                <Step.Item title="原始输出图像" />
                <Step.Item title="修正输出图像" />
                </Step>
            </div>
            <div className="content">
                {
                    Photos.map((photo) => (
                        photo.length !== 0
                        // eslint-disable-next-line 
                        ? <img src={photo} key={photo}/>
                        // eslint-disable-next-line
                        : <img/>
                    ))
                }
            </div>
            <div className="actions">
                {
                    Actions.map((action) => (
                        action.action === "图片上传" 
                        ?
                            <Upload
                                action={`${Serve}/postPhoto`}
                                onSuccess={onSuccess}
                                withCredentials={false}
                                name="image"
                            >
                                <Button 
                                type="secondary"
                                onClick={action.onclick}
                                key={action.action}
                                >
                                    {action.action}
                                </Button>      
                            </Upload>
                        :                                         
                            <Button 
                            type="secondary"
                            onClick={action.onclick}
                            key={action.action}
                            >
                                {action.action}
                            </Button>                    
                    ))
                }
            </div>
        </div>
    )
  }

export default Home;