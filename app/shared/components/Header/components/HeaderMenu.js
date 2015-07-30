import React from 'react'
import FluxComponent from 'flummox/component'

export default class HeaderMenuFlux extends React.Component {
    render() {
        return (
            <FluxComponent>
                <HeaderMenu />
            </FluxComponent>
        )
    }
    
}
class HeaderMenu extends React.Component {
    render() {
        return (
            <div className="HeaderMenu">
                <button onClick={this.navigate.bind(this, '')}>Grid</button>
                <button onClick={this.navigate.bind(this, 'grids')}>Grids</button>
            </div>
        )
    }
    navigate(path) {
        this.props.flux.getUtils('nav').navigate('/'+path)
    }
}
