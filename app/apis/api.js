export function fetchRepos(language){
  return fetch(window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`))
  .then((result) => result.json())
    .then((data) => {
      if(!data.items){
        throw new Error('No more requests')
      }
      return data.items
    })
  }
