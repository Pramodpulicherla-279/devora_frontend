import { initializeApp } from 'firebase/app';
import { getStorage,  ref, uploadBytes } from 'firebase/storage';
// NOTE: Analytics (GA4) is initialised in src/analytics.js, not here. Calling
// getAnalytics() at module top-level can throw in unsupported environments and
// would crash any module that imports firebase.js — so it's kept separate.

// console.log('import.meta.env =', import.meta.env); 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// console.log('firebaseConfig.storageBucket =', firebaseConfig.storageBucket);

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
export default app;