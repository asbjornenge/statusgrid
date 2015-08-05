import React            from 'react'
import { FireComponent} from 'fireflux'
import Header           from 'shared/components/Header'
import EventGroup       from './components/EventGroup'

@FireComponent({ events : '/events', groups : '/groups' })
export default class Grid extends React.Component {
    constructor(props) {
        super(props)
        this.state = { counter : 0 }
    }
    render() {
        console.log('renderinging grid')
        if (!this.state) return (
            <div>Loading...</div>
        )
        if (!this.state.events) return (
            <div>No events found...</div>
        )
        let events = Object.keys(this.state.events).map((id) => {
            return this.state.events[id]
        })
        let groups = events
            .reduce((groups, e) => {
                if (!groups[e.id]) groups[e.id] = {
                    id : e.id,
                    events : []
                }
                groups[e.id].events.push(e)
                return groups
            }, {})
        groups = Object.keys(groups)
            .map((id) => {
                let group = groups[id]
                return <EventGroup 
                            key={group.id}
                            group={group} 
                            groups={this.state.groups} />
            })
        return (
            <div className="GridScreen">
                <Header />
                <div className="groups">
                    {groups}
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.renderInterval = setInterval(() => { this.setState({ counter : this.state.counter += 1 }) },10000)
    }
    componentWillUnmount() {
        clearInterval(this.renderInterval)
    }
}
