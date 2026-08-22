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

const seedCollection = async (collectionName, jsonFileName) => {
  try {
    const jsonPath = path.resolve(__dirname, `../src/Data/${jsonFileName}`);
    if (!fs.existsSync(jsonPath)) return;

    const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);

    if (!snapshot.empty) {
      console.log(`La colección '${collectionName}' ya contiene ${snapshot.size} documento(s). Se omite.`);
      return;
    }

    console.log(`Cargando datos en la colección '${collectionName}'...`);
    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      const docData = {
        ...item,
        order: item.order || index + 1,
      };
      const docRef = await addDoc(colRef, docData);
      console.log(`  [${index + 1}/${data.length}] Documento creado con ID: ${docRef.id} (${item.title || item.name || "Item"})`);
    }
  } catch (err) {
    console.error(`Error al sembrar '${collectionName}':`, err);
  }
};

const seedFirestore = async () => {
  await seedCollection("experiences", "Experience.json");
  await seedCollection("projects", "Projects.json");
  await seedCollection("posts", "Posts.json");
  console.log("¡Carga finalizada!");
  process.exit(0);
};

seedFirestore();
