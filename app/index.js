import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import PopularList from './components/PopularList'

class App extends React.Component {

  render() {
    return (
    <div className='container'>
     <PopularList />
      </div>
    )

  }
}

ReactDOM.render(<App />, document.getElementById('app'))