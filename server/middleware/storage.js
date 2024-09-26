const {getStorage, getDownloadURL, ref, uploadString} = require("firebase/storage")
const {signInWithEmailAndPassword, createUserWithEmailAndPassword} = require('firebase/auth')
const {auth} = require('../config/firebase.config')
require('dotenv').config()


const uploadStorage = async (data, name) => {
    const storage = getStorage();
    await signInWithEmailAndPassword(auth, process.env.FIREBASE_USER, process.env.FIREBASE_AUTH)

    const storageRef = ref(storage, name);
    const snapshot = await uploadString(storageRef, data, 'data_url')
    return snapshot.ref
}
const downloadStorage = async (name) => {
    const storage = getStorage();
    await signInWithEmailAndPassword(auth, process.env.FIREBASE_USER, process.env.FIREBASE_AUTH)

    const storageRef = ref(storage, name);
    return await getDownloadURL(storageRef)
}
module.exports = {
    uploadStorage,
    downloadStorage
}