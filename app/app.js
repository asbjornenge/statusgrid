import React         from 'react'
import Router        from 'tiny-react-router'
import FluxComponent from 'flummox/component'
import Flux          from './flux'

let flux = new Flux()

let routes = {
    '/' : require('./screens/Grid') 
}

React.render(
    <FluxComponent flux={flux}>
        <Router routes={routes} />
    </FluxComponent>
, document.body)
