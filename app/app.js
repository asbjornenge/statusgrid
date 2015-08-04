import React           from 'react'
import Router          from 'tiny-react-router'
import { FireStarter } from 'fireflux' 
import Settings        from './screens/Settings'

let routes = {
    '/'           : require('./screens/Grid'),
    '/groups'     : require('./screens/Groups'), 
    '/groups/:id' : require('./screens/Group'), 
    '/settings'   : require('./screens/Settings') 
}


let firebase = JSON.parse(localStorage.getItem('statusgrid-settings') || '{"url":""}')

@FireStarter(firebase)
class RealApp extends React.Component {
    render() {
        return (
            <Router routes={routes} />
        ) 
    }
}

let App = firebase.url != "" ? RealApp : Settings
React.render(<App />, document.body)
