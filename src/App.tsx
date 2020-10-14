import * as React from 'react'

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
            <div className="app-wrapper">{text}</div>
        )
    }
}

export default App;
