import axios from 'axios'
import { UserEndPoint } from './endpoint'

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
}

export default UserAction
