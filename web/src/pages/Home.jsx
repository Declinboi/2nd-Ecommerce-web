import React from 'react'
import Hero from '../components/Hero'
import { useNavigate } from 'react-router'
import useLogout from '../Hooks/useLogout'

const Home = () => {
const navigate = useNavigate()
const logout = useLogout()

const signOut = async () => {
  await logout()
  navigate('/login')
}



  return (
    <div>
      <Hero/>
    </div>
  )
}

export default Home