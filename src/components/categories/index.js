import React, {Component} from 'react'
import axios from 'axios'
import {Card} from '../cards'
import logo from '../../logo.svg'
import './categories.css'
const {REACT_APP_URL: apiUrl, REACT_APP_SECRET_CODE: apiKey} = process.env

const checkStatusCode = statusCode => {
  if (statusCode >= 200 && statusCode < 300) {
    return false
  }
  return true
}

class Categories extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articles: [],
      loading: false,
      err: false
    }
  }

  componentWillMount () {
    console.log(logo)
    this.setState({
      loading: true
    })
  }
  componentDidMount () {
    const {url} = this.props.match
    axios.get(`${apiUrl}/top-headlines?category=${url.slice(1)}&language=en&apiKey=${apiKey}`)
         .then(res => {
           this.setState({
             err: checkStatusCode(res.status),
             loading: true
           })
           return res.data.articles
         })
         .then(articles => {
           this.setState({
             articles,
             loading: false
           })
         })
         .catch(err => {
           console.log('here')
           this.setState({
             err: true
           })
           console.log(err)
         })
  }
  // console.log(props.match.url.slice(1))
  render () {
    const {articles, loading, err} = this.state
    console.log(articles)
    return loading || err ? (
      <div>
        <img className='App-logo' src={logo} alt='logo' />
      </div>) : (
        <div className='news-card-container'>
          {
            articles.map((article, index) => {
              return <Card articles={article} key={index} />
            })
          }
        </div>
    )
  }
}

export default Categories
