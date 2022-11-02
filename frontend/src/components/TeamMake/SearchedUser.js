import React from 'react'

export default function SearchedUser(props) {
    const userInfo = props.user
  return (
    <div>
      <h1>{userInfo.userEmail}</h1>
    </div>
  )
}
