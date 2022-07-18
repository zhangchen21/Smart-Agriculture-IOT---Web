import axios from 'axios';
import { Serve } from '../constant';

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
}

export default api;