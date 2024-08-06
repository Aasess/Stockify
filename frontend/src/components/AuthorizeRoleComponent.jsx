import React from 'react'
import { checkIfUserIsAdmin } from '../helpers/checkIfUserIsAdmin'

const AuthorizeRoleComponent = ({ children }) => {
  const isAdmin = checkIfUserIsAdmin()

  if (isAdmin) {
    return children
  }
  return null
}

export default AuthorizeRoleComponent
