import { parse as parseHTML } from 'node-html-parser'
import { parse } from 'date-fns'

const simplifyHtml = data =>
  /<tbody>(.*)<\/tbody>/g.exec(data.replace(/\n/g, ''))[0]

const getReservations = () => {
  const parseReservations = data => {
    const getId = href => href && Number(href.split('&id=')[1])
    const parseDate = dateText =>
      parse(dateText, 'dd.MM.yyyy HH:mm:ss', new Date())
    const serializeRow = el => ({
      id: getId(
        el
          .querySelector('td:nth-child(2)')
          .querySelector('a')
          .getAttribute('href')
      ),
      starts: parseDate(el.querySelector('td:nth-child(1)').text),
      name: el.querySelector('td:nth-child(2)').text,
      association: el.querySelector('td:nth-child(3)').text,
      closed: el.querySelector('td:nth-child(4)').text === 'suljettu'
    })

    const root = parseHTML(simplifyHtml(data))
    const rowSelector = 'tbody > tr'

    const [_, ...rows] = root.querySelectorAll(rowSelector)

    return rows.map(serializeRow)
  }

  return fetch('https://ilotalo.matlu.fi/index.php?page=reservation&f=3')
    .then(res => res.text())
    .then(parseReservations)
}

export default {
  getReservations
}
