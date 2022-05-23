import {v4 as uuidv4} from 'uuid';

// 生成用户临时标识，临时标识唯一且生成后不会轻易改变
export function getUserTempId(){
    // 1.从localStorage中获取用户临时标识
    let userTempId=localStorage.getItem('USERTEMPID_KEY');
    // 2.如果获取到，直接返回使用
    if(!userTempId){
        // 3.如果没有获取到，再通过uuid重新创建，并且存储到localStorage
        userTempId=uuidv4();
        localStorage.setItem('USERTEMPID_KEY',userTempId);
    }
    return userTempId;
}