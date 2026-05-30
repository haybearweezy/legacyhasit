// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<
  SymbolViewProps["name"],
  ComponentProps<typeof MaterialIcons>["name"]
>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * SF Symbols to Material Icons mappings for ManyVersions
 */
const MAPPING = {
  // Navigation
  "house.fill": "home",
  "book.fill": "menu-book",
  magnifyingglass: "search",
  "gearshape.fill": "settings",
  "person.fill": "person",
  "person.2.fill": "group",

  // Actions
  "paperplane.fill": "send",
  "mic.fill": "mic",
  "video.fill": "videocam",
  "play.fill": "play-arrow",
  "pause.fill": "pause",
  "stop.fill": "stop",
  plus: "add",
  "trash.fill": "delete",
  "square.and.arrow.up": "share",
  pencil: "edit",
  checkmark: "check",
  xmark: "close",

  // Content
  "heart.fill": "favorite",
  "star.fill": "star",
  waveform: "graphic-eq",
  "clock.fill": "schedule",
  calendar: "calendar-today",
  "photo.fill": "photo",
  "folder.fill": "folder",
  "doc.text.fill": "description",

  // Navigation helpers
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "chevron.left": "chevron-left",
  "chevron.down": "expand-more",
  "arrow.left": "arrow-back",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
