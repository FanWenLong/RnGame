import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import NavigationActions from 'react-navigation/src/NavigationActions';

const {width: SCREEN_W, height: SCREEN_H} = Dimensions.get("window");

export default class AdView extends Component {

    /** 1.getDefaultProps */
        // //ES5
        // getDefaultProps: function(){
        //     return {
        //     autoPlay: false,
        //     maxLoops: 10,
        //     };
        // },
        // propTypes: {
        //     autoPlay: React.PropTypes.bool.isRequired,
        //         maxLoops: React.PropTypes.number.isRequired,
        //         posterFrameSrc: React.PropTypes.string.isRequired,
        //         videoSrc: React.PropTypes.string.isRequired,
        // },


        // ES6
    static defaultProps = {
        if(__DEV__) {
            console.log("ad-view:" + 'defaultProps');
        },
        autoPlay: false,
        maxLoops: 10,
    };  // 注意这里有分号
    static propTypes = {
        if(__DEV__) {
            console.log("ad-view:" + 'defaultProps1');
        },
        // autoPlay: React.PropTypes.bool.isRequired,
        // maxLoops: React.PropTypes.number.isRequired,
    };

    /** 2. getInitialState es5      es6使用constructor来初始化state*/

    // getInitialState: function() {
    //     return {
    //         loopsRemaining: this.props.maxLoops,
    //     };
    // },

    constructor(props) {
        if (__DEV__) {
            console.log("ad-view:" + 'constructor');
        }
        super(props);
        this.state = {
            time: 3
        };
        this.nestScreen = this.nestScreen.bind(this);
    }

    /** 3.componentWillMount 如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次*/

    componentWillMount() {
        if (__DEV__) {
            console.log("ad-view:" + 'componentWillMount');
        }
    }

    /** 4.render*/
    render() {
        if (__DEV__) {
            console.log("ad-view:" + 'render');
        }
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.img}
                    source={this.props.img}>
                    <Text style={styles.text}>{this.state.time}</Text>
                    <TouchableOpacity style={styles.textB} activeOpacity={0.8} onPress={() => {
                        this.nestScreen();
                    }}>
                        <Text style={{fontSize: 14, color: '#333'}}>跳过</Text>
                    </TouchableOpacity>

                </ImageBackground>
            </View>
        );
    }

    /** 5.componentDidMount render之后调用，就一次，可以访问网络等，*/
    componentDidMount() {
        if (__DEV__) {
            console.log("ad-view:" + 'componentDidMount');
        }
        this.timer = setInterval(
            () => {
                let time = this.state.time;
                if (time === 0) {
                    this.nestScreen();
                } else {
                    time = time - 1;
                    this.setState({time: time});
                }
            }, 1000
        );
    }

    /** 6.1 componentWillReceiveProps
     * 属性改变
     *
     * 输入参数 nextProps 是即将被设置的属性，旧的属性还是可以通过 this.props 来获取。在这个回调函数里面，你可以根据属性的变化，通过调用 this.setState() 来更新你的组件状态，这里调用更新状态是安全的，并不会触发额外的 render() 调用*/
    componentWillReceiveProps(nextProps) {
        if (__DEV__) {
            console.log("ad-view:" + 'componentDidMount');
        }
    }

    /** 6.2 componentWillUnmount,结束*/
    componentWillUnmount() {
        if (__DEV__) {
            console.log("ad-view:" + 'componentWillUnmount');
        }
        this.timer && clearTimeout(this.timer);
    }

    /** 7 shouldComponentUpdate  输入参数 nextProps 和上面的 componentWillReceiveProps 函数一样，nextState 表示组件即将更新的状态值。这个函数的返回值决定是否需要更新组件，如果 true 表示需要更新，继续走后面的更新流程。否者，则不更新，直接进入等待状态。

     默认情况下，这个函数永远返回 true 用来保证数据变化的时候 UI 能够同步更新。在大型项目中，你可以自己重载这个函数，通过检查变化前后属性和状态，来决定 UI 是否需要更新，能有效提高应用性能。*/
    shouldComponentUpdate(nextProps, nextState) {
        if (__DEV__) {
            console.log("ad-view:" + 'shouldComponentUpdate' + " nextState==" + nextState.time);
        }
        return true;
    }

    /** 8.如果组件状态或者属性改变，并且上面的 shouldComponentUpdate(...) 返回为 true，就会开始准更新组件，并调用
     * 在这个函数里面，你就不能使用 this.setState 来修改状态。这个函数调用之后，就会把 nextProps 和 nextState 分别设置到 this.props 和 this.state 中。紧接着这个函数，就会调用 render() 来更新界面了。*/
    componentWillUpdate(nextProps, nextState) {
        if (__DEV__) {
            console.log("ad-view:" + 'componentWillUpdate'+ " nextState==" + nextState.time);
        }
    }

    /** 9.调用了 render() 更新完成界面之后，会调用 componentDidUpdate() 来得到通知，*/
    componentDidUpdate(prevProps, prevState) {
        if (__DEV__) {
            console.log("ad-view:" + 'componentDidUpdate');
        }
    }

    nestScreen() {
        // this.props.navigation.navigate('Home');
        this.props.navigation.dispatch(
            NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Home'}),
                ],
            })
        );
        this.timer && clearTimeout(this.timer);
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: SCREEN_W,
        height: SCREEN_H,
    },
    text: {
        width: 50,
        height: 25,
        color: '#333',
        backgroundColor: '#ccc',
        fontSize: 16,
        paddingLeft: 20,
        margin: 10,
        paddingTop: 1
    },
    textB: {
        position: 'absolute',
        right: 10,
        top: 10,
        width: 50,
        height: 25,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center'
    }
});