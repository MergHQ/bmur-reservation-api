import { filter, identity } from 'ramda'

const filterUpcoming = filter(r => r.starts && new Date(r.starts) >= new Date())
const filterPast = filter(r => r.starts && new Date(r.starts) <= new Date())
const filterByAssociation = association =>
  filter(r => r.association.toLowerCase() === association.toLowerCase())
const filterFrom = from => filter(r => new Date(r.starts) >= new Date(from))

const toJsonResponse = data =>
  new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  })

const getCached = () => ilotalo.get('calendar').then(JSON.parse)

export const getAllReservations = (association, from) =>
  getCached()
    .then(association ? filterByAssociation(association) : identity)
    .then(from ? filterFrom(from) : identity)
    .then(toJsonResponse)

export const getUpcomingReservations = (association, from) =>
  getCached()
    .then(filterUpcoming)
    .then(association ? filterByAssociation(association) : identity)
    .then(from ? filterFrom(from) : identity)
    .then(toJsonResponse)

export const getPastReservations = (association, from) =>
  getCached()
    .get('calendar')
    .then(filterPast)
    .then(association ? filterByAssociation(association) : identity)
    .then(from ? filterFrom(from) : identity)
    .then(toJsonResponse)
