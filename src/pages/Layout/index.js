import { request } from "@/utils";
import { useEffect } from "react";
const Layout = () => {
  useEffect(()=>{
    request.get("/user/profile");
  },[])
  return (
    <div>
      <h1>首页</h1>
    </div>
  )
}
export default Layout;