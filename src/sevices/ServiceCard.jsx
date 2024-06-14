import React from 'react'
import './service-card.css'
const ServiceCard = ({item}) => {
  
  const {imgUrl, tieude, Placeofdeparture} = item;
    return (
    <div className='service__item'>
        <div className='service__img'>
            <img src={imgUrl} alt=''/>
        </div>
        <h5>{tieude}</h5>
        <p>{Placeofdeparture}</p>
    </div>
  )
}

export default ServiceCard