import { useState } from "react";
import { LayoutChangeEvent, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Painting } from "../data/paintings";
import { GalleryWall } from "../components/GalleryWall";
import { FRAMES_WALL_ASPECT } from "../data/frames";
import { space, theme } from "../theme/tokens";

const MARGIN = space[4];

interface GalleryScreenProps {
  paintings: Painting[];
  solvedIds: Set<number>;
  onSelect: (painting: Painting) => void;
}

export function GalleryScreen({ paintings, solvedIds, onSelect }: GalleryScreenProps) {
  const { width } = useWindowDimensions();
  const [containerHeight, setContainerHeight] = useState(0);

  const widthConstrained = width - MARGIN * 2;
  const availableHeight = containerHeight - (MARGIN + space[7]);
  const heightConstrained = availableHeight > 0 ? availableHeight * FRAMES_WALL_ASPECT : widthConstrained;
  const wallWidth =
    containerHeight > 0 ? Math.max(Math.min(widthConstrained, heightConstrained), 160) : widthConstrained;

  const onContainerLayout = (e: LayoutChangeEvent) => setContainerHeight(e.nativeEvent.layout.height);

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]} onLayout={onContainerLayout}>
      <ScrollView contentContainerStyle={styles.content}>
        <GalleryWall paintings={paintings} solvedIds={solvedIds} onSelect={onSelect} width={wallWidth} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  content: { padding: MARGIN, paddingBottom: space[7], alignItems: "center" },
});
