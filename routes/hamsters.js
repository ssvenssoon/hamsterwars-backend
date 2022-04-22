import express from 'express'
const router = express.Router()

// Data hämtas från firestore!
import { collection, getDocs, addDoc } from "firebase/firestore"
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
    console.log(hamsters);

    res.send( hamsters )
})



router.post('/', async (req, res) => {

    console.log('POST /hamsters/  ', req.body)

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

    for (const key in newHamster) {

        if(newHamster[key] === undefined) {
            res.sendStatus(400)  //bad request
            return
        }
    }

    const colRef = collection(db, 'hamsters')


    // lägg till nya objektet som ett doument i en collection
    // AddDoc returnerar promise därför await
    const newDocRef = await addDoc(colRef, newHamster)

    console.log('Lade till en ny hamster i ett nytt dokument med id = ', newDocRef.id);

    res.sendStatus(200)  // POST behöver inte skicka tillbaka någon data

})



export default router
