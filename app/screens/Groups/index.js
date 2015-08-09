import React             from 'react'
import { FireComponent } from 'fireflux'
import t                 from 'tcomb-form'
import Header            from 'shared/components/Header'
import nav               from 'shared/utils/nav'

let Form = t.form.Form

@FireComponent({ groups : '/groups', events : '/events|limitToLast:100' })
export default class Groups extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            adding : false
        }
    }
    render() {
        let groups = [];

        // If no groups

        if (!this.state.adding && !this.state.groups) 
            groups.push(
                <div key="nada">No groups found...</div>
            )

        // Taken groups

        let takenGroups = Object.keys(this.state.groups || {}).reduce((groups, id) => {
            let g = this.state.groups[id]
            if (groups.indexOf(g.id) >= 0) return groups
            groups.push(g.id)
            return groups 
        }, [])
 
        // Available groups

        let allGroups = Object.keys(this.state.events || {}).reduce((groups, id) => {
            let e = this.state.events[id]
            if (groups.indexOf(e.id) >= 0) return groups
            groups.push(e.id)
            return groups
        }, [])

        // Available groups

        let availableGroups = allGroups.filter((g) => {
            return takenGroups.indexOf(g) < 0
        })

//        console.log(takenGroups, allGroups, availableGroups)

        // <Form> Available groups

        let availableGroupsEnum = availableGroups.reduce((ag, g) => {
            ag[g] = g
            return ag
        }, {})

        let GroupForm = t.struct({
            group : t.enums(availableGroupsEnum)
        })

        // <Group> Components

        takenGroups.forEach((g) => {
            groups.push(
                <div className="Group" key={g}>
                    <h1>{g}</h1>
                    <button onClick={this.viewGroup.bind(this,g)}>View</button>
                </div>
            )
        })

        return (
            <div className="GroupsScreen">
                <Header />
                <div className="addButton">
                    <Form ref="form" type={GroupForm} />
                    <button onClick={this.onAddClick.bind(this)}>+</button>
                </div>
                <div className="groups">
                    {groups}
                </div>
            </div>
        )
    }
    onAddClick() {
        let value = this.refs.form.getValue()
        if (!value) return
        this.ref.child('/groups').push({
            id   : value.group,
            diff : 5,
            unit : 'minute'
        })
    }
    viewGroup(g) {
        nav.navigate('/groups/'+g)
    }
}
