import axios from 'axios'
import { UserEndPoint } from './endpoint'

axios.defaults.withCredentials = true
class UserAction {
  static async userRegistration(formData) {
    try {
      const response = await axios.post(UserEndPoint.register, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        rePassword: formData.confirmPassword,
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async userLogin(formData) {
    try {
      const response = await axios.post(UserEndPoint.login, {
        username: formData.username,
        password: formData.password,
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async userResetPasswordLink(formData) {
    try {
      const response = await axios.post(UserEndPoint.resetPasswordLink, {
        email: formData.email,
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async userResetPassword(id, formData) {
    try {
      const response = await axios.post(
        UserEndPoint.resetPassword.replace('id', id),
        formData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async userDetails() {
    try {
      const response = await axios.get(UserEndPoint.userDetail)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default UserAction
