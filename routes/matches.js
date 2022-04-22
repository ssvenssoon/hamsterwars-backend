import express from 'express'
const router = express.Router()

// Data hämtas från firestore!
import { collection, getDocs, addDoc } from "firebase/firestore"
import { db } from '../database/firebase.js'



// Routes
// RESTful == har GET, POST, PUT och DELETE
router.get('/', async (req, res) => {
    const colRef = collection(db, "matches");
    let matches = [];

    const snapshot = await getDocs(colRef)
    snapshot.docs.forEach((docSnapshot) => {
	    matches.push({ ...docSnapshot.data(), id: docSnapshot.id });
    });

    // for(let i = 0; i < matches.length; i ++) {

    //     console.log(matches[i]);
    // }

    res.send( matches )
})

router.post('/', async (req, res) => {

    console.log('POST /matches/  ', req.body)

    let newMatch =  {
        winnerId: req.body.winnerId,
        loserId: req.body.loserId
    }

    for (const key in newMatch) {

        if(newMatch[key] === undefined) {
            res.sendStatus(400)  //bad request
            return
        }
    }

    console.log('winner id: ', newMatch.winnerId);

    const colRef = collection(db, 'matches')


    // lägg till nya objektet som ett doument i en collection
    // AddDoc returnerar promise därför await
    const newDocRef = await addDoc(colRef, newMatch)

    console.log('Lade till en ny hamster i ett nytt dokument med id = ', newDocRef.id);

    res.sendStatus(200)  // POST behöver inte skicka tillbaka någon data

})

export default router
