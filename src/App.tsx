import * as React from 'react';
import Router from '@src/router'
import { Button } from 'antd';
import {
    QuestionOutlined
  } from '@ant-design/icons';


interface IProps {

}

interface IState {
    text?: string
}

class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            text: '这是一个测试组件'
        }
    }

    render() {
        const { text } = this.state
        return (
            <Router />
        )
    }
}

export default App;
