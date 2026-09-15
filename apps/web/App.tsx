import { HashRouter, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { paintings, Painting } from "./src/data/paintings";
import { GalleryScreen } from "./src/screens/GalleryScreen";
import { PuzzleScreen } from "./src/screens/PuzzleScreen";
import { RevealScreen } from "./src/screens/RevealScreen";
import { SolvedProvider, useSolved } from "./src/state/SolvedContext";
import { MusicPlayerProvider } from "./src/state/MusicPlayerContext";

// Load the handwritten display typeface from Google Fonts (web only).
if (typeof document !== "undefined" && !document.getElementById("google-font-shadows-into-light")) {
  const link = document.createElement("link");
  link.id = "google-font-shadows-into-light";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap";
  document.head.appendChild(link);
}

function findPainting(id: string | undefined): Painting | undefined {
  const numId = Number(id);
  return paintings.find((p) => p.id === numId);
}

function GalleryRoute() {
  const navigate = useNavigate();
  const { solvedIds } = useSolved();
  return (
    <GalleryScreen
      paintings={paintings}
      solvedIds={solvedIds}
      onSelect={(painting) => navigate(`/puzzle/${painting.id}`)}
    />
  );
}

function PuzzleRoute() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { markSolved } = useSolved();
  const painting = findPainting(id);
  if (!painting) return <Navigate to="/" replace />;

  return (
    <PuzzleScreen
      painting={painting}
      index={paintings.findIndex((p) => p.id === painting.id)}
      total={paintings.length}
      onSolved={(elapsedMs) => {
        markSolved(painting.id);
        navigate(`/reveal/${painting.id}`, { state: { elapsedMs } });
      }}
      onBack={() => navigate("/")}
    />
  );
}

function RevealRoute() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const painting = findPainting(id);
  if (!painting) return <Navigate to="/" replace />;

  const elapsedMs = (location.state as { elapsedMs?: number } | null)?.elapsedMs;

  return <RevealScreen painting={painting} elapsedMs={elapsedMs} onGallery={() => navigate("/")} />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SolvedProvider>
        <MusicPlayerProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<GalleryRoute />} />
              <Route path="/puzzle/:id" element={<PuzzleRoute />} />
              <Route path="/reveal/:id" element={<RevealRoute />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </HashRouter>
        </MusicPlayerProvider>
      </SolvedProvider>
    </SafeAreaProvider>
  );
}
