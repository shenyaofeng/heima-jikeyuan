//和用户相关状态管理
import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken,getToken ,removeToken} from "@/utils";
const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
    setUserInfo(state,action){
      state.userInfo = action.payload
    },
    clearUserInfo(state){
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  },
});

// 解构出actions
const { setToken, setUserInfo, clearUserInfo } = userStore.actions;
//异步方法
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 发送请求
    const res = await request.post("/authorizations",loginForm);
    // 成功后，调用setToken方法
    dispatch(setToken(res.data.token))
  }
}
//获取用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    // 发送请求
    const res = await request.get('user/profile');
    // 成功后，调用 setUserInfo 方法
    dispatch(setUserInfo(res.data));
  };
};

// 获取reducer 函数
const userReducer = userStore.reducer

export { fetchLogin, clearUserInfo , fetchUserInfo };
export default userReducer