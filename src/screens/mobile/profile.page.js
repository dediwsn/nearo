import React, { Component } from 'react'
import GoBackPage from '../../components/gobackpage/GoBackPage'
import Profile from '../../components/profile/Profile'

class ProfilePage extends Component {
  render = () => <GoBackPage children={ <Profile /> } />
}

export default ProfilePage
