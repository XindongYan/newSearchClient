import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Input, Layout, Menu, List } from 'antd';
import { routerRedux } from 'dva/router';
import { query } from '../services/example';

const { Header, Content, Footer } = Layout;

const Search = Input.Search;

@connect(state => ({
  data: state.example.data,
  textArray: state.example.textArray
}))

export default class Index extends React.PureComponent {
  state = {
    params: null,
    loading: false,
    count: 0,
    time: 0,
  }

  componentDidMount() {
    let time = new Date().getTime();
    const param = this.props.location.search.split('=')[1];
    query(param)
      .then(result => {
        this.props.dispatch({
          type: 'example/storage',
          payload: result.data,
          callback: () => {
            time = new Date().getTime() - time;
            this.setState({
              count: result.data.result.length,
              time: time / 1000,
              params: param
            })
          }
        })
      })
  }

  // eslint-disable-next-line react/no-deprecated
  async componentWillReceiveProps(nextProps) {
    const param = nextProps.location.search.split('=')[1]
    if (param !== this.props.location.search.split('=')[1]) {
      let time = new Date().getTime();

      query(param).then(result => {
        this.props.dispatch({
          type: 'example/storage',
          payload: result.data,
          callback: () => {
            time = new Date().getTime() - time;
            this.setState({
              count: result.data.result.length,
              time: time / 1000,
              params: param
            })
          }
        })
      })
    }
  }

  getParams = async (value) => {

    this.setState({
      loading: true
    });

    this.props.dispatch(routerRedux.push(`/search?q=${value}`));

    this.setState({
      loading: false,
      params: value
    });
  }

  render() {

    moment.locale('zh-cn');

    const { count, time, params } = this.state;

    const { data } = this.props;

    return (
      <Layout style={{ backgroundColor: "#fff" }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: "#fff" }}>
          <div className="logo">
            <img style={{ float: "left", height: 60 }} src="../public/logo.png" alt="logo" />
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['List']}
            style={{ lineHeight: '64px' }}
          // onClick={e => this.itemChange(e)}
          >
            <Menu.Item key="Search">
              <Search
                placeholder={params}
                style={{ width: 300 }}
                size="large"
                onSearch={value => this.getParams(value)}
              />
            </Menu.Item>
          </Menu>

        </Header>
        <Content style={{ padding: 70, marginTop: 30, background: "#fff", minHeight: document.documentElement.clientHeight - 100 }}>
          <span style={{ color: "#777" }}>找到 {count} 条结果 （用时 {time} 秒 ）</span>
          <List
            itemLayout="horizontal"
            dataSource={data}
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 10,
            }}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  style={{ height: 115, overflow: 'hidden' }}
                  title={<div><a href={item.url} style={{ fontSize: 17 }}>{item.title}</a><br /><a style={{ color: 'green' }}>{item.url}</a></div>}
                  description={<div id="text" dangerouslySetInnerHTML={{ __html: `${moment(item.time).format('LL')}  -  ${item.text}` }} style={{ width: '60%' }}></div>}
                />
              </List.Item>
            )}
          />
        </Content>
        <Footer style={{ bottom: 0 }}>新闻搜索</Footer>
      </Layout>
    )
  }
}
