import { combineReducers } from 'redux'
import {favouriteSourcesWithCategory} from './favourites'

const newsStore = combineReducers({favouriteSourcesWithCategory})

export default newsStore
