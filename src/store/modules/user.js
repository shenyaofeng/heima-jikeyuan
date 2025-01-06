//和用户相关状态管理
import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
const userStore = createSlice({
  name:'user',
  initialState:{
    token:''
  },
  reducers:{
    setToken(state,action){
      state.token = action.payload
    }
  }
})

// 解构出actions
const { setToken } = userStore.actions
//异步方法
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 发送请求
    console.log(loginForm);
    const res = await request.post("/authorizations",loginForm);
    // 成功后，调用setToken方法
    console.log(res);
    dispatch(setToken(res.data.token))
  }
}

// 获取reducer 函数
const userReducer = userStore.reducer

export { fetchLogin,setToken };
export default userReducer