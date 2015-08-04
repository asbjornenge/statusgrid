import React             from 'react'
import moment            from 'moment'
import t                 from 'tcomb-form'
import Header            from 'shared/components/Header'
import { FireComponent } from 'fireflux'

let Form = t.form.Form
let Units = t.enums({
    second: 'Second',
    minute: 'Minute',
    hour  : 'Hour'
})
let GroupForm = t.struct({
    diff   : t.Num,
    unit   : Units
})

@FireComponent({ groups : '/groups', events : '/events' })
export default class GridItemsScreen extends React.Component {
    render() {
        let group
        if (!this.state || !this.state.groups || !this.state.events) group = <div>Loading group...</div>
        else {
            group = Object.keys(this.state.groups).reduce((group, fid) => {
                if (group) return group
                let g = this.state.groups[fid]
                g.fid = fid
                if (g.id == this.props.id) return g
            }, null)

            if (!group) group = <div>No such group</div>
            else {
                let groupEvents = Object.keys(this.state.events || {})
                    .filter((fid) => {
                        let e = this.state.events[fid]
                        return e.id == group.id 
                    })
                    .map((fid) => {
                        let e = this.state.events[fid] 
                        e.fid = fid
                        return e
                    })
                    .map((e) => {
                        return <div key={e.fid}>{e.res} - {moment(e.timestamp).format('YYYY-MM-DD hh:mm')}</div>
                    })

                group = (
                    <div className="Group">
                        <h1>{group.id}</h1>
                        <Form ref="form" type={GroupForm} value={group} />
                        <div className="buttons">
                            <button onClick={this.onSave.bind(this, group.fid)}>Save</button>
                            <button onClick={this.onRemove.bind(this, group.fid)}>Remove</button>
                        </div>
                        <div className="events">
                            {groupEvents}
                        </div>
                    </div>
                )
            }
        }
        return (
            <div className="GroupScreen">
                <Header />
                {group}
            </div>
        )
    }
    onSave(fid) {
        let value = this.refs.form.getValue()
        if (!value) return
        this.ref.child('/groups/'+fid).update(value)
    }
    onRemove(fid) {
        this.ref.child('/groups/'+fid).remove()
    }
}
