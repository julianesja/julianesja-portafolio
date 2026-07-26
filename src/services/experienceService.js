import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";

export const getExperiences = async () => {
  try {
    const q = query(collection(db, "experiences"), orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error al obtener experiencias de Firestore:", error);
    throw error;
  }
};
