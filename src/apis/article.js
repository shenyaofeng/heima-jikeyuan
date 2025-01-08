import { request } from "@/utils";
//获取频道列表
export function getChannelAPI(formData) {
  return request({
    url: "/channels",
    method: "GET",
    data: formData,
  });
}
//提交文章表单
export function createArticleAPI(data) {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    data: data,
  });
}