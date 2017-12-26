import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import {Link} from 'react-router-dom'
import { Card } from './components/cards/index'
const url = process.env.REACT_APP_URL
const apiKey = process.env.REACT_APP_SECRET_CODE

const favouritesObject = {
  general: ['cbs-news', 'the-huffington-post', 'the-telegraph', 'time'],
  technology: ['crypto-coins-news', 'techcrunch'],
  business: ['cnbc'],
  sport: ['the-sport-bible']
}
const favouriteCategories = ['general', 'technology', 'business', 'sport']

const allSources = favouriteCategories.reduce((acc, categ) => {
  return acc + favouritesObject[categ].join(',')
}, '')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articles: []
    }
    this.allSources = this.allSources.bind(this)
    this.sortBySource = this.sortBySource.bind(this)
  }

  componentDidMount () {
    const allSources = favouriteCategories.reduce((acc, categ) => {
      return acc + favouritesObject[categ].join(',')
    }, '')
    const encodeAPIKey = encodeURI(apiKey)
    // console.log(allSources)
    // console.log(`${url}/everything?sources=${allSources}&language=en&apiKey=${encodeAPIKey}`)
    axios.get(`${url}/everything?sources=${allSources}&language=en&apiKey=${encodeAPIKey}`)
    .then(res => {
      // console.log(res, 'in mount data')
      const { articles } = res.data
      this.setState({
        articles
      })
      return res.data
    }).catch(err => {
      console.log(err)
    })
  }

  allSources (allCategories, favouritesObject) {
    return allCategories.reduce((acc, categ) => {
      return acc.concat(favouritesObject[categ])
    }, [])
  }

  sortBySource (articles, allCategories, favouritesObject) {
    const newsBySource = {}
    const allSources = this.allSources(favouriteCategories, favouritesObject)

    allSources.map(source => {
      if (newsBySource[source] === undefined) {
        newsBySource[source] = []
      }
      return articles.map(article => {
        if (article.source.id === source) {
          Object.assign(newsBySource, {[source]: newsBySource[source].concat(article)})
        }
        return article
      })
    })
    return newsBySource
  }

  render () {
    const {articles} = this.state
    const newsBySource = this.sortBySource(articles, favouriteCategories, favouritesObject)
    const CATEGORIES = ['business', 'entertainment', 'gaming', 'general', 'health-and-medical', 'music', 'politics', 'science-and-nature', 'sport', 'technology']
    return (
      <div className='App'>
        <div className='App-intro'>
          <h2>
            News-Inshort
          </h2>
        </div>
        <div className='category-container'>
          {CATEGORIES.map(categ => {
            return <h4 className='category-item'><Link to={`/${categ}`}> {categ} </Link></h4>
          })}
        </div>
        <div>
          {favouriteCategories.map(categ => {
            return <div className='news-card-favourites' key={categ}>
              <h1 className='news-card-header'>{categ}</h1>
              <div className='news-card-container'>
                {
                  favouritesObject[categ].map((source, i) => {
                    return newsBySource[source].map((article, i) => {
                      return <Card key={i} articles={article} />
                    })
                  })
                }
              </div>
            </div>
          })}
        </div>
        <div className='news-card-container'>
          {
            articles.length === 0
            ? <h1 className='App-intro'> Couldnot load the News</h1>
            : articles.map(entry => {
              return <Card articles={entry} />
            })
          }
        </div>
      </div>
    )
  }
}

export default App
