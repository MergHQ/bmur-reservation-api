const ilotalo = require('../integrations/ilotalo')

const getAllReservations = (req, res) =>
  ilotalo.getReservations()
    .then(reservations => res.json(reservations))

const getUpcomingReservations = (req, res) =>
  ilotalo.getReservations()
    .then(reservations => reservations.filter(r => r.starts && r.starts >= new Date()))
    .then(filteredReservations => res.json(filteredReservations))

const getPastReservations = (req, res) =>
  ilotalo.getReservations()
    .then(reservations => reservations.filter(r => r.starts && r.starts <= new Date()))
    .then(filteredReservations => res.json(filteredReservations))

module.exports = {
  getAllReservations,
  getUpcomingReservations,
  getPastReservations
}