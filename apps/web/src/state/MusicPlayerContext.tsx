import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { View } from "react-native";

const PLAYLIST_ID = "6jMCpOBtseRh7Pv0nCnm31";
const PLAYLIST_URL = `https://open.spotify.com/playlist/${PLAYLIST_ID}`;
const IFRAME_API_SRC = "https://open.spotify.com/embed/iframe-api/v1";

interface MusicPlayerState {
  title: string;
  playing: boolean;
  togglePlay: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerState>({
  title: "Playlist",
  playing: false,
  togglePlay: () => {},
});

export function useMusicPlayer() {
  return useContext(MusicPlayerContext);
}

/**
 * Owns a single, app-lifetime Spotify embed playback controller (headless — mounted
 * off-screen), so navigating between screens doesn't restart or duplicate playback.
 * Screens just render <MusicControls />, a lightweight consumer of this context.
 */
export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const mountRef = useRef<View>(null);
  const controllerRef = useRef<any>(null);
  const [playing, setPlaying] = useState(false);
  const [title, setTitle] = useState("Playlist");

  useEffect(() => {
    fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(PLAYLIST_URL)}`)
      .then((r) => r.json())
      .then((d) => d.title && setTitle(d.title))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const node = mountRef.current as unknown as HTMLElement | null;
    if (!node) return;

    function setup(IFrameAPI: any) {
      IFrameAPI.createController(
        node,
        { uri: `spotify:playlist:${PLAYLIST_ID}`, width: "100%", height: "100%" },
        (controller: any) => {
          controllerRef.current = controller;
          controller.addListener("ready", () => {
            // Attempt autoplay; browsers may block audio until the user interacts with the page.
            controller.play();
          });
          controller.addListener("playback_update", (e: any) => {
            setPlaying(!e.data?.isPaused);
          });
        },
      );
    }

    const w = window as any;
    if (w.__spotifyIframeAPI) {
      setup(w.__spotifyIframeAPI);
      return;
    }

    const prevReady = w.onSpotifyIframeApiReady;
    w.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      w.__spotifyIframeAPI = IFrameAPI;
      prevReady?.(IFrameAPI);
      setup(IFrameAPI);
    };

    if (!document.getElementById("spotify-iframe-api")) {
      const script = document.createElement("script");
      script.id = "spotify-iframe-api";
      script.src = IFRAME_API_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const togglePlay = () => controllerRef.current?.togglePlay();

  return (
    <MusicPlayerContext.Provider value={{ title, playing, togglePlay }}>
      {children}
      {/* Headless Spotify embed controller — kept off-screen for the whole app lifetime.
          Spotify's SDK replaces the ref'd node with its own iframe (rather than nesting
          inside it), so the hiding styles live on this persistent outer wrapper instead. */}
      <View style={{ position: "absolute", width: 1, height: 1, opacity: 0, overflow: "hidden", pointerEvents: "none" }}>
        <View ref={mountRef} />
      </View>
    </MusicPlayerContext.Provider>
  );
}
