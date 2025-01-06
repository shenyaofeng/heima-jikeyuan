//和用户相关状态管理
import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken,getToken} from "@/utils";
const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
  },
});

// 解构出actions
const { setToken } = userStore.actions
//异步方法
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 发送请求
    const res = await request.post("/authorizations",loginForm);
    // 成功后，调用setToken方法
    dispatch(setToken(res.data.token))
  }
}

// 获取reducer 函数
const userReducer = userStore.reducer

export { fetchLogin,setToken };
export default userReducer