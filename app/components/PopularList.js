import React from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import Button from '@mui/material/Button';


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
      selectedLanguage: 'All'
    }
    this.changeLanguage = this.changeLanguage.bind(this)
  }

  changeLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage
    })
  }
  render() {

    return (
      <div>
        <LanguagesNavbar
        selected={this.state.selectedLanguage}
        onUpdateLanguage={this.changeLanguage}
        />
      </div>

    )
  }
}