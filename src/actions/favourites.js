export const setFavourites = (source, category) => {
  return {
    type: 'SET_FAVOURITES',
    category,
    source
  }
}

// for making post request of favourites,
// give a update/submit favourites button onClick of submit make the post request
