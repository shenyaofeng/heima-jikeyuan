import { request } from "@/utils";
//12345
//登陆
export function loginAPI (formData) { 
  return request ({
    url: "/authorizations",
    method: "POST",
    data: formData,
  });
}
//获取用户信息

export function getProfileAPI() {
  return request({
    url: "/user/profile",
    method: "GET",
  });
}