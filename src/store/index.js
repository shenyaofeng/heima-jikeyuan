//组合子模块加导出
import userReducer from './modules/user.js'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer:{
    user:userReducer
  }
})

export default store