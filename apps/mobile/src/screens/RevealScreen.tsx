import { Image } from "expo-image";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Painting } from "../data/paintings";
import { fonts, radius, space, theme } from "../theme/tokens";

interface RevealScreenProps {
  painting: Painting;
  onPlayAgain: () => void;
  onBackToGallery: () => void;
}

export function RevealScreen({ painting, onPlayAgain, onBackToGallery }: RevealScreenProps) {
  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.solvedLabel}>Solved!</Text>
        <Image source={painting.imageUrl} style={styles.image} contentFit="cover" />

        <Text style={styles.title}>{painting.title}</Text>
        <Text style={styles.artist}>{painting.artist}</Text>
        <Text style={styles.meta}>
          {painting.year} · {painting.source}
        </Text>

        <Text style={styles.meaning}>{painting.meaning}</Text>

        <Pressable onPress={() => Linking.openURL(painting.sourceUrl)}>
          <Text style={styles.link}>View on {painting.source} →</Text>
        </Pressable>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={onBackToGallery}>
            <Text style={styles.primaryButtonText}>Back to gallery</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={onPlayAgain}>
            <Text style={styles.secondaryButtonText}>Play again</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  content: { padding: space[4], paddingBottom: space[7], alignItems: "center" },
  solvedLabel: {
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: "700",
    color: theme.success,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: space[3],
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: radius.lg,
    backgroundColor: theme.surfaceSunken,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 26,
    fontWeight: "700",
    color: theme.text,
    textAlign: "center",
    marginTop: space[5],
  },
  artist: {
    fontFamily: fonts.sans,
    fontSize: 16,
    color: theme.text,
    marginTop: space[2],
  },
  meta: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: theme.textMuted,
    marginTop: space[1],
  },
  meaning: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 22,
    color: theme.text,
    marginTop: space[5],
  },
  link: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: theme.accent,
    fontWeight: "600",
    marginTop: space[4],
  },
  actions: { flexDirection: "row", gap: space[3], marginTop: space[6], width: "100%" },
  primaryButton: {
    flex: 1,
    backgroundColor: theme.accent,
    paddingVertical: space[3],
    borderRadius: radius.pill,
    alignItems: "center",
  },
  primaryButtonText: { color: theme.onAccent, fontFamily: fonts.sans, fontWeight: "700", fontSize: 15 },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.border,
    paddingVertical: space[3],
    borderRadius: radius.pill,
    alignItems: "center",
  },
  secondaryButtonText: { color: theme.text, fontFamily: fonts.sans, fontWeight: "700", fontSize: 15 },
});
