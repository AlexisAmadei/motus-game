import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

function getLocalUser() {
    const user = localStorage.getItem('username');
    if (!user) {
        return 'anonymous';
    }
    return user;
}

function setLocalUser(username) {
    localStorage.setItem('username', username);
}

async function updatesDbUser(username, userId) {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        await updateDoc(userRef, {
            username: username,
        });
    } else {
        await setDoc(userRef, {
            username: username,
        });
    }
}

async function retrieveDbUser(userId) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().username;
    } else {
        console.error('Error while retrieving user from db');
        return null;
    }
}

export {
    getLocalUser,
    setLocalUser,
    updatesDbUser,
    retrieveDbUser,
};