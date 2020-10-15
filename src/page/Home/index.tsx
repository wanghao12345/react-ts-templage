import * as React from 'react';

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
            <div className="home-wrapper">Home</div>
        )
    }
}

export default Home;
