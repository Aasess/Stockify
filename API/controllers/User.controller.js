import bcrypt from 'bcrypt'
import { UserServices } from '../services/index.js'

class UserController {
  static userRegistration = async (req, res) => {
    try {
      const { username, email, password, rePassword } = req.body

      if (!username || !email || !password || !rePassword) {
        throw new Error('All fields are required')
      }

      const existingUser = await UserServices.findByEmail(email)
      if (existingUser) {
        throw new Error('User already exists')
      }

      if (password !== rePassword) {
        throw new Error("Passwords don't match")
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      await UserServices.createUser(username, email, hashedPassword)

      res
        .status(201)
        .send({ status: 'success', message: 'Registration successful' })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static userLogin = async (req, res) => {
    try {
      const { username, password } = req.body

      //try to find the user with that username
      const foundUser = await UserServices.findByUsername(username)

      //now if there is found user then compare the entered request password with founduser password
      // don't use === to compare the password
      if (foundUser) {
        const samePassword = await bcrypt.compare(password, foundUser.password)
        if (samePassword) {
          //save to session
          req.session.userId = foundUser.id
          res.status(201).send({
            status: 'success',
            message: 'Login successful',
          })
        } else {
          throw 'Username or password not match'
        }
      } else {
        throw 'User not found'
      }
    } catch (error) {
      res.send({ status: 'failed', message: error })
    }
  }
}

export default UserController
