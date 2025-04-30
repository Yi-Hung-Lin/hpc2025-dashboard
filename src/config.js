import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

var config = {
    apiKey: "AIzaSyBGZDKKuWAkUaxV1rB-fkH1tYjj_kLcQSM",
    authDomain: "personal-webpage-4fee5.firebaseapp.com",
    databaseURL: "https://personal-webpage-4fee5-default-rtdb.firebaseio.com",
    projectId: "personal-webpage-4fee5",
    storageBucket: "personal-webpage-4fee5.firebasestorage.app",
    messagingSenderId: "436484530906",
    appId: "1:436484530906:web:b29b6e67621aa2009cfbe3",
    measurementId: "G-3QP9ZY1ZF7",
    databaseURL: "https://personal-webpage-4fee5-default-rtdb.firebaseio.com"
};

const app = initializeApp(config)

export const auth = getAuth(app)
export const db = getDatabase(app)