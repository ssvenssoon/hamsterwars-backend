import express from 'express'
const router = express.Router()

// Data hämtas från firestore!
import { collection, getDoc, doc } from "firebase/firestore"
import { db } from '../database/firebase.js'



// Routes
// RESTful == har GET, POST, PUT och DELETE
router.get('/:id', async (req, res) => {
    const colRef = collection(db, "matches");
    let matchId = req.params.id

    const docRef = doc(colRef, matchId)

    const snapshot = await getDoc(docRef)

    const data = snapshot.data()

    if(data === undefined) {
        res.sendStatus(404)
        return
    }

    res.send( data )
})

export default router
