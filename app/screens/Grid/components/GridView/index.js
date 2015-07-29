import React      from 'react'
import StatusItem from './components/StatusItem'

export default class GridView extends React.Component {
    render() {
        let items = this.props.grids.reduce((_items, grid) => {
            return _items.concat(
                grid.get('items').map((item) => {
                    return <StatusItem item={item} /> 
                })
            )
        },[])
        return (
            <div className="GridView">
                {items}
            </div> 
        )
    }
}
