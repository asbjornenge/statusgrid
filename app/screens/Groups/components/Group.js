import React         from 'react'
import t             from 'tcomb-form'
import FluxComponent from 'flummox/component'
import Header        from 'shared/components/Header'
import nav           from 'shared/utils/nav'

var Units = t.enums({
    second: 'Second',
    minute: 'Minute',
    hour  : 'Hour'
});

let Form = t.form.Form
let GroupForm = t.struct({
    name   : t.Str,
    diff   : t.Num,
    unit   : Units
})


export default class Group extends React.Component {
    render() {
        let value = this.props.group || {}
        let middleButton = this.props.group ?
            <button onClick={this.onEdit.bind(this)}>Edit Items</button> :
            <button onClick={this.onCancel.bind(this)}>Cancel</button>
        return (
            <div className="Group">
                <Form ref="form" type={GroupForm} value={value} />
                <div className="buttons">
                    <button onClick={this.onSave.bind(this)}>Save</button>
                    {middleButton}
                    <button onClick={this.onRemove.bind(this)}>Remove</button>
                </div>
            </div>
        )
    }
    onSave() {
        let values = this.refs.form.getValue()
        if (!values) return
        this.props.onAddCancel()
        if (!this.props.group) {
            // Adding
            console.log('adding', this.props)
        } else {
            // Updating
        }
    }
    onCancel() {
        if (!this.props.grid) return this.props.onAddCancel()
    }
    onRemove() {
        if (!this.props.grid) return this.props.onAddCancel()
        // Removing
    }
    onEdit() {
        nav.navigate('/grid/'+this.props.group.id)
    }
}
