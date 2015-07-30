import React from 'react'
import HeaderMenu from './components/HeaderMenu'

export default class Header extends React.Component {
    render() {
        return (
            <div className="Header">
                StatusGrid
                <HeaderMenu />
            </div>
        )
    }
}
