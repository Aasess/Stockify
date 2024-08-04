import bcrypt from 'bcrypt'
import { UserServices } from '../services/index.js'
import transporter from '../config/emailConfig.js'
import dotenv from 'dotenv'

dotenv.config()
class UserController {
  static isUserLoggedIn = async (req, res) => {
    try {
      const foundUser = await UserServices.findById(req.params.id)
      if (foundUser) {
       const filterDetail = {
         id: foundUser.id,
         username: foundUser.username,
         email: foundUser.email,
         isAdmin: foundUser.isAdmin,
       }
       return res.status(201).send({ status: 'success', detail: filterDetail })
      }
      throw new Error('Access denied. Please log in.')
    } catch (error) {
      res.send({ status: 'failed', message: error })
    }
  }

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
          const { id, username } = foundUser
          //save to session
          req.session.userId = foundUser.id
          res.status(201).send({
            status: 'success',
            message: 'Login successful',
            data: { id, username },
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
      const { id: userId } = req.params

      if (password && confirmationPassword) {
        if (password.trim() === confirmationPassword.trim()) {
          const hashedPassword = await bcrypt.hash(password, 10)
          await UserServices.updatePassword(userId, hashedPassword)
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
          const link = `${
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:3000'
              : 'https://stockify-smoky.vercel.app'
          }/reset-password/${foundUser.id}`

          //send the link as email
          await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: foundUser.email,
            subject: 'Password Reset Link',
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
                <h2 style="color: #4CAF50; text-align: center;">Password Reset Request</h2>
                <p>Hi ${foundUser.username || 'User'},</p>
                <p>We received a request to reset your password. Please click the button below to reset your password:</p>
                <div style="text-align: center; margin: 20px 0;">
                  <a href="${link}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
                </div>
                <p>If you did not request a password reset, please ignore this email. This link will expire in 30 minutes.</p>
                <p>Thanks,<br>Stockify Team</p>
              </div>
            </div>
          `,
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
