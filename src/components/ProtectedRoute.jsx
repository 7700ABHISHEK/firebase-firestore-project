import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { app } from "../config/firebase"
import { useNavigate } from "react-router-dom"

const auth = getAuth(app)

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(undefined)
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      if (data) {
        setUser(data);
      } else {
        setUser(null);
        navigate("/login");
      }
    });

    return () => unsubscribe(); // cleanup Function
  }, [navigate]);


  if (user === undefined) {
    return <div className="bg-black h-screen">
      <div className="flex justify-center items-center h-[100%]">
        <img src="/loader-git.gif" alt="loader" />
      </div>
    </div>;
  }

  return children

}

export default ProtectedRoute