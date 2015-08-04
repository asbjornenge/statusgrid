import React  from 'react'
import moment from 'moment'
import nav    from 'shared/utils/nav'

export default class EventGroup extends React.Component {
    render() {
        if (!this.props.groups) return this.renderWithStatus('unknown')
        let knowGroups = Object.keys(this.props.groups).map((fid) => this.props.groups[fid])
        let knowGroupIds = knowGroups.map((g) => g.id)
        if (knowGroupIds.indexOf(this.props.group.id) < 0) return this.renderWithStatus('unknown')
        let myGroup = knowGroups.filter((g) => {
            return g.id == this.props.group.id
        })[0]
        let _status = this.props.group.events.reduce((_s, _event) => {
            if (_s == 'good') return _s
            if (moment().diff(moment(_event.timestamp), myGroup.unit) < myGroup.diff) _s = 'good'
            else _s = 'bad'
            return _s
        },'unknown')
        return this.renderWithStatus(_status)
    }
    renderWithStatus(_status) {
        return (
            <div className={"EventGroup "+_status} onClick={this.onClick.bind(this)} title={this.props.group.id}></div>
        )
    }
    onClick() {
        nav.navigate('/groups/'+this.props.group.id)
    }
}
