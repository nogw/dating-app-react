import express from 'express'
import userCtrl from '../controllers/user.controller'
import messageCtrl from '../controllers/message.controller'

const router = express.Router()

router.route('/user/register')
  .post(userCtrl.register)

router.route('/user/login')
  .post(userCtrl.login)

router.route('/user/getUser')
  .post(userCtrl.getUser)

router.route('/message/newMessage')
  .post(messageCtrl.newMessage)

router.route('/message/getResponses')
  .post(messageCtrl.getResponses)

export default router