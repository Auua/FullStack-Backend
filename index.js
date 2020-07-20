const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  cors = require('cors'),
  app = express(),
  persons = require('./api/mongo')

morgan.token('info', function getInfo(req) {
  return JSON.stringify({ name: req.body.name, number: req.body.number })
})

app.use(bodyParser.json())
app.use(
  morgan(':method :url :status :info :res[content-length] - :response-time ms')
)
app.use(cors())
app.use(express.static('build'))

// const generateId = () => {
//   const maxId = persons.length > 0 ? persons.map(n => n.id).sort().reverse()[0] : 1
//   return maxId + 1
// }

app.get('/info', (req, res) => {
  const date = new Date()
  persons.countAll().then((result) => {
    const info = `<h5>Puhelinluettelossa on ${result} henkilön tiedot</h5>
    <p>${date}</p>`
    res.send(info)
  })
})

app.get('/api/persons', (req, res) => {
  persons.findAll(req, res)
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
  persons.addPerson(req, res)
})

app.get('/api/persons/:id', (req, res) => {
  persons.findById(req, res)
})

app.delete('/api/persons/:id', (req, res) => {
  persons.removePerson(req, res)
})

app.put('/api/persons/:id', (req, res) => {
  persons.updatePerson(req, res)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
