import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";

export const getProjects = async () => {
  try {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.warn("No se pudieron cargar proyectos desde Firestore:", error);
    return null;
  }
};
