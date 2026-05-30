import AsyncStorage from "@react-native-async-storage/async-storage";

export async function readMigratedStorageItem(
  currentKey: string,
  legacySuffix: string,
): Promise<string | null> {
  const currentValue = await AsyncStorage.getItem(currentKey);
  if (currentValue !== null) {
    return currentValue;
  }

  const legacyKey = (await AsyncStorage.getAllKeys()).find(
    (key) => key !== currentKey && key.endsWith(legacySuffix),
  );
  if (!legacyKey) {
    return null;
  }

  const legacyValue = await AsyncStorage.getItem(legacyKey);
  if (legacyValue === null) {
    return null;
  }

  await AsyncStorage.setItem(currentKey, legacyValue);
  await AsyncStorage.removeItem(legacyKey);
  return legacyValue;
}
