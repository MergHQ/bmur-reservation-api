const R = require('ramda')

const filterUpcoming = R.filter(
  r => r.starts && new Date(r.starts) >= new Date()
)
const filterPast = R.filter(r => r.starts && new Date(r.starts) <= new Date())
const filterByAssociation = association =>
  R.filter(r => r.association.toLowerCase() === association.toLowerCase())

const toJsonResponse = data =>
  new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  })

const getCached = () => ilotalo.get('calendar').then(JSON.parse)

const getAllReservations = association =>
  getCached()
    .then(association ? filterByAssociation(association) : R.identity)
    .then(toJsonResponse)

const getUpcomingReservations = association =>
  getCached()
    .then(filterUpcoming)
    .then(association ? filterByAssociation(association) : R.identity)
    .then(toJsonResponse)

const getPastReservations = association =>
  getCached()
    .get('calendar')
    .then(filterPast)
    .then(association ? filterByAssociation(association) : R.identity)
    .then(toJsonResponse)

module.exports = {
  getAllReservations,
  getUpcomingReservations,
  getPastReservations
}
