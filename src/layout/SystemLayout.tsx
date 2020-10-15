import * as React from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

interface IProps {
    children?: object
}
interface IState {

}

/**
 * 后台管理系统的一般布局
 */
class SystemLayout extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { children } = this.props
        return (
            <Layout>
                <Sider>Sider</Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>{children}</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default SystemLayout;
