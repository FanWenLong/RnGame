/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {Easing, Animated} from 'react-native'
import {StackNavigator} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import Main from './apps/main';
import Home from './apps/home';

/** 这个控件两个参数，第一个是跳转界面的路由表，第二个是参数配置表*/
const Navigator = StackNavigator(
    {
        Main: {screen: Main},
        Home: {screen: Home},
    },
    {
        /**
         initialRouteKey,
         initialRouteName,设置默认的页面组件，必须是上面已注册的页面组件
         initialRouteParams,初始路由参数
         paths,路由中设置的路径的覆盖映射配置
         headerMode,返回上级页面时动画效果,float：iOS默认的效果,screen：滑动过程中，整个页面都会返回,none：无动画

         headerTransitionPreset:Specifies how the header should transition from one screen to another when headerMode: float is enabled.
         -----------------------1.fade-in-place - Header components cross-fade without moving, similar to the Twitter,
         -----------------------Instagram, and Facebook app for iOS. This is the default value.
         -----------------------2.uikit - An approximation of the default behavior for iOS.
         mode, 定义跳转风格 card：使用iOS和安卓默认的风格 modal：iOS独有的使屏幕从底部画出。类似iOS的present效果
         cardStyle,自定义设置跳转效果:
         transitionConfig： 自定义设置滑动返回的配置
         -------------------transitionProps - Transition props for the new screen.
         -------------------prevTransitionProps - Transitions props for the old screen.
         -------------------isModal - Boolean specifying if screen is modal.
         onTransitionStart：当转换动画即将开始时被调用的功能
         onTransitionEnd：当转换动画完成，将被调用的功能
         */
        mode: 'card',
        cardStyle: {backgroundColor: "#fff"},
        transitionConfig: (() => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,//从右向左进入
            // CardStackStyleInterpolator.forVertical //从下向上进入
            // CardStackStyleInterpolator.forFadeFromBottomAndroid //从底部淡出
            transitionSpec: {
                duration: 250,
                easing: Easing.bounce,
                timing: Animated.timing,
            },
        })),
        navigationOptions: {
            /**
             title：标题，如果设置了这个导航栏和标签栏的title就会变成一样的，不推荐使用
             header：可以设置一些导航的属性，如果隐藏顶部导航栏只要将这个属性设置为null
             headerTitle：设置导航栏标题，推荐
             headerBackTitle：设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null
             headerTruncatedBackTitle：设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"
             headerRight：设置导航条右侧。可以是按钮或者其他视图控件
             headerLeft：设置导航条左侧。可以是按钮或者其他视图控件
             headerStyle：设置导航条的样式。背景色，宽高等
             headerTitleStyle：设置导航栏文字样式
             headerBackTitleStyle：设置导航栏‘返回’文字样式
             headerTintColor：设置导航栏颜色
             headerPressColorAndroid：安卓独有的设置颜色纹理，需要安卓版本大于5.0
             gesturesEnabled：是否支持滑动返回手势，iOS默认支持，安卓默认关闭*/
            header: null,
        }
    }
);

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Navigator/>
        );
    }
}

