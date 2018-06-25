import axios from 'axios'

// export const serverPath = 'http://mbackend.torvoz.cn/'
export const serverPath = '/'

export async function post (url, data = {}) {
  try {
    if (sessionStorage.getItem('loginInfo') == 'undefined') {
      sessionStorage.removeItem('loginInfo')
    }
    if (localStorage.getItem('loginInfo') == 'undefined') {
      localStorage.removeItem('loginInfo')
    }
    let loginInfo = {}
    if (localStorage.getItem('loginInfo')) {
      loginInfo =   JSON.parse(localStorage.getItem('loginInfo'))
    } else  if(sessionStorage.getItem('loginInfo')) {
      loginInfo =   JSON.parse(sessionStorage.getItem('loginInfo'))
    }
    data.token = loginInfo.token
    data.customerId = loginInfo.customerId
    let options = {
      url: serverPath + url,
      method: 'post',
      params: data
    }
    let res = await axios(options)

    if (parseInt(res.data.code) === 5) {
      this.$message.error("您的账号已于其他地方登陆，若不是本人操作，请注意账号安全")
      localStorage.clear();
      sessionStorage.clear()
      setTimeout(() => {
        window.location.href = '/login.html'
      }, 1500)
      return {
        code: 5, message: "您的账号已于其他地方登陆，若不是本人操作，请注意账号安全"
      }
    }
    return res.data
  } catch (e) {
    console.log('nework',e)
    return {code: -1, message: '网络异常:可能是axios请求问题'}
  }
}


