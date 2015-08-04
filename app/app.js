import React           from 'react'
import Router          from 'tiny-react-router'
import { FireStarter } from 'fireflux' 

let routes = {
    '/'           : require('./screens/Grid'),
    '/groups'     : require('./screens/Groups'), 
    '/groups/:id' : require('./screens/Group') 
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
