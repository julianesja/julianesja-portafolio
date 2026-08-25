import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";

const COLLECTION_NAME = "experiences";

export const getExperiences = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
  } catch (error) {
    console.error("Error al obtener experiencias de Firestore:", error);
    throw error;
  }
};

export const addExperience = async (experienceData) => {
  try {
    const experiences = await getExperiences();
    const nextOrder =
      experienceData.order !== undefined && experienceData.order !== ""
        ? Number(experienceData.order)
        : experiences.length > 0
        ? Math.max(...experiences.map((e) => Number(e.order || 0))) + 1
        : 1;

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...experienceData,
      order: nextOrder,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al agregar experiencia a Firestore:", error);
    throw error;
  }
};

export const updateExperience = async (id, experienceData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updatedData = { ...experienceData };
    if (updatedData.order !== undefined && updatedData.order !== "") {
      updatedData.order = Number(updatedData.order);
    }
    delete updatedData.id; // Evitar guardar la propiedad id dentro del documento
    await updateDoc(docRef, updatedData);
  } catch (error) {
    console.error("Error al actualizar experiencia en Firestore:", error);
    throw error;
  }
};

export const deleteExperience = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error al eliminar experiencia de Firestore:", error);
    throw error;
  }
};
