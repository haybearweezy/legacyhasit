import { getFirebaseAuth, getFirebaseApp } from "@/lib/_core/auth";
import Constants from "expo-constants";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential,
  signInWithPopup,
} from "firebase/auth";
import { Platform } from "react-native";

const DEFAULT_API_PORT = 3000;

function normalizeBaseUrl(url: string): string {
  return url.trim().replace(/\/$/, "");
}

function isLoopbackHost(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ["localhost", "127.0.0.1", "0.0.0.0"].includes(parsed.hostname);
  } catch {
    return false;
  }
}

function inferDevApiBaseUrl(): string | null {
  const hostUri =
    Constants.expoConfig?.hostUri ??
    (Constants as any).manifest2?.extra?.expoClient?.hostUri ??
    (Constants as any).manifest?.debuggerHost ??
    "";

  if (!hostUri) return null;

  const host = hostUri.includes("://")
    ? new URL(hostUri).hostname
    : hostUri.split(":")[0];
  if (!host) return null;

  return `http://${host}:${DEFAULT_API_PORT}`;
}

export function getApiBaseUrl(): string {
  const configured = normalizeBaseUrl(
    process.env.EXPO_PUBLIC_API_BASE_URL ?? "",
  );
  const inferred = inferDevApiBaseUrl();

  if (configured) {
    if (Platform.OS !== "web" && inferred && isLoopbackHost(configured)) {
      return inferred;
    }
    return configured;
  }

  if (inferred) {
    return inferred;
  }

  return Platform.OS === "web"
    ? `http://localhost:${DEFAULT_API_PORT}`
    : `http://127.0.0.1:${DEFAULT_API_PORT}`;
}

// ── Email/Password ─────────────────────────────────────────────────────────

export async function signInWithEmail(email: string, password: string) {
  const auth = getFirebaseAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(email: string, password: string) {
  const auth = getFirebaseAuth();
  return createUserWithEmailAndPassword(auth, email, password);
}

// ── Google Sign-In ─────────────────────────────────────────────────────────
// On native: use @react-native-google-signin/google-signin, pass credential here
// On web: use signInWithPopup

export async function signInWithGoogle(idToken?: string) {
  const auth = getFirebaseAuth();
  if (Platform.OS === "web") {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }
  // Native: idToken comes from @react-native-google-signin/google-signin
  if (!idToken) throw new Error("Google idToken required on native");
  const credential = GoogleAuthProvider.credential(idToken);
  return signInWithCredential(auth, credential);
}

// ── Apple Sign-In ──────────────────────────────────────────────────────────
// On native: use expo-apple-authentication, pass credential here

export async function signInWithApple(idToken: string, nonce: string) {
  const auth = getFirebaseAuth();
  const provider = new OAuthProvider("apple.com");
  const credential = provider.credential({ idToken, rawNonce: nonce });
  return signInWithCredential(auth, credential);
}
