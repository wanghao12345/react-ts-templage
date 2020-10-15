import React from 'react'
import ReactDom from 'react-dom'

import App from '@src/App'
import './styles/reset.css'
import 'antd/dist/antd.less';
import './index.scss'


ReactDom.render(<App />, document.getElementById('root'))