import React         from 'react'
import t             from 'tcomb-form'
import FluxComponent from 'flummox/component'
import Header        from 'shared/components/Header'

var Units = t.enums({
    second: 'Second',
    minute: 'Minute',
    hour  : 'Hour'
});

let Form = t.form.Form
let GridItemForm = t.struct({
    name   : t.Str,
    diff   : t.Num,
    unit   : Units 
})

export default class GridItemFlux extends React.Component {
    render() {
        return (
            <FluxComponent>
                <GridItem {...this.props} />
            </FluxComponent>
        )
    }
}

class GridItem extends React.Component {
    render() {
        let value = this.props.item ? this.props.item.toJS() : {}
        let middleButton = this.props.item ?
            <button onClick={this.onView.bind(this)}>View</button> : 
            <button onClick={this.onCancel.bind(this)}>Cancel</button>
        let id = this.props.item ? this.props.item.get('id') : 'new'
        return (
            <div className="GridItem">
                <div className="GridItemId">{id}</div>
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
        if (!this.props.grid) return this.props.flux.getActions('grid').addItem(this.props.gridId, values)
        this.props.flux.getActions('grid').updateItem(this.props.grid.get('meta').merge(values))
    }
    onCancel() {
        if (!this.props.grid) return this.props.onAddCancel()
    }
    onRemove() {
        if (!this.props.grid) return this.props.onAddCancel()
        this.props.flux.getActions('grid').removeItem(this.props.grid)
    }
    onView() {
        console.log('me wanna view dis item')
//        this.props.flux.getUtils('nav').navigate('/grid/'+this.props.grid.get('meta').get('id'))
    }
}
