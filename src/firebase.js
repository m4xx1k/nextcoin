import {initializeApp, getApps} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDiTJOqc7HRjnNKoh-DklOvJ0skYErramc",
    authDomain: "nextcoins-aaeff.firebaseapp.com",
    projectId: "nextcoins-aaeff",
    storageBucket: "nextcoins-aaeff.appspot.com",
    messagingSenderId: "282331090861",
    appId: "1:282331090861:web:79ea8e7d0e3cd695225b24"
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
export {db}
export default app;
