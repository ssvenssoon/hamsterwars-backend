import express from 'express'
const router = express.Router()

// Data hämtas från firestore!
import { collection, getDocs } from "firebase/firestore"
import { db } from '../database/firebase.js'



// Routes
// RESTful == har GET, POST, PUT och DELETE
router.get('/', async (req, res) => {
    const colRef = collection(db, "hamsters");

    let hamsters = [];

    const snapshot = await getDocs(colRef)
    snapshot.docs.forEach((docSnapshot) => {
	    hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id });
    });
    const randomHamster = hamsters[Math.floor(Math.random() * hamsters.length)]

    res.send( randomHamster )
})

export default router
