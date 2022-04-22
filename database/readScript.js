import { getDoc, collection, doc } from "firebase/firestore"
import { db } from './firebase.js'

const collectionRef = collection(db, 'hamsters')

const docRef = doc(collectionRef, 'jafNRv9ORBVBjdhvkU3W')

const snapshot = await getDoc(docRef)

const data = snapshot.data()

console.log(data);
