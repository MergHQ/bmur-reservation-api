const express = require('express')
const app = express()

const {
  getAllReservations, 
  getUpcomingReservations,
  getPastReservations 
} = require('./controllers/reservations')

app.get('/reservations/all', getAllReservations)
app.get('/reservations/all/association/:association', getAllReservations)

app.get('/reservations/upcoming', getUpcomingReservations)
app.get('/reservations/past', getPastReservations)
app.get('/reservations/upcoming/association/:association', getUpcomingReservations)
app.get('/reservations/past/association/:association', getPastReservations)

app.listen(process.env.PORT || 3000, () => console.log('bmur reservation api listening on port 3000!'))