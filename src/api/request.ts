import axios from 'axios'
import { notification } from 'ant-design-vue';


// 异常拦截处理器
const errorHandler = (error:any) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    } else if (error.response.status === 400 && data.BizMessage) {
      notification.error({
        message: 'server.error.title',
        description: data.BizMessage
      })
    } else if (error.response.status === 400 && data.Message) {
      notification.error({
        message: 'server.error.title',
        description: data.Message
      })
    } else if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
    }
  }
  return Promise.reject(error)
}

// 访问token拦截处理器
const accessHandler = (config:any) => {
  // const token = storage.get(ACCESS_TOKEN)
  // // 如果 token 存在
  // // 让每个请求携带自定义 token 请根据实际情况自行修改
  // if (token) {
  //   config.headers['Access-Token'] = token
  //   config.headers[JWT_HEADER_NAME] = JWT_HEADER_BEARER + token
  // }
  if (config.type) {
    switch (config.type) {
      case 'form':
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        break;
      case 'json':
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        break;
      case 'file':
        config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
        config.headers['Pragma'] = 'no-cache';
        config.headers['Expires'] = 0;
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.withCredentials = false; // 携带cookie
        break;
    }
  }
  return config
}

const createRequest = () => {
  const req = axios.create({
    // API 请求的默认前缀
    baseURL: process.env.BASE_API,
    timeout: 5 * 60 * 1000 // 请求超时时间
  })

  req.interceptors.request.use(accessHandler, errorHandler)

  return req
}

// 创建 axios 实例
const request = createRequest()

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)


function requestPost(url:string, parameter:any) {
  return request.post(url,parameter)
}

function requestGet(url:string,parameter:any) {
  return request({
    method: 'get',
    url: url,
    params:parameter
  })
}


export default request

export {
  request as axios,
  requestPost,
  requestGet,
}