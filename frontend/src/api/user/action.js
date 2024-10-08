import { UserEndPoint } from './endpoint'
import apiClient from '../apiClient'
import displayToast from '../../helpers/displayToast'

apiClient.defaults.withCredentials = true
class UserAction {
  static async userRegistration(formData) {
    try {
      const response = await apiClient.post(UserEndPoint.register, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        rePassword: formData.confirmPassword,
      })
      displayToast(response.data.message, response.data.status)
      return response.data
    } catch (error) {
      displayToast('There was an error registering the user!', 'error')
      throw error
    }
  }

  static async userLogin(formData) {
    try {
      const response = await apiClient.post(UserEndPoint.login, {
        username: formData.username,
        password: formData.password,
      })

      // Save to localStorage
      localStorage.setItem('userId', response?.data?.data?.id)
      localStorage.setItem('username', response?.data?.data?.username)

      displayToast(response.data.message, response.data.status)
      return response.data
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }

  static async userResetPasswordLink(formData) {
    try {
      const response = await apiClient.post(UserEndPoint.resetPasswordLink, {
        email: formData.email,
      })
      displayToast(response.data.message, response.data.status)
      return response.data
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }

  static async userResetPassword(id, formData) {
    try {
      const response = await apiClient.post(
        UserEndPoint.resetPassword.replace('id', id),
        formData
      )
      displayToast(response.data.message, response.data.status)
      return response.data
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }

  static async userDetails() {
    try {
      const userId = localStorage.getItem('userId')
      const username = localStorage.getItem('username')

      if (!userId || !username) {
        throw new Error('User is not logged in')
      }

      const response = await apiClient.get(
        UserEndPoint.userDetail.replace('id', userId)
      )
      return response.data
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }

  static async userChangePassword(id, formData) {
    try {
      const response = await apiClient.post(
        UserEndPoint.resetPassword.replace('id', id),
        formData
      )

      displayToast(response.data.message, response.data.status)
      return response.data
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }
}

export default UserAction
