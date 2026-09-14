import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "easel-puzzle:solved-ids";

export async function loadSolvedIds(): Promise<Set<number>> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as number[]) : []);
  } catch {
    return new Set();
  }
}

export async function persistSolvedIds(ids: Set<number>): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // Non-critical — progress just won't persist across launches.
  }
}
