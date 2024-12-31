import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading,setLoading]=useState(true)
  const[password,usePassword]=useState()
  console.log(user);

  const createNewUser = (email, password) => {
    
    return createUserWithEmailAndPassword(auth, email, password);
  };



  const updateNewProfile = (updated) => {
    return updateProfile(auth.currentUser, updated)
      .then(() => {
        setUser({ ...auth.currentUser, ...updated });
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        toast.error("Error updating profile:", error);
      });
  };

  const signInWithGoogle=()=>{
    const provider=new GoogleAuthProvider()
    return signInWithPopup(auth,provider)
}

  const userLogin = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };


  const logOut = () => {
    
    return signOut(auth);
  };


  const updateProfileUser=(updatedData)=>{
    return updateProfile(auth.currentUser,updatedData)
}

useEffect(()=>{
const unsubscribed=onAuthStateChanged(auth,currentUser=>{
setUser(currentUser)
setLoading(false)
})
return()=>{
unsubscribed()
}
},[])

  const AuthInfo = {
    user,
    setUser,
    createNewUser,
    logOut,
    userLogin,
    updateNewProfile,
    signInWithGoogle,
    updateProfileUser,
    password,
        usePassword,
        loading

  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
