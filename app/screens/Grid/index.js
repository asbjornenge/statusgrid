import React         from 'react'
import FluxComponent from 'flummox/component'
import Header        from 'shared/components/Header'
import { FireProps } from 'fireflux'

@FireProps({ items : '/items' })
export default class Grid extends React.Component {
    render() {
        return (
            <div className="GridScreen">
                <div>This is the grid screen</div>
                <button>Add</button>
            </div>
        )
    }
    doThing() {
        this.ref.child('/items/abc').set({})
    }
}
