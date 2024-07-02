import React from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'

import Home from '../pages/Home'
import Tours from '../pages/Tours'
import TourDetails from '../pages/TourDetails'
import SearchResultList from '../pages/SearchResultList'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ThankYou from '../pages/ThankYou'
import ManagerTours from '../components/Navbar/ManagerTour';
import Admin from '../components/Navbar/Admin'
import UserManager from '../pages/Admin/UserManager'
import Profile from '../pages/Profile'
import Tour from '../pages/ManagerTour/Tour'
import Booking from '../pages/ManagerTour/booking'
import ProfileManager from '../pages/ProfileManager'
import TourHistory from '../pages/TourHistory'
import Cancel from '../pages/Cancel'
import CompletedTour from '../pages/ManagerTour/CompletedTour'
const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/profilemanager' element={<ProfileManager/>}/>

        <Route path='/tours' element={<Tours/>}/>

        <Route path='/admin' element={<Admin/>}/>
        <Route path='/usermanager' element={<UserManager/>}/>
        <Route path='/tourmanager' element={<Tour/>}/>
        <Route path='/completed' element={<CompletedTour/>}/>
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/tours/:id' element={<TourDetails/>}/>
        <Route path='/history/:id' element={<TourHistory/>}/>

        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/thanh-you' element={<ThankYou/>}/>
        <Route path='/cancel' element={<Cancel/>}/>
        <Route path='/tours/search' element={<SearchResultList/>}/>
        
    </Routes>
  )
}

export default Routers