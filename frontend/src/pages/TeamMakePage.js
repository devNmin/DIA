import React from 'react'
import UserSearch from '../components/TeamMake/UserSearch'
import { useHistory } from 'react-router-dom'

export default function TeamMakePage() {
    const history = useHistory();
    const goIpInsert = () => {
        history.push('/ipInsert')
    }
  return (
    <div>
      <UserSearch></UserSearch>
      <button onClick={() => {goIpInsert()}}>CONNECT SERVER</button>
    </div>
  )
}
