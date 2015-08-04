import React from 'react'
import nav   from 'shared/utils/nav'

export default class HeaderMenu extends React.Component {
    render() {
        return (
            <div className="HeaderMenu">
                <button onClick={this.navigate.bind(this, '')}>Grid</button>
                <button onClick={this.navigate.bind(this, 'groups')}>Groups</button>
                <button onClick={this.navigate.bind(this, 'settings')}>Settings</button>
            </div>
        )
    }
    navigate(path) {
        nav.navigate('/'+path)
    }
}
