import axios from 'axios';

const baseUrl = 'http://music.cpengx.cn';

// 获取首页数据
export function getIndex():Promise<any>{
    return axios.get(`${baseUrl}/index/index`);
}

// 获取分类信息
export function getCategory():Promise<any>{
    return axios.get(`${baseUrl}/catalog/index`);
}

// 获取分类信息的子类信息 传入id
export function getCataLogCurrent(id:number):Promise<any>{
    return axios.get(`${baseUrl}/catalog/current`,{params:{id}});
}