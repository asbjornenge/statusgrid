import React         from 'react'
import Router        from 'tiny-react-router'
import FluxComponent from 'flummox/component'
import Flux          from './flux'

let flux = new Flux()

let routes = {
    '/'         : require('./screens/Grid'),
    '/grids'    : require('./screens/Grids'), 
    '/grid/:id' : require('./screens/GridItems') 
}

var FireStarter = function(target) {
    target.childContextTypes = {
      environment: React.PropTypes.string
    }
    target.prototype.getChildContext = function() {
        return {
            environment: "grandma's house"
        }
    }
}

// import FireStarter from 'fireflux'

@FireStarter
class App extends React.Component {
    render() {
        return (
            <Router routes={routes} />
        ) 
    }
}

React.render(<App />, document.body)
