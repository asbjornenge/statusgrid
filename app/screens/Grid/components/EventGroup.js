import React  from 'react'
import moment from 'moment'

export default class EventGroup extends React.Component {
    render() {
        let _status = this.props.group.events.reduce((_s, _event) => {
            if (_s == 'good') return _s
            if (moment().diff(moment(_event.timestamp), 'minute') < 10) _s = 'good'
            else _s = 'bad'
            return _s
        },'unknown')
        return (
            <div className={"EventGroup "+_status}></div>
        )
    }
}
