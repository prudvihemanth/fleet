const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('dotenv').config()
const routes = require('./server/routes/routes.js')
const tickets = require('./server/dump/Fullstack or Backend data.json')
const ticketModel = require('./server/models/ticketSchema')

const app = express()
const port = process.env.PORT


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});

//format timezone for tickets

tickets.map(ticket => {
    if(ticket.modifiedDate.includes("+")){
        let isoDate  = new Date(ticket.modifiedDate.split("+")[0].replace(/\s/g, ""));
        isoDate.setHours(isoDate.getHours() + parseFloat(ticket.modifiedDate.split("+")[1]))
        ticket.modifiedDate = isoDate.toISOString()
    }
    else if(ticket.modifiedDate.includes("-")){
        let isoDate  = new Date(ticket.modifiedDate.split("-")[0].replace(/\s/g, ""));
        isoDate.setHours(isoDate.getHours() - parseFloat(ticket.modifiedDate.split("-")[1]))
        ticket.modifiedDate = isoDate.toISOString()
    }

    if(ticket.submittedDate.includes("+")){
        let  isoDate  = new Date(ticket.submittedDate.split("+")[0].replace(/\s/g, ""));
        isoDate.setHours(isoDate.getHours() + parseFloat(ticket.submittedDate.split("+")[1]))
        ticket.submittedDate = isoDate.toISOString()

    }
    else if(ticket.submittedDate.includes("-")){
        let isoDate  = new Date(ticket.submittedDate.split("-")[0].replace(/\s/g, ""));
        isoDate.setHours(isoDate.getHours() - parseFloat(ticket.submittedDate.split("-")[1]))
        ticket.submittedDate = isoDate.toISOString()    }

});


const insertDump = () => {
    ticketModel.collection.insert(tickets, function (err, insertedRecords) {
        if (err) {
            return err;
        } else {
            console.log("Dump data inserted to Ticket Collection");
        }
    });
}

ticketModel.countDocuments({}, (err, count) => {
    if (count == 0) {
        insertDump();
    }
});


app.use('/api/tickets', routes)
app.listen(port, () => console.log(`Fleet app listening on port ${port}!`))