import React         from 'react'
import FluxComponent from 'flummox/component'
import Header        from 'shared/components/Header'
import GridItems     from './components/GridItems'

export default class GridItemsFlux extends React.Component {
    render() {
        return (
            <FluxComponent connectToStores={['grid']}>
                <GridItemsScreen grid={this.props.id} />
            </FluxComponent>
        )
    }
}

class GridItemsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            adding : false
        }
    }
    render() {
        let grid = this.props.grids.reduce((_grid, cgrid) => {
            if (cgrid.get('meta').get('id') == this.props.grid) return cgrid
            return _grid
        }, null)
        if (!grid) return (<div>No such grid</div>)
        return (
            <div className="GridItemsScreen">
                <Header />
                <div className="addButton">
                    <button onClick={this.onAddClick.bind(this)}>+</button>
                </div>
                <GridItems 
                    grid={grid} 
                    gridId={this.props.grid} 
                    adding={this.state.adding} 
                    onAddCancel={this.onAddCancel.bind(this)} />
            </div>
        )
    }
    onAddClick() {
        if (this.state.adding) return
        this.setState({ adding : true })
    }
    onAddCancel() {
        if (!this.state.adding) return
        this.setState({ adding : false })
    }
}
