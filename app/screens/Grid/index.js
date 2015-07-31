import React         from 'react'
import FluxComponent from 'flummox/component'
import Header        from 'shared/components/Header'

var FireState = function(query) {
    return function decorator(target) {
        target.contextTypes = {
            environment: React.PropTypes.string
        }
        target.prototype.componentDidMount = function() {
            console.log('Im mounted', this.context)
        }
        target.prototype.componentWillUnmount = function() {
            console.log('Im unmounted')
        }
    }
}

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
