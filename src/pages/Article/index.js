import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
} from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import {useChannel}from "@/hooks/useChannel";
// 导入资源
import { Table, Tag, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useEffect, useState } from "react";
import { getArticleAPI, deleteArticleAPI } from "@/apis/article";
const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  //
  const navigate = useNavigate()
  //文章状态
  const status = {
    1:<Tag color="warning">待审核</Tag>,
    2:<Tag color="green">审核通过</Tag>,
    3:<Tag color="red">审核失败</Tag>
  }
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (data) => status[data]
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)}/>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => confirm(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => {
                  console.log("删除");
                }}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  //获取文章列表
  const [reqData, setReqData] = useState({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 4,
  });

  const [list,setList] = useState([])
  const [count,setCount] = useState(0)
  useEffect(() => {
    const getArticleList = async () => {
      const res = await getArticleAPI(reqData);
      setList(res.data.results);
      setCount(res.data.total_count);
    };
    getArticleList();
    //reqData发生变化 重新请求文章列表,作为依赖项
  }, [reqData]); 
   // 获取频道列表
  const {channelList} = useChannel()
  // 筛选
  // 参数
  const onFinish = (value) => {
    console.log(value);
    setReqData({
      ...reqData,
      channel_id:value.channel_id,
      status:value.status,
      begin_pubdate:value.date[0].format('YYYY-MM-DD'),
      end_pubdate:value.date[1].format('YYYY-MM-DD')
    })
  }
  // 分页
  const onPageChange = (page) => {
    setReqData({
      ...reqData,
      page:page
    })
  }
  // 删除
  const confirm = async (data) => {
    console.log(data);
    await deleteArticleAPI(data.id)
    setReqData({
      ...reqData
    })
  };
  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "文章列表" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: "" }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue="推荐"
              style={{ width: 120 }}
            >
              {channelList.map((item) => (
                <Option key={item.id} value="item.id">
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格 */}
      <Card title={`根据筛选条件共查询到${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={list} pagination={{
          total:count,
          pageSize:reqData.per_page,
          onChange:onPageChange
        }}/>
      </Card>
    </div>
  );
};

export default Article;