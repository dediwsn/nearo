import React, { Component } from 'react'
import GoBackPage from '../../components/shared/gobackpage/GoBackPage'
import PostView from '../../components/postview/PostView'

class ProfilePage extends Component {
  render = () => <GoBackPage children={ <PostView /> } />
}

export default ProfilePage
