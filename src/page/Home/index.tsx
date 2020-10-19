import * as React from 'react';

import { HomeWrapper } from './style'

interface IProps {

}
interface IState {

}

class Home extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <HomeWrapper>Home</HomeWrapper>
        )
    }
}

export default Home;
