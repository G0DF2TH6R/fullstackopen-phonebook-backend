const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://chrismatsiselts:${password}@cluster0.uyaumh7.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model("Person", personSchema)

const person = new Person({
    name: name,
    number: number
})

if (process.argv.length === 3) {
    console.log("Phonebook")
    Person.find().then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
    }).then(() => mongoose.connection.close())
} else if (process.argv.length === 5) {
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
    }).then(() => mongoose.connection.close())
}