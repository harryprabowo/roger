import React from 'react'

import {
    Image
} from 'react-bootstrap'

import './style.scss'

import Logo from '../../logo.svg'

const Dashboard = () => {
    return(
        <div id="Dashboard">
            This is a dashboard.
            <Image src={Logo}/>
        </div>
    )
}

export default Dashboard