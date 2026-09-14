import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { paintings, Painting } from "./src/data/paintings";
import { GalleryScreen } from "./src/screens/GalleryScreen";
import { PuzzleScreen } from "./src/screens/PuzzleScreen";
import { RevealScreen } from "./src/screens/RevealScreen";
import { loadSolvedIds, persistSolvedIds } from "./src/storage/progress";

type Screen =
  | { name: "gallery" }
  | { name: "puzzle"; painting: Painting }
  | { name: "reveal"; painting: Painting };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: "gallery" });
  const [solvedIds, setSolvedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadSolvedIds().then(setSolvedIds);
  }, []);

  const handleSolved = useCallback((painting: Painting) => {
    setSolvedIds((prev) => {
      const next = new Set(prev);
      next.add(painting.id);
      persistSolvedIds(next);
      return next;
    });
    setScreen({ name: "reveal", painting });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {screen.name === "gallery" && (
        <GalleryScreen
          paintings={paintings}
          solvedIds={solvedIds}
          onSelect={(painting) => setScreen({ name: "puzzle", painting })}
        />
      )}
      {screen.name === "puzzle" && (
        <PuzzleScreen
          painting={screen.painting}
          index={paintings.findIndex((p) => p.id === screen.painting.id)}
          total={paintings.length}
          onSolved={() => handleSolved(screen.painting)}
          onBack={() => setScreen({ name: "gallery" })}
        />
      )}
      {screen.name === "reveal" && (
        <RevealScreen
          painting={screen.painting}
          onBackToGallery={() => setScreen({ name: "gallery" })}
          onPlayAgain={() => setScreen({ name: "puzzle", painting: screen.painting })}
        />
      )}
    </SafeAreaProvider>
  );
}
