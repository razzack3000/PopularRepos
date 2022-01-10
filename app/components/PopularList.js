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
      repos: {}

    }
    this.changeLanguage = this.changeLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  changeLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,

    })

  if(!this.state.repos[selectedLanguage]){
    fetchRepos(selectedLanguage)
    .then((data) => {
      this.setState(({repos}) => ({
        repos: {
          ...repos,
          [selectedLanguage]: data
        }

      }))

    })
      .catch(() => {
        console.warn('Error fetching repo:', error)

      this.setState({
        error: 'Error fetching the repos'
      })
    })
    }
  }


  isLoading(){
    const { selectedLanguage, repos, error } = this.state
    return !repos[selectedLanguage] && error === null
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

        {this.state.repos[this.state.selectedLanguage] && <pre>{JSON.stringify(this.state.repos[this.state.selectedLanguage], null, 2)}</pre>}
      </React.Fragment>

    )
  }
}
