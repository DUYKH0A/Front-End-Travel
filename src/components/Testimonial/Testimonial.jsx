import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'

const Testimonial = () => {

    const settings = {
        dots:true,
        infinite:true,
        autoplay:true,
        speed:1000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive:[
            {
                breakpoint:992,
                settings:{
                    slidesToShow:2,
                    slidesToScroll:1,
                    infinite:true,
                    dots:true,
                },
            },
            {
                breakpoint:576,
                settings:{
                    slidesToShow:1,
                    slidesToScroll:1,
                    infinite:true,
                    dots:true,
                },
            },
            
        ]
    }


  return (
    <Slider {...settings}>
        <div className="testimonal py-4 px-3">
            <p>asdasdadassa</p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01} alt="ava01" className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className="mb-0 mt-3">Jonh Dow</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonal py-4 px-3">
            <p>asdasdadassa</p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava02} alt="ava01" className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className="mb-0 mt-3">Jonh Dow</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonal py-4 px-3">
            <p>asdasdadassa</p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava03} alt="ava01" className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className="mb-0 mt-3">Jonh Dow</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonal py-4 px-3">
            <p>asdasdadassa</p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava03} alt="ava01" className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className="mb-0 mt-3">Jonh Dow</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonal py-4 px-3">
            <p>asdasdadassa</p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava03} alt="ava01" className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className="mb-0 mt-3">Jonh Dow</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
    </Slider>
  )
}

export default Testimonial