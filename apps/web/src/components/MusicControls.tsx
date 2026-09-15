import { Pressable, StyleSheet, Text, View } from "react-native";
import { PlayPauseIcon } from "./icons/PlayPauseIcon";
import { MusicNoteIcon } from "./icons/MusicNoteIcon";
import { useMusicPlayer } from "../state/MusicPlayerContext";
import { fonts, theme } from "../theme/tokens";

/** Minimal playback control (note icon + title + play/pause), driven by the shared
 * MusicPlayerContext so playback persists across screens instead of restarting. */
export function MusicControls() {
  const { title, playing, togglePlay } = useMusicPlayer();

  return (
    <View style={styles.bar}>
      <MusicNoteIcon size={26} color={theme.text} />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Pressable onPress={togglePlay} hitSlop={10}>
        <PlayPauseIcon playing={playing} size={26} color={theme.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: "row", alignItems: "center", gap: 10 },
  title: { fontFamily: fonts.sans, fontSize: 22, color: theme.text, flexShrink: 0 },
});
