const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

const url = process.env.MONGODB_URI


mongoose.connect(url)

const PersonSchema = mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', PersonSchema)

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}
exports.countAll = () => {
  return Person
  .count()
  // Person
  //   .count()
  //   .then(result => 
  //     result
  //   )
}

exports.findAll = (req, res) => {
  Person
    .find({})
    .then(result => {
      res.json(result.map(formatPerson))
  })
  .catch(error => {
    console.log(error)
    res.status(404).end()
  })
}

exports.findById = (req, res) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if ( person ) {
        res.json(formatPerson(person))
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(404).end()
    })
}

exports.addPerson = (req, res) => {
  Person
  .find({name: req.body.name})
  .then(result => {
    if ( result.length > 0 ) {
      res.status(400).send({ error: 'person is already added' })
    } else {
      const person = new Person({
        name: req.body.name,
        number: req.body.number
      })
      person
        .save()
        .then(person => 
          res.json(formatPerson(person))
        )
        .catch(error => {
          console.log(error)
          res.status(404).end()
        })

    }
  })
  
}

exports.removePerson = (req, res) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      res.status(400).send({ error: 'malformatted id' })
    })
}

exports.updatePerson = (req, res) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(formatPerson(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
}

/* ---- 3.12 ------ /

const person = new Person({
  name: process.argv[2],
  number: process.argv[3]
})

if (process.argv[2] !== undefined) {
  person
  .save()
  .then(response => {
    console.log(`lisätään henkilö ${person.name} numero ${person.number} luetteloon`)
    mongoose.connection.close()
  })
} else {
  Person
  .find({})
  .then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}*/