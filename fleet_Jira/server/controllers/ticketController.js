const ticketModel = require('../models/ticketSchema')
const ticketController = {}

ticketController.getAllTickets = (req, res) => {
    ticketModel.find({}, (err, tickets) => {
        if (err) {
            res.send({message: 'error fetching tickets'})
        }
        else {
            res.send(tickets);
        }
    })
}

ticketController.updateTicket = (req, res) => {
    ticketModel.updateOne({_id:req.body._id}, req.body, (err, ticket) => {
        if (err) {
            res.send({message: 'error updating ticket'})
            console.log(err)

        }
        else {
            res.send({message: 'ticket updated successfully'})

        }
    })
}

module.exports = ticketController;