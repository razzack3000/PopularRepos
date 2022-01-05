import React from 'react'
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';


export default class PopularList extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      selectedLanguage: 'All'
    }
  }

  changeLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage
    })
  }
  render() {
    const languageCategories = [ 'All', 'JS', 'Java', 'Python', 'CSS', 'Ruby'];

    return (
      <ul className="buttons">
      {languageCategories.map((language) => (
        <li key={language}>
           <Button variant="contained"
           style={language === this.state.selectedLanguage ? {color: 'yellow'} : null}
           onClick={() => this.changeLanguage(language)}>
             {language}
           </Button>
        </li>
      ))}
      </ul>

    )
  }
}