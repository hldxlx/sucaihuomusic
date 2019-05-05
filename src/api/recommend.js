/**
 * Created by cyb on 2019/4/14.
 */
import jsonp from 'common/js/jsonp';
import {commonParams , options} from './config';
import axios from 'axios';
//获取轮播图数据
export function getRecommend(){
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({},commonParams,{
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url,data,options)
}
//获取歌单数据
export function getDiscList() {
  const url = '/api/getDiscList'+'?_=1555224825727';

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    uin: 0,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: '0',
    platform: 'h5',
    needNewCode: 1,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

