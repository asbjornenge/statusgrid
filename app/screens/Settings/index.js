import React  from 'react'
import t      from 'tcomb-form'
import assign from 'object.assign'
import Header from 'shared/components/Header'

let Form = t.form.Form
let Firebase = t.struct({
    url    : t.Str,
    secret : t.Str
})

export default class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state = { settings : JSON.parse(localStorage.getItem('statusgrid-settings') || '{}') }
    }
    render() {
        return (
            <div className="SettingsScreen">
                <Header />
                <Form ref="form" type={Firebase} value={this.state.settings} />
                <button onClick={this.onSave.bind(this)}>Save</button>
            </div>
        )
    }
    onSave() {
        let value = this.refs.form.getValue()
        if (!value) return
        let settings = assign({}, value)
        localStorage.setItem('statusgrid-settings', JSON.stringify(settings))
        document.location.reload(true)
    }
}
