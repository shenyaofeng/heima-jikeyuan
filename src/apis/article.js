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

//获取文章列表
export function getArticleAPI(params) {
  return request({
    url: "/mp/articles",
    method: "GET",
    params,
  });
}

//删除文章
export function deleteArticleAPI(id) {
  return request({
    url: `mp/articles/${id}`,
    method: "DELETE",
  });
}