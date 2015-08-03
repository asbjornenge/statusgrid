import React         from 'react'
import FluxComponent from 'flummox/component'
import Header        from 'shared/components/Header'
import { FireProps } from 'fireflux'

@FireProps({ events : '/events' })
export default class Grid extends React.Component {
    constructor(props) {
        super(props)
        this.state = { events : [] }
    }
    render() {
        console.log('rendering events', this.state.events)
        return (
            <div className="GridScreen">
                <div>This is the grid screen</div>
            </div>
        )
    }
}
