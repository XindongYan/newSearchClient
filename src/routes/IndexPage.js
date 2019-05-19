import React from 'react';
import { connect } from 'dva';
import { Input, Spin } from 'antd';
import { routerRedux } from 'dva/router';

const Search = Input.Search;

@connect(state => ({
  data: state.example.data
}))

export default class IndexPage extends React.PureComponent {
  state = {
    params: null,
    loading: false,
  }

  getParams = async (value) => {

    this.setState({
      loading: true
    });

    this.props.dispatch(routerRedux.push(`/search?q=${value}`));

    this.setState({
      loading: false
    });
  }

  render() {

    return (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <img style={{ height: 100, margin: '0 auto', marginTop: '20%' }} src="../public/logo.png" alt="logo" /><h1 style={{ color: '#777' }}>新闻搜索</h1>
        <Search
          style={{ width: '50%', height: 50 }}
          size="large"
          onSearch={value => this.getParams(value)}
        />
        <Spin spinning={this.state.loading} />
      </div>

    )
  }
}
