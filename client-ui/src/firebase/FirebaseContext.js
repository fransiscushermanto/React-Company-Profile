import { useContext, createContext } from "react";

export const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
