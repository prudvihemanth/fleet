const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticketSchema = new Schema({    
    description: { type: String, required: true },
    feature: { type: String, required: true },
    priority: { type: Number, min: 1},
    status: { type: String, required: true },
    submittedBy: { type: String, required: true },
    modifiedDate: { type: String, required: true },
    submittedDate: { type: String, required: true }
  });
  
module.exports = mongoose.model('Ticket', ticketSchema);
