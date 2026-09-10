import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Safe Firebase App and Auth Initialization
let app: ReturnType<typeof initializeApp> | null = null;
let authInstance: ReturnType<typeof getAuth> | null = null;

try {
  if (firebaseConfig && firebaseConfig.apiKey) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    authInstance = getAuth(app);
  }
} catch (err) {
  console.warn('Firebase Auth initialization caught warning (safe fallback active):', err);
}

export const auth = authInstance as ReturnType<typeof getAuth>;

// Workspace OAuth Scopes
export const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send'
];

let provider: GoogleAuthProvider | null = null;
try {
  provider = new GoogleAuthProvider();
  SCOPES.forEach((scope) => provider?.addScope(scope));
  provider.setCustomParameters({
    prompt: 'select_account'
  });
} catch (err) {
  console.warn('GoogleAuthProvider initialization warning:', err);
}

// Flag to indicate if we are in the middle of a sign-in flow.
let isSigningIn = false;
// Cache the access token in memory (never in localStorage/sessionStorage)
let cachedAccessToken: string | null = null;

// Initialize auth state listener. Call this on app load.
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  if (!auth) {
    if (onAuthFailure) onAuthFailure();
    return () => {};
  }

  try {
    return onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        if (cachedAccessToken) {
          if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
        } else if (!isSigningIn) {
          cachedAccessToken = null;
          if (onAuthFailure) onAuthFailure();
        }
      } else {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    });
  } catch (err) {
    console.warn('onAuthStateChanged registration notice:', err);
    if (onAuthFailure) onAuthFailure();
    return () => {};
  }
};

// Must be called from a button click or user interaction
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  if (!auth || !provider) {
    throw new Error('Google Authentication service is not initialized or configured in this environment.');
  }

  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Firebase Auth');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: unknown) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const setAccessToken = (token: string | null) => {
  cachedAccessToken = token;
};

export const logout = async () => {
  if (auth) {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Signout warning:', e);
    }
  }
  cachedAccessToken = null;
};

