import React             from 'react'
import { FireComponent } from 'fireflux'
import Header            from 'shared/components/Header'
import Group             from './components/Group'

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
        let groups = [];
        if (!this.state.adding && !this.state.groups) 
            groups.push(
                <div>No groups found...</div>
            )
        if (this.state.adding) groups.unshift(
           <Group key="adding"
                  onAddCancel={this.onAddCancel.bind(this)}/>
        )
        return (
            <div className="GroupsScreen">
                <Header />
                <div className="addButton">
                    <button onClick={this.onAddClick.bind(this)}>+</button>
                </div>
                <div className="groups">
                    {groups}
                </div>
            </div>
        )
    }
    onAddClick() {
        if (this.state.adding) return
        this.setState({adding:true})
    }
    onAddSave(values) {
        console.log('saving',values)
    }
    onAddCancel() {
        if (!this.state.adding) return
        this.setState({adding:false})
    }
}
