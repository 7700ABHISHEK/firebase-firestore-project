import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { app } from "../config/firebase"

const auth = getAuth(app)

const ProtectedRoute = (Component) => {

  let k = onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user) {
            const uid = user.uid;
        } else {
            // User is signed out
            // ...
        }
    });

    console.log(k);

    return (
        <div>ProtectedRoute</div>
    )
}

export default ProtectedRoute