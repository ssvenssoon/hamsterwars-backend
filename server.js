// Importera npm-paket och moduler
// Allmänna inställningar
import express from 'express'
import cors from 'cors'
import path from 'path'
const app = express()
const PORT = process.env.PORT || 1177
import hamsters from './routes/hamsters.js'
import randomHamster from './routes/randomHamster.js'
import specificHamster from './routes/specificHamster.js'
import updateHamster from './routes/updateHamster.js'
import deleteHamster from './routes/deleteHamster.js'
import matches from './routes/matches.js'
import specificMatch from './routes/specificMatch.js'
// const staticFolder = path.join(__dirname, 'public')


// Middleware
// CORS öppnar vårt projekt så det kan användas från andra domäner
app.use( cors() )

// Parse request body
app.use( express.urlencoded({ extended: true }) )

// Logger - skriv ut information om inkommande request
app.use( (req, res, next) => {
	console.log(`Logger: ${req.method}  ${req.url} `, req.body)
	next()
})

// Serve static files in this folder
app.use( express.static('public'))



// Routes
app.use('/hamsters', hamsters)
app.use('/hamsters/random', randomHamster)
app.use('/hamsters', specificHamster)
app.use('/hamsters', updateHamster)
app.use('/hamsters', deleteHamster)
app.use('/matches', matches)
app.use('/matches', specificMatch)


// Starta server
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`)
})
