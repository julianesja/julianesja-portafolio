import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno desde .env manualmente
const envPath = path.resolve(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=");
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts.join("=").trim();
      }
    }
  });
}

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const jsonPath = path.resolve(__dirname, "../src/Data/Experience.json");
const experienceData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

const seedFirestore = async () => {
  try {
    console.log("Verificando si la colección 'experiences' ya contiene documentos...");
    const experiencesCollection = collection(db, "experiences");
    const snapshot = await getDocs(experiencesCollection);

    if (!snapshot.empty) {
      console.log(`La colección ya contiene ${snapshot.size} documento(s). Se omitió la carga para evitar duplicados.`);
      process.exit(0);
    }

    console.log("Iniciando la carga de datos de Experience.json a Firestore...");

    for (let index = 0; index < experienceData.length; index++) {
      const exp = experienceData[index];
      const docData = {
        ...exp,
        order: index + 1,
      };

      const docRef = await addDoc(experiencesCollection, docData);
      console.log(`[${index + 1}/${experienceData.length}] Documento agregado con ID: ${docRef.id} (${exp.title})`);
    }

    console.log("¡Carga masiva completada con éxito!");
    process.exit(0);
  } catch (error) {
    console.error("Error al cargar datos en Firestore:", error);
    process.exit(1);
  }
};

seedFirestore();
