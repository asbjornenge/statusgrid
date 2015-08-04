import React         from 'react'
import FluxComponent from 'flummox/component'
import Header        from 'shared/components/Header'
import GridItem      from './GridItem'

export default class GridsListFlux extends React.Component {
    render() {
        return (
            <FluxComponent connectToStores={['grid']}>
                <GridsList {...this.props} />
            </FluxComponent>
        )
    }
}
class GridsList extends React.Component {
    render() {
        let griditems = this.props.grids.map((grid, index) => {
            return <GridItem 
                        key={index}
                        flux={this.props.flux}
                        grid={grid}
                        onAddCancel={this.props.onAddCancel}/>
        })
        if (this.props.adding) griditems = griditems.unshift(
            <GridItem 
                key="adding"
                flux={this.props.flux}
                onAddCancel={this.props.onAddCancel}/>
        )
        return (
            <div className="GridsList">
                {griditems}
            </div>
        )
    }
}
