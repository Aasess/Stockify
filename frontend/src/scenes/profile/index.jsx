import React, { useEffect, useState } from 'react'

//REACT-BOOTSTRAP
import { Card, Badge, Button } from 'react-bootstrap'

//API
import UserAction from '../../api/user/action'

//REACT-ROUTER-DOM
import { useNavigate } from 'react-router-dom'

//COMPONENTS
import ChangePasswordModal from './changePasswordModal'

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null)
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false)

  const navigate = useNavigate()

  const fetchUserDetail = async () => {
    const response = await UserAction.userDetails()
    setUserDetails(response.detail)
  }

  const handleLogOutFunctionality = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    navigate('/login')
  }

  useEffect(() => {
    fetchUserDetail()
  }, [])

  return (
    <>
      <Card className="mt-3">
        {userDetails ? (
          <Card.Body>
            <Card.Title>
              <h1 className="fs-2 fw-bold">{userDetails.username}</h1>
            </Card.Title>
            <Card.Text>
              <p>{userDetails.email}</p>
              {userDetails.isAdmin ? (
                <Badge pill bg="danger">
                  Admin
                </Badge>
              ) : (
                <Badge pill bg="primary">
                  Employee
                </Badge>
              )}
            </Card.Text>
            <div className="d-flex gap-2 mt-4">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowPasswordChangeModal(true)}
              >
                Change Password
              </Button>
              <Button
                variant="success"
                size="sm"
                onClick={handleLogOutFunctionality}
              >
                Logout
              </Button>
            </div>
          </Card.Body>
        ) : null}
      </Card>

      {showPasswordChangeModal ? (
        <ChangePasswordModal
          id={userDetails?.id}
          show={showPasswordChangeModal}
          handleClose={() => setShowPasswordChangeModal(false)}
        />
      ) : null}
    </>
  )
}

export default Profile
