import React, {Component} from 'react';

import AdView from './components/ad-view/';

export default class Main extends Component {

    render() {
        return (
            <AdView
                navigation={this.props.navigation}
                img={{uri: 'http://img.zcool.cn/community/01b294598c34f7a8012156030c172c.jpg'}}/>
        );
    }
};