import axios from 'axios';
import { Serve as domin, port } from '../constant';

const Serve = domin + ':' + port;

const api = {
  async getIrrigationValue() {
     const { data } = await axios({
      url:`${Serve}/getIrrigationValue`,
      method:'get',
    });
    return data;
  },

  async getFanValue() {
    const { data } = await axios({
     url:`${Serve}/getFanValue`,
     method:'get',
   });
   return data;
 },

  async getTemp() {
    const { data } = await axios({
      url:`${Serve}/getTemp`,
      method:'get',
    })
    return data;
  },

  async getHum() {
    const { data } = await axios({
      url:`${Serve}/getHum`,
      method:'get'
    })
    return data;
  },

  async getWater() {
    const { data } = await axios({
      url:`${Serve}/getWater`,
      method:'get'
    })
    return data;
  },

  async sendAutoIrrigationValue(autoIrrigationValue) {
    const { data } = await axios({
      url:`${Serve}/setAutoIrrigationValue`,
      method:'get',
      params: {
        autoIrrigationValue
      }
    })
    return data;
  },

  async sendAutoFanValue(autoFanValue) {
    const { data } = await axios({
      url:`${Serve}/setAutoFanValue`,
      method:'get',
      params: {
        autoFanValue
      }
    })
    return data;
  },

  async getPredictionResult(photoName) {
    const { data } = await axios({
      url:`${Serve}/getPredictionResult`,
      method:'get',
      params: {
        photoName
      }
    })
    return data;
  },
}

export default api;