import React from 'react'
import Firebase from 'firebase/lib/firebase-web'

export function FireProps(query) { 
    return (target) => {
        target.contextTypes = {
            environment: React.PropTypes.string,
            ref: React.PropTypes.instanceOf(Firebase)
        }
        target.prototype.componentDidMount = function() {
            console.log('Im mounted', this.context)
            this.context.ref.on('child_added', (snap) => {
                console.log(snap.val())
            })
        }
        target.prototype.componentWillUnmount = function() {
            console.log('Im unmounted')
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
