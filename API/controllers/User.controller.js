import bcrypt from 'bcrypt'
import { UserServices } from '../services/index.js'
import transporter from '../config/emailConfig.js'

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

  static changeUserPassword = async (req, res) => {
    try {
      const { password, confirmationPassword } = req.body

      if (password && confirmationPassword) {
        if (password.trim() === confirmationPassword.trim()) {
          const hashedPassword = await bcrypt.hash(password, 10)
          await UserServices.updatePassword(req.userId, hashedPassword)
          res
            .status(201)
            .send({ status: 'success', message: 'Password reset completed' })
        } else {
          throw "Passwords don't match"
        }
      } else {
        throw 'All fields are required'
      }
    } catch (error) {
      res.send({ status: 'failed', message: error })
    }
  }

  static sendPasswordResetEmail = async (req, res) => {
    try {
      const { email } = req.body

      if (email) {
        //find the user from DB
        const foundUser = await UserServices.findByEmail(email)
        if (foundUser) {
          //create link to send as email for user to reset the password
          const link = `http://localhost:8000/api/user/reset-password/${foundUser._id}`

          //send the link as email
          await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: foundUser.email,
            subject: 'Password Reset Link',
            html: `<a href=${link}>Click to reset password</a>`,
          })

          //successful json msg
          res.status(201).send({
            status: 'success',
            message: 'Password reset link sent to email',
            link: link,
          })
        } else {
          throw 'Email not registered'
        }
      } else {
        throw 'Email is required'
      }
    } catch (error) {
      res.send({ status: 'failed', message: error })
    }
  }

  static resetUserPassword = async (req, res) => {
    try {
      const { password, confirmationPassword } = req.body
      const { id: userId } = req.params

      if (password && confirmationPassword) {
        if (password === confirmationPassword) {
          //update the password based on payload which contains userId
          const hashedPassword = await bcrypt.hash(password, 10)
          UserServices.updatePassword(userId, hashedPassword)

          res.status(201).send({
            status: 'success',
            message: 'Password successfully reset',
          })
        } else throw "Passwords don't match"
      } else throw 'All fields are required'
    } catch (error) {
      res.send({ status: 'failed', message: error })
    }
  }
}

export default UserController
