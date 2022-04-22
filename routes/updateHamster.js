import express from 'express'
const router = express.Router()

// Data hämtas från firestore!
import { collection, getDoc, doc, updateDoc } from "firebase/firestore"
import { db } from '../database/firebase.js'

router.put('/:id', async (req, res) => {

    console.log('PUT /hamsters ', req.body)

    let toBeChanged = req.params.id

    const colRef = collection(db, "hamsters");

    const docRef = doc(colRef, toBeChanged)

    const snapshot = await getDoc(docRef)

    const data = snapshot.data()

    let newHamster =  {
        name: req.body.name,
        age: req.body.age,
        favFood: req.body.favFood,
        loves: req.body.loves,
        imgName: req.body.imgName,
        wins: req.body.wins,
        defeats: req.body.defeats,
        games: req.body.games
    }

        if(toBeChanged === docRef.id) {
            data.name = newHamster.name
            data.age = parseInt(newHamster.age)
            data.favFood = newHamster.favFood
            data.loves = newHamster.loves
            data.imgName = newHamster.imgName
            data.wins = parseInt(newHamster.wins)
            data.defeats = parseInt(newHamster.defeats)
            data.games = parseInt(newHamster.games)
        }

    updateDoc(docRef, data)

    res.sendStatus(200)
})

export default router
