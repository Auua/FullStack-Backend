const express = require('express'),
  //persons = require('./api/persons'),
  bodyParser = require('body-parser'),
  app = express()  

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]
app.use(bodyParser.json())

const generateId = () => {
  const maxId = persons.length > 0 ? persons.map(n => n.id).sort().reverse()[0] : 1
  return maxId + 1
}

app.get('/info', (req, res) => {
  const date = new Date()
  let info = 
    `<h5>Puhelinluettelossa on ${persons.length} henkilön tiedot</h5>
    <p>${date}</p>`
  res.send(info)
})

app.get('/persons', (req, res) => {
  res.json(persons)
})

app.post('/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({error: 'content missing'})
  }

  if (persons.find(person => person.name === body.name)) {
    return res.status(400).json({error: 'name must be unique'})
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  res.json(person)
})

app.get('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if ( person ) {
    res.json(person)
  } else {
    res.status(404).end({error: 'not found'})
  }
})

app.delete('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end({error: 'deleted'})
})
  
const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)