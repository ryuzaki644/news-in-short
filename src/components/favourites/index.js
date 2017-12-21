import React, {Component} from 'react'
import {connect} from 'react-redux'
import { setFavourites } from '../../actions/favourites'
import {sources} from '../../actions/sources'
import classNames from 'classnames'
import './favourites.css'

export class FavouritesComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sources: [],
      selectedSources: {}
    }
    this.getSources = this.getSources.bind(this)
    this.uniqueCategories = this.uniqueCategories.bind(this)
    this.renderByCategories = this.renderByCategories.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.getSourcesObj = this.getSourcesObj.bind(this)
    this.isSourcePresent = this.isSourcePresent.bind(this)
    this.postFavourites = this.postFavourites.bind(this)
  }

  componentDidMount () {
    this.getSources()
  }

  handleClick (e) {
    const {dispatchSelectedFavourites} = this.props
    const [sourceId, category] = e.target.id.split(' ')
    dispatchSelectedFavourites(sourceId, category)
  }

  postFavourites (e) {
    console.log(e.target.id)
    // make favourites post from the store
    const {favourites} = this.props
    console.log(favourites)
    return favourites
  }
  getSources () {
    sources.then(res => {
      const sources = res.sources
      this.setState({sources})
    })
  }

  getSourcesObj (sources) {
    const sourceName = {}
    sources.map(source => {
      Object.assign(sourceName, {[source.id]: false
      })
      return source
    })
    return sourceName
  }

  uniqueCategories (sources) {
    const allCategories = sources.map(source => source.category)
    const uniqueValues = [...new Set(allCategories)]
    return uniqueValues
  }

  categoriesObject (sources, categories) {
    const catObject = {}
    categories.map(category => {
      Object.assign(catObject, {[category]: sources.filter(source => source.category === category)})
      return category
    })
    return catObject
  }

  renderByCategories (sources, favourites) {
    const categoriesArray = this.uniqueCategories(sources)
    const categoriesObj = this.categoriesObject(sources, categoriesArray)
    return categoriesArray.map(category => {
      return (
        <div key={category} className=''>
          <h1>
            {category}
          </h1>
          <div className='categories-container'>
            {
              categoriesObj[category].map(source => (
                <div
                  className={this.isSourcePresent(favourites, category, source.id)
                    ? classNames('source-card-selected', 'source-card')
                    : 'source-card'}
                  id={`${source.id} ${category}`}
                  onClick={this.handleClick}
                  key={source.id}
                     >
                  {source.name}
                </div>)
              )
            }
          </div>
        </div>
      )
    })
  }

  isSourcePresent (favourites, category, source) {
    if (favourites[category] === undefined) return false
    if (favourites[category].length === 0) return false
    const filteredSourceArr = favourites[category].filter(src => src === source)
    return filteredSourceArr.length !== 0
  }

  render () {
    const {sources} = this.state
    const {favourites} = this.props
    return (
      <div className='container'>
        <button className='button' id='updateFavourites' onClick={this.postFavourites}>Update Favourites</button>
        {sources.length === 0
          ? (<h1>
              loading...
            </h1>)
          : this.renderByCategories(sources, favourites)
         }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  favourites: state.favouriteSourcesWithCategory.favourites,
  allCategories: state.favouriteSourcesWithCategory.allCategories
})

const mapDispatchToProps = dispatch => ({
  dispatchSelectedFavourites (source, category) {
    dispatch(setFavourites(source, category))
  }
})

export const Favourites = connect(mapStateToProps, mapDispatchToProps)(FavouritesComponent)
