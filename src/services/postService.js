import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";

export const getPosts = async () => {
  try {
    const q = query(collection(db, "posts"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.warn("No se pudieron cargar posts desde Firestore:", error);
    return null;
  }
};
