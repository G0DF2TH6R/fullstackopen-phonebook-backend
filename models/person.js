const mongoose = require('mongoose')


const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },  
    number: {
        type: String,
        minLength: 9,
        validate: {
            validator: function(v) {
                const splitNumber = v.split('-')
                console.log(splitNumber)
                if (splitNumber.length != 2 || splitNumber[0].length < 2 || splitNumber[0].length > 3 || !/^\d+$/.test(splitNumber[0]) || !/^\d+$/.test(splitNumber[1])) {
                    return false
                }
                return true
            }
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
