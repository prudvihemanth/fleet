const express = require('express')
const router = express.Router()
const ticketController = require('../controllers/ticketController.js')

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/getAllTickets', ticketController.getAllTickets)
router.put('/updateTicket', ticketController.updateTicket)

module.exports = router