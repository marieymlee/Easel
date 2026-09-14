import { Image } from "expo-image";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Painting } from "../data/paintings";
import { colors, fonts, radius, space, theme } from "../theme/tokens";

interface GalleryScreenProps {
  paintings: Painting[];
  solvedIds: Set<number>;
  onSelect: (painting: Painting) => void;
}

export function GalleryScreen({ paintings, solvedIds, onSelect }: GalleryScreenProps) {
  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <FlatList
        data={paintings}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Easel</Text>
            <Text style={styles.subtitle}>
              Reassemble the painting, piece by piece — then learn its story.
            </Text>
            <Text style={styles.progress}>
              {solvedIds.size} of {paintings.length} solved
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const solved = solvedIds.has(item.id);
          return (
            <Pressable style={styles.card} onPress={() => onSelect(item)}>
              <View style={styles.thumbWrap}>
                <Image source={item.imageUrl} style={styles.thumb} contentFit="cover" />
                {solved && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>✓ Solved</Text>
                  </View>
                )}
              </View>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.cardArtist} numberOfLines={1}>
                {item.artist}
              </Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  listContent: { padding: space[4], paddingBottom: space[7] },
  row: { gap: space[4] },
  header: { marginBottom: space[5] },
  title: {
    fontFamily: fonts.serif,
    fontSize: 34,
    fontWeight: "700",
    color: theme.text,
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: theme.textMuted,
    marginTop: space[2],
    lineHeight: 21,
  },
  progress: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: theme.accent,
    marginTop: space[3],
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  card: {
    flex: 1,
    marginBottom: space[4],
    backgroundColor: theme.surface,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.border,
  },
  thumbWrap: { aspectRatio: 1, backgroundColor: colors.paper200 },
  thumb: { width: "100%", height: "100%" },
  badge: {
    position: "absolute",
    top: space[2],
    right: space[2],
    backgroundColor: theme.success,
    paddingHorizontal: space[2],
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  cardTitle: {
    fontFamily: fonts.serif,
    fontSize: 15,
    fontWeight: "600",
    color: theme.text,
    marginTop: space[2],
    marginHorizontal: space[3],
  },
  cardArtist: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: theme.textMuted,
    marginTop: 2,
    marginHorizontal: space[3],
    marginBottom: space[3],
  },
});
