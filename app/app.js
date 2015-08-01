import React           from 'react'
import Router          from 'tiny-react-router'
import { FireStarter } from 'fireflux' 

let routes = {
    '/'         : require('./screens/Grid'),
    '/grids'    : require('./screens/Grids'), 
    '/grid/:id' : require('./screens/GridItems') 
}

@FireStarter('https://taghub-statusgrid.firebaseio.com/')
class App extends React.Component {
    render() {
        return (
            <Router routes={routes} />
        ) 
    }
}

React.render(<App />, document.body)
