import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image, Dimensions } from 'react-native';

/**
 * Screen for first tab.
 */

const URL_PREFIX = "http://gank.io/api/data/Android/10/";
// start from 1
var page = 1;
var width = Dimensions.get('window').width;

export default class Home extends Component {
  static navigationOptions = {
    tabBarLabel: '首页 ',
    tabBarIcon: () => <Icon size={24} name="home" color="black" />
  }

  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        //网络请求状态
        error: false,
        datas: [],
        showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        refreshing: false,//下拉控制
        image: "",
    };
  }

  async getData() {
    let url = URL_PREFIX + page;
    let res = await fetch(url, {
        method: 'GET',
      })
      .then(((response) => response.json()))
      .then((json) => {
        var results;
        if(page<2){
          results = json.results;
        }else{
          results = [...this.state.datas, ...json.results];
        }
        this.setState({
          error: json.error,
          isLoading: false,
          datas: results,
          showFoot: 0,
          refreshing: false,
        });
        page++;
      })
      .catch(((error) => {
        console.error(error);
        this.setState({
          error: true,
          isLoading: false,
          showFoot: 1,
          refreshing: false,
        });
      }));
  }

  async getImage() {
    const URL = "http://gank.io/api/data/%E7%A6%8F%E5%88%A9/1/1";
    let res = await fetch(URL, {
      method: 'GET',
    })
    .then(((response) => response.json()))
    .then((json) => {
      this.setState(previousState => {
        return { image: json.results[0].url, selected: !previousState.selected };
      });
    })
    .catch(((error) => {
      console.error(error);
    }));
  }

  componentDidMount() {
    //请求数据
    this.getData();
    this.getImage();
  }

  //加载等待页
  renderLoadingView() {
    return (
      <View style={styles.container}>
          <ActivityIndicator
          animating = {
            true
          }
          color = '#25acc4'
          size = "large" />
      </View>
    );
  }

  renderErrorView(){
    return(
      <View style={styles.container}>
        <Text>加载失败</Text>
      </View>
    )
  }

  renderData(){
    return(
      <FlatList
        keyExtractor = {(item,index) => ""+index}
        data = {this.state.datas}
        extraData = {this.state.image}
        renderItem = {this._renderItemView}
        ItemSeparatorComponent={this._separator}
        ListHeaderComponent={this._renderHeader.bind(this)}
        ListFooterComponent={this._renderFooter.bind(this)}
        onEndReached={this._onEndReached.bind(this)}
        onEndReachedThreshold={0.5}
        onRefresh={this._onRefresh.bind(this)}
        refreshing={this.state.refreshing}
      />
    )
  }

  _onRefresh(){
    this.setState({
      refreshing: true,
    });
    page=1;
    this.getData();
  }

  _separator(){
    return <View style={styles.separator}/>;
  }

  _renderItemView({item}){
    return(
      <View style = {styles.content}>
        <Text style = {{color: '#25acc4'}}>{item.desc}</Text>
        <View style = {{flexDirection: 'row', marginTop: 2, justifyContent: 'space-between'}}>
          <Text style = {{color: 'black',fontSize: 15}}>{item.who==null?"佚名":item.who}</Text>
          <Text style = {{color: 'black'}}>{item.publishedAt.split("T")[0]+" "}</Text>
        </View>
      </View>
    )
  }

  _renderHeader(){
    // if(this.state.image.length !== 0){
    //   return(
    //     <View style={{marginBottom:8}}>
    //       <Image style={[styles.image,{resizeMode:'stretch'}]}
    //       source = {{uri: this.state.image}}/>
    //     </View>
    //   )
    // }else{
    //   return(
    //     <View>
    //       <Text></Text>
    //     </View>
    //   )
    // }
    return(
      <View style={{marginBottom:8}}>
        <Image style={[styles.image,{resizeMode:'stretch'}]}
        source = {{uri: this.state.image}}/>
      </View>
    )
  }

  _renderFooter(){
    if (this.state.showFoot === 1) {
        return (
            <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                <Text style={{color:'#333333',fontSize:14,marginTop:5,marginBottom:5,}}>
                    加载失败
                </Text>
            </View>
        );
    } else if(this.state.showFoot === 2) {
        return (
            <View style={styles.footer}>
                <ActivityIndicator />
                <Text>正在加载更多数据...</Text>
            </View>
        );
    } else if(this.state.showFoot === 0){
        return (
            <View style={styles.footer}>
                <Text></Text>
            </View>
        );
    }
  }

  _onEndReached(){
    //如果是正在加载中或没有更多数据了，则返回
    if(this.state.showFoot != 0 ){
        return ;
    }
    //底部显示正在加载更多数据
    this.setState({showFoot:2});
    //获取数据
    this.getData();
  }

  render() {
    //第一次加载等待的view
    if (this.state.isLoading && !this.state.error) {
      return this.renderLoadingView();
    } else if (this.state.error) {
      //请求失败view
      return this.renderErrorView();
    }
    //加载数据
    return this.renderData();
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
  },
  title: {
      fontSize: 15,
      color: 'blue',
  },
  footer:{
      flexDirection:'row',
      height:24,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:10,
  },
  content: {
      marginLeft: 8,
      marginRight: 8,
  },
  image: {
    width: width,
    height: 0.6666 * width,
  },
  separator: {
    height: 1,
    backgroundColor: '#9a9a9a',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 2,
    marginRight: 2,
  }
});