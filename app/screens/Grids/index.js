import React from 'react'
import Header from 'shared/components/Header'
import GridsList from './components/GridsList'

export default class GridsFlux extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            adding : false
        }
    }
    render() {
        return (
            <div className="GridsScreen">
                <Header />
                <div className="addButton">
                    <button onClick={this.onAddClick.bind(this)}>+</button>
                </div>
                <GridsList 
                    adding={this.state.adding} 
                    onAddCancel={this.onAddCancel.bind(this)}/>
            </div>
        )
    }
    onAddClick() {
        if (this.state.adding) return
        this.setState({adding:true})
    }
    onAddCancel() {
        if (!this.state.adding) return
        this.setState({adding:false})
    }
}
