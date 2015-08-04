import React             from 'react'
import { FireComponent } from 'fireflux'
import Header            from 'shared/components/Header'
import GridsList         from './components/GridsList'

@FireComponent({ groups : '/groups' })
export default class Groups extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            adding : false
        }
    }
    render() {
        console.log(this.state)
        return (
            <div className="GroupsScreen">
                <Header />
                <div className="addButton">
                    <button onClick={this.onAddClick.bind(this)}>+</button>
                </div>
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
