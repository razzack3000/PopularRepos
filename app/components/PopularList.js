import React from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import Button from '@mui/material/Button';
import { fetchRepos } from '../apis/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'

function LanguagesNavbar({selected, onUpdateLanguage}){

  const languageCategories = [ 'All', 'JS', 'Java', 'Python', 'CSS', 'Ruby'];
  return (
    <ul className="buttons">
      {languageCategories.map((language) => (
        <li key={language}>
           <Button variant="contained"
           style={language === selected ? {color: 'yellow'} : null}
           onClick={() => onUpdateLanguage(language)}>
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

function RepoCards ({ repos }) {
    return (
      <ul className='card-list'>

          {repos.map((langs, index) => (
            <li key={langs.html_url}>
              <h1>#{index+1}</h1>
              <img src={langs.owner.avatar_url}
              alt={langs.login}
              />
              <h3>
                <a href={langs.html_url}>{langs.owner.login}</a>
              </h3>
              <li>
                <FaUser color='black' size={22} />
                  {langs.name}
              </li>
              <li>
                <FaStar color='gold' size={22} />
                {langs.stargazers_count.toLocaleString()} stars
              </li>
              <li>
                <FaCodeBranch color='green' size={22} />
                {langs.forks.toLocaleString()} forks
              </li>
              <li>
                <FaExclamationTriangle color='red' size={22} />
                {langs.open_issues.toLocaleString()} open
              </li>

            </li>
          ))}

      </ul>

    )
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
  componentDidMount(){
    this.changeLanguage(this.state.selectedLanguage)
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
      <div>
        <LanguagesNavbar
        selected={this.state.selectedLanguage}
        onUpdateLanguage={this.changeLanguage}
        />
        {this.isLoading() && <p>LOADING</p>}
        {this.state.error && <p>{this.state.error}</p>}

        {this.state.repos[this.state.selectedLanguage] && <RepoCards repos={this.state.repos[this.state.selectedLanguage]} />}
      </div>

    )
  }
}
