import React from 'react'
import './index.css'

export const Card = ({articles}) => {
  console.log(articles)
  return (
    <div className='card-container'>
      <div className='card-image'>
        {articles.urlToImage
          ? <img src={articles.urlToImage} alt='source img' />
          : <div className='replace-image'> No image available</div>
        }
      </div>
      <div className='card-content'>
        <div className='card-header'>
          <h3>
            {articles.title}
          </h3>
        </div>
        <p>By {articles.author ? articles.author : articles.source.name}</p>
        <div className='card-body'>
          <p>{articles.description}</p>
        </div>
        <div className='card-footer'>
          <a href={articles.url} target='__blank'> sources: {articles.source.name} </a>
        </div>
      </div>
    </div>
  )
}
