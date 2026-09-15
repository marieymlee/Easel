import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Painting } from "../data/paintings";
import { ShakeIcon } from "../components/ShakeIcon";
import { MusicControls } from "../components/MusicControls";
import { ArrowLeftIcon } from "../components/icons/ArrowLeftIcon";
import { fonts, space, theme } from "../theme/tokens";

const topImage = require("../../assets/easel-top.png");
const bottomImage = require("../../assets/easel-bottom.png");
const TOP_RATIO = 672 / 223;
const BOTTOM_RATIO = 672 / 485;

const MARGIN = 24;
const ICON_SIZE = 44;
const CHROME_HEIGHT = 84;
const STACK_BREAKPOINT = 720;
const MAX_GAP = 100;
const MIN_GAP = 40;
const MAX_TEXT_WIDTH = 600;
const MIN_TEXT_WIDTH = 280;
const MIN_FRAME_SIZE = 180;

interface RevealScreenProps {
  painting: Painting;
  elapsedMs?: number;
  onGallery: () => void;
}

export function RevealScreen({ painting, onGallery }: RevealScreenProps) {
  const { width, height } = useWindowDimensions();
  const stacked = width < STACK_BREAKPOINT;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 820,
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [painting.id]);

  const easelOpacity = progress.interpolate({ inputRange: [0, 0.5], outputRange: [0, 1], extrapolate: "clamp" });
  const easelTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: stacked ? [0, 0] : [56, 0],
  });
  const easelTranslateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: stacked ? [28, 0] : [0, 0],
  });
  const textOpacity = progress.interpolate({ inputRange: [0.25, 0.75], outputRange: [0, 1], extrapolate: "clamp" });
  const textTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: stacked ? [0, 0] : [20, 0],
  });
  const textTranslateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: stacked ? [16, 0] : [0, 0],
  });

  const availableHeight = Math.max(height - CHROME_HEIGHT - MARGIN * 2, 240);
  const colWidth = width - MARGIN * 2;

  // The easel + text block stays centered as a unit. At full size the gap and text column
  // are at their max; as the window narrows, the gap and text shrink together first (down to
  // their minimums) so the layout degrades smoothly, and only after that does the canvas shrink.
  const availableBlockWidth = width - MARGIN * 2;
  const idealFrameSize = Math.max(Math.min(availableHeight * 0.78, 440), MIN_FRAME_SIZE);
  const availableForGapAndText = availableBlockWidth - idealFrameSize;
  const maxTotal = MAX_GAP + MAX_TEXT_WIDTH;
  const minTotal = MIN_GAP + MIN_TEXT_WIDTH;

  let frameSize: number;
  let textWidth: number;
  let gap: number;
  if (stacked) {
    frameSize = Math.max(Math.min(colWidth * 0.85, 380), 180);
    textWidth = colWidth;
    gap = 0;
  } else if (availableForGapAndText >= maxTotal) {
    frameSize = idealFrameSize;
    textWidth = MAX_TEXT_WIDTH;
    gap = MAX_GAP;
  } else if (availableForGapAndText >= minTotal) {
    const ratio = (availableForGapAndText - minTotal) / (maxTotal - minTotal);
    frameSize = idealFrameSize;
    textWidth = MIN_TEXT_WIDTH + ratio * (MAX_TEXT_WIDTH - MIN_TEXT_WIDTH);
    gap = MIN_GAP + ratio * (MAX_GAP - MIN_GAP);
  } else {
    gap = MIN_GAP;
    textWidth = MIN_TEXT_WIDTH;
    frameSize = Math.max(availableBlockWidth - MIN_GAP - MIN_TEXT_WIDTH, MIN_FRAME_SIZE);
  }

  const easel = (
    <Animated.View
      style={{
        opacity: easelOpacity,
        transform: [{ translateX: easelTranslateX }, { translateY: easelTranslateY }],
        alignItems: "center",
      }}
    >
      <Image source={topImage} resizeMode="stretch" style={{ width: frameSize, height: frameSize / TOP_RATIO }} />
      <View
        style={{
          width: frameSize,
          height: frameSize,
          borderWidth: 3,
          borderColor: theme.border,
          backgroundColor: theme.surfaceSunken,
          overflow: "hidden",
        }}
      >
        <Image source={{ uri: painting.imageUrl }} resizeMode="cover" style={{ width: "100%", height: "100%" }} />
      </View>
      <Image
        source={bottomImage}
        resizeMode="stretch"
        style={{ width: frameSize, height: frameSize / BOTTOM_RATIO, marginTop: -2 }}
      />
    </Animated.View>
  );

  const canvasTopOffset = frameSize / TOP_RATIO;

  const text = (
    <Animated.View
      style={{
        opacity: textOpacity,
        transform: [{ translateX: textTranslateX }, { translateY: textTranslateY }],
        width: stacked ? "100%" : textWidth,
        alignItems: stacked ? "center" : "flex-start",
        marginTop: stacked ? 0 : canvasTopOffset,
      }}
    >
      <Text style={[styles.title, stacked && styles.textCenter]}>{painting.title}</Text>
      <Text style={[styles.byline, stacked && styles.textCenter]}>
        {painting.artist} • {painting.year} • {painting.source}
      </Text>
      <Text style={[styles.meaning, stacked && styles.textCenter]}>{painting.meaning}</Text>
      <Pressable onPress={() => Linking.openURL(painting.sourceUrl)}>
        <Text style={styles.link}>View on {painting.source} →</Text>
      </Pressable>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <ShakeIcon onPress={onGallery}>
          <ArrowLeftIcon size={ICON_SIZE} color={theme.text} />
        </ShakeIcon>
        <MusicControls />
        <View style={styles.headerSpacer} />
      </View>

      {stacked ? (
        <ScrollView contentContainerStyle={styles.stackedContent}>
          {easel}
          <View style={{ height: space[3] }} />
          {text}
        </ScrollView>
      ) : (
        <View style={[styles.content, { gap }]}>
          <View style={styles.easelColumn}>{easel}</View>
          <View style={styles.textColumn}>{text}</View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: MARGIN,
    paddingVertical: space[3],
  },
  headerSpacer: { width: ICON_SIZE },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: MARGIN,
  },
  easelColumn: { alignItems: "center" },
  textColumn: { alignItems: "flex-start" },
  stackedContent: {
    alignItems: "center",
    paddingHorizontal: MARGIN,
    paddingBottom: space[7],
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 48,
    fontWeight: "400",
    color: theme.text,
  },
  byline: {
    fontFamily: fonts.sans,
    fontSize: 22,
    color: theme.textMuted,
    marginTop: space[3],
  },
  meaning: {
    fontFamily: fonts.sans,
    fontSize: 27,
    lineHeight: 37,
    color: theme.text,
    marginTop: space[5],
  },
  link: {
    fontFamily: fonts.sans,
    fontSize: 21,
    color: theme.accent,
    fontWeight: "400",
    marginTop: space[7],
  },
  textCenter: { textAlign: "center" },
});
