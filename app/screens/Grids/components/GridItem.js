import React         from 'react'
import t             from 'tcomb-form'
import FluxComponent from 'flummox/component'
import Header        from 'shared/components/Header'

let Form = t.form.Form
let GridItemForm = t.struct({
    name   : t.Str,
    url    : t.Str,
    secret : t.Str 
})

export default class GridItem extends React.Component {
    render() {
        let value = this.props.grid ? this.props.grid.get('meta').toJS() : {}
        let middleButton = this.props.grid ?
            <button onClick={this.onEdit.bind(this)}>Edit Items</button> :
            <button onClick={this.onCancel.bind(this)}>Cancel</button>
        return (
            <div className="GridItem">
                <Form ref="form" type={GridItemForm} value={value} />
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
        if (!this.props.grid) return this.props.flux.getActions('grid').add(values)
        this.props.flux.getActions('grid').update(this.props.grid.get('meta').merge(values))
    }
    onCancel() {
        if (!this.props.grid) return this.props.onAddCancel()
    }
    onRemove() {
        if (!this.props.grid) return this.props.onAddCancel()
        this.props.flux.getActions('grid').remove(this.props.grid)
    }
    onEdit() {
        this.props.flux.getUtils('nav').navigate('/grid/'+this.props.grid.get('meta').get('id'))
    }
}