import * as React from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

interface IProps {
    children ?: object
}
interface IState {

}

/**
 * 普通上中下布局
 */
class UserLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        const { children } = this.props
        return (
            <Layout>
                <Header>Header</Header>
                <Content>{ children }</Content>
                <Footer>Footer</Footer>
            </Layout>
        )
    }
}

export default UserLayout;
