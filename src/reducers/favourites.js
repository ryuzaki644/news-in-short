const initialState = {
  favourites: {},
  allCategories: []
}

// Function for toggling the source
const updateSource = (stateFavourites, actionCategory, actionSource, indexOfSource) => {
  if (indexOfSource === -1) {
    return Object.assign({}, stateFavourites, {
      [actionCategory]: stateFavourites[actionCategory].concat(actionSource)
    })
  }

  const sourceInState = stateFavourites[actionCategory]
  const leftArray = sourceInState.slice(0, indexOfSource)
  const rightArray = sourceInState.slice(indexOfSource + 1)
  return Object.assign({}, stateFavourites, {
    [actionCategory]: leftArray.concat(rightArray)
  })
}

export const favouriteSourcesWithCategory = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FAVOURITES':
      switch (state.favourites[action.category]) {
        case undefined:
          const newFavCategory = Object.assign({}, state.favourites, {[action.category]: [action.source]})
          const allCategories = state.allCategories.concat(action.category)
          return {...state, favourites: newFavCategory, allCategories}
        default:
          const indexOfSource = state.favourites[action.category].indexOf(action.source)
          return {
            ...state,
            favourites: updateSource(state.favourites, action.category, action.source, indexOfSource)
          }
      }
    default:
      return state
  }
}
