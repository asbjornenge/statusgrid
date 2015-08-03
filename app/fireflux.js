import React from 'react'
import assign from 'object.assign'
import Firebase from 'firebase/lib/firebase-web'

let listeners = {}

function distributor(pathListeners, snap) {
    let data = assign({ fid : snap.key() }, snap.val())
    pathListeners.data.push(data)
    pathListeners.fns.forEach((fn) => fn(data))
}

function addListener(path, fn, ref) {
    // TODO: Match also ref somehow
    if (listeners.path) {
        // Replay all events
        listeners.data.forEach((d) => fn(d))
        // Hook up the listener
        listeners.fns.push(fn)
    } else {
        listeners[path] = {
            data   : [],
            fns    : [fn],
        }
        listeners[path].dist = distributor.bind(undefined, listeners[path])
        ref.child(path).on('child_added', listeners[path].dist)
    } 
}
function removeListener(path, fn) {}

export function FireProps(query) { 
    return (target) => {
        target.contextTypes = {
            environment: React.PropTypes.string,
            ref: React.PropTypes.instanceOf(Firebase)
        }
        target.prototype._contructor = target.prototype.constructor
        target.prototype.contructor = function(props, context) {
            if (typeof target._contructor === 'function') target.prototype._contructor(arguments)
            this.state = { yolo : [] }
        } 
        target.prototype._componentDidMount = target.prototype.componentDidMount
        target.prototype.componentDidMount = function() {
            this.ref = this.context.ref
            this.listeners = Object.keys(query).map((prop) => {
                let path = query[prop]
                let handler = (data) => {
                    this.setState({ yolo : this.state.yolo.concat(data) })
                }
                addListener(path, handler, this.ref)
                return {
                    path : path,
                    prop : prop,
                    handler : handler 
                }
                this.setState({ yolo : [] })
            })
            if (typeof this._componentDidMount === 'function') this._componentDidMount(arguments)
        }
        target.prototype._componentWillUnmount = target.prototype.componentWillUnmount
        target.prototype.componentWillUnmount = function() {
            console.log('Im unmounted')
            if (typeof this._componentWillUnmount === 'function') this._componentWillUnmount(arguments)
        }
    }
}

export function FireStarter(url) {
    return (target) => {
        target.childContextTypes = { 
          environment: React.PropTypes.string,
          ref: React.PropTypes.instanceOf(Firebase)
        }
        target.prototype.getChildContext = function() {
            return {
                environment: "grandma's house",
                ref : new Firebase(url)
            }
        }
    }
}
