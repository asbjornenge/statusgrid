import React         from 'react'
import Immutable     from 'immutable'
import FluxComponent from 'flummox/component'
import Header        from 'shared/components/Header'
import GridItem      from './GridItem'

export default class GridItems extends React.Component {
    render() {
        let items = this.props.grid.get('items') || Immutable.fromJS([])
        let griditems = items.map((item, index) => {
            return <GridItem 
                        key={index}
                        flux={this.props.flux}
                        item={item}
                        gridId={this.props.gridId}
                        onAddCancel={this.props.onAddCancel}/>
        })
        if (this.props.adding) griditems = griditems.unshift(
            <GridItem 
                key="adding"
                flux={this.props.flux}
                gridId={this.props.gridId}
                onAddCancel={this.props.onAddCancel}/>
        )
        return (
            <div className="GridItems">
                {griditems}
            </div>
        )
    }
}
