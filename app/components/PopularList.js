import React from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import Button from '@mui/material/Button';
import { fetchRepos } from '../apis/api'

function LanguagesNavbar(props){

  const languageCategories = [ 'All', 'JS', 'Java', 'Python', 'CSS', 'Ruby'];
  return (
    <ul className="buttons">
      {languageCategories.map((language) => (
        <li key={language}>
           <Button variant="contained"
           style={language === props.selected ? {color: 'yellow'} : null}
           onClick={() => props.onUpdateLanguage(language)}>
             {language}
           </Button>
        </li>
      ))}
      </ul>
  )
}

LanguagesNavbar.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

export default class PopularList extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      selectedLanguage: 'All',
      error: null,
      repos: null
    }
    this.changeLanguage = this.changeLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  changeLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      repos: null,
      error: null,

    })


    fetchRepos(selectedLanguage)
  .then((repos) => this.setState(
    {
      repos,
      error: null
    }
    ))
    .catch(() => {
      console.warn('Error fetching repo:', error)

    this.setState({
      error: 'Error fetching the repos'
    })
    })

  }

  isLoading(){
    return this.state.repos === null && this.state.error === null
  }
  render() {

    return (
      <React.Fragment>
        <LanguagesNavbar
        selected={this.state.selectedLanguage}
        onUpdateLanguage={this.changeLanguage}
        />
        {this.isLoading() && <p>LOADING</p>}
        {this.state.error && <p>{this.state.error}</p>}

        {this.state.repos && <pre>{JSON.stringify(this.state.repos, null, 2)}</pre>}
      </React.Fragment>

    )
  }
}