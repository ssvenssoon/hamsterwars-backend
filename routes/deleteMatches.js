import express from 'express'
const router = express.Router()

// Data hämtas från firestore!
import { collection, doc, deleteDoc } from "firebase/firestore"
import { db } from '../database/firebase.js'

router.delete('/:id', (req, res) => {

    console.log('DELETE /matches ', req.body)

    let toBeDeleted = req.params.id

    const colRef = collection(db, "matches");

    const docRef = doc(colRef, toBeDeleted)

    deleteDoc(docRef)

    res.sendStatus(200)
})

export default router
