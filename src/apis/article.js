import { request } from "@/utils";
//获取频道列表
export function getChannelAPI(formData) {
  return request({
    url: "/channels",
    method: "GET",
    data: formData,
  });
}
