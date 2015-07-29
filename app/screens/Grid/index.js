import React         from 'react'
import FluxComponent from 'flummox/component'
import Header        from 'shared/components/Header'
import GridView      from './components/GridView'

export default class GridFlux extends React.Component {
    render() {
        return (
            <FluxComponent connectToStores={['grid']}>
                <Grid />
            </FluxComponent>
        )
    }
}

class Grid extends React.Component {
    render() {
        return (
            <div className="GridScreen">
                <Header />
                <GridView {...this.props} />
            </div>
        )
    }
}
