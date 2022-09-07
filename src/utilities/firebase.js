import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set} from 'firebase/database';
import { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBqEEMW9QSUkXAbM75s4aVqoKhFGy9p4uY",
    authDomain: "great-scheduler.firebaseapp.com",
    databaseURL: "https://great-scheduler-default-rtdb.firebaseio.com",
    projectId: "great-scheduler",
    storageBucket: "great-scheduler.appspot.com",
    messagingSenderId: "217623472851",
    appId: "1:217623472851:web:12418501bc32dd12e30226",
    measurementId: "G-WK4SLVZFQW"
};
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

ref(database)
ref(database, '/')
ref(database, '/courses')

export const setData = (path, value) => (
  set(ref(database, path), value)
);
export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));
export { firebaseSignOut as signOut };

export const useUserState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onIdTokenChanged(getAuth(firebase), setUser);
  }, []);

  return [user];
};

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
};