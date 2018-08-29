const express = require('express')
const app = express()

const {
  getAllReservations, 
  getUpcomingReservations,
  getPastReservations 
} = require('./controllers/reservations')

app.get('/reservations/all', getAllReservations)
app.get('/reservations/upcoming', getUpcomingReservations)
app.get('/reservations/past', getPastReservations)

app.listen(process.env.PORT || 3000, () => console.log('bmur reservation api listening on port 3000!'))