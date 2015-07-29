import React  from 'react'
import moment from 'moment'

export default class StatusItem extends React.Component {
    render() {
        let meta = this.props.item.get('meta')
        let _status = this.props.item.get('events').reduce((_s, _event) => {
            if (_s == 'good') return _s
            if (moment().diff(moment(_event.timestamp), meta.get('unit')) < meta.get('diff')) _s = 'good'
            else _s = 'bad'
            return _s
        },'unknown')
        return (
            <div className={"StatusItem "+_status}></div>
        )
    }
}
