const ilotalo = require('../integrations/ilotalo')
const R = require('ramda')

const filterUpcoming =
  R.filter(r => r.starts && r.starts >= new Date())
const filterPast =
  R.filter(r => r.starts && r.starts <= new Date())
const filterByAssociation = association =>
  R.filter(r => r.association.toLowerCase() === association.toLowerCase())

const getAllReservations = (req, res) =>
  ilotalo.getReservations()
    .then(req.params.association ? filterByAssociation(req.params.association) : R.identity)
    .then(reservations => res.json(reservations))

const getUpcomingReservations = (req, res) =>
  ilotalo.getReservations()
    .then(filterUpcoming)
    .then(req.params.association ? filterByAssociation(req.params.association) : R.identity)
    .then(reservations => res.json(reservations))

const getPastReservations = (req, res) =>
  ilotalo.getReservations()
    .then(filterPast)
    .then(req.params.association ? filterByAssociation(req.params.association) : R.identity)
    .then(reservations => res.json(reservations))

module.exports = {
  getAllReservations,
  getUpcomingReservations,
  getPastReservations
}