const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('content', function postContent(res) {
    return JSON.stringify(res.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :response-time :content', {
    skip: function (req, res) { return req.method !== "POST" }
}))

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(data)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = data.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    data = data.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const person = req.body

    if (!person.name && !person.number) {
        return res.status(400).json({ 
            error: 'name or number missing' 
        })
    }

    if (data.filter(x => x.name === person.name).length > 0) {
        return res.status(400).json({ 
            error: 'name must be unique' 
        })
    }

    person.id = Math.floor(Math.random() * 100)
    data = data.concat(person)

    res.json(person)
})

app.get('/info', (request, response) => {
    const date = new Date()

    response.send(
        `<div>
            <p>Phonebook has info for ${data.length} people<p/>
            <p>${date}<p/>
        <div/>`
    )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

