const initialState = {
  favourites: {},
  allCategories: []
}

const concatUniqSources = (existingSources, newSource) => {
  // existting sources will be array of sources for that category
  // new source is a string
  const filterSource = existingSources.filter(source => source === newSource)
  const doesSourceExist = filterSource.length !== 0
  return doesSourceExist ? existingSources : existingSources.concat(newSource)
}

export const favouriteSourcesWithCategory = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FAVOURITES':
      if (state.favourites[action.category] === undefined) {
        const newFavCategory = Object.assign({}, state.favourites, {[action.category]: [action.source]})
        const allCategories = state.allCategories.concat(action.category)
        return {...state, favourites: newFavCategory, allCategories}
      }
      const updatedFavCategory = Object.assign(
          {},
          state.favourites,
          {[action.category]: concatUniqSources(state.favourites[action.category], action.source)})
      return {...state, favourites: updatedFavCategory}
    default:
      return state
  }
}
