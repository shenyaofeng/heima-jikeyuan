//和用户相关状态管理
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

// 获取reducer 函数
const userReducer = userStore.reducer

export {setToken}
export default userReducer