// Mock 模拟数据接口
import Mock from 'mockjs';
import banner from './banner.json';
import floor from './floor.json';

/* import categoryList from './categoryList.json';
Mock.mock('/mock/product/getBaseCategoryList',{code:200,data:categoryList}); */

// 数据接口
// 第一个参数代表请求的路径，第二个参数代表返回的数据
Mock.mock('/mock/banner',{code:200,data:banner});
Mock.mock('/mock/floor',{code:200,data:floor});
