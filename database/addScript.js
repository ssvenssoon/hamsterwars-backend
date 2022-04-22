import { collection, addDoc } from "firebase/firestore"
import { db } from './firebase.js'


let newHamster = {
    name:"Gnuggis",
    age:5,
    favFood:"äpple",
    loves:"titta mot horisonten",
    imgName:"hamster-12.jpg",
    wins:0,
    defeats:0,
    games:0
}


const colRef = collection(db, 'hamsters')

// lägg till nya objektet som ett doument i en collection
// AddDoc returnerar promise därför await
const newDocRef = await addDoc(colRef, newHamster)
// console.log(newDocRef);

// console.log('Lade till en ny hamster i ett nytt dokument med id = ', newDocRef.id);
