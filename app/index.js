import { Router } from 'itty-router'
import { getReservations } from './integrations/ilotalo'

// Create a new router
const router = Router()

const {
  getAllReservations,
  getUpcomingReservations,
  getPastReservations
} = require('./controllers/reservations')

const withAssociation = handler => ({ params, query }) =>
  handler(params.association, query.from)
const handle = handler => ({ query }) => handler(undefined, query.from)

router.get('/reservations/all', handle(getAllReservations))
router.get(
  '/reservations/all/association/:association',
  withAssociation(getAllReservations)
)

router.get('/reservations/upcoming', handle(getUpcomingReservations))
router.get('/reservations/past', handle(getPastReservations))
router.get(
  '/reservations/upcoming/association/:association',
  withAssociation(getUpcomingReservations)
)
router.get(
  '/reservations/past/association/:association',
  withAssociation(getPastReservations)
)

addEventListener('fetch', e => e.respondWith(router.handle(e.request)))

addEventListener('scheduled', e => {
  e.waitUntil(
    getReservations().then(reservations =>
      ilotalo.put('calendar', JSON.stringify(reservations))
    )
  )
})
