import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useStore } from "@/lib/store";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Share,
  Alert,
  Platform,
} from "react-native";
import * as Haptics from "expo-haptics";

export default function InviteScreen() {
  const colors = useColors();
  const router = useRouter();
  const { state } = useStore();

  const inviteCode = state.familyVault?.inviteCode ?? "—";
  const vaultName = state.familyVault?.name ?? "Family Vault";

  const handleCopyCode = async () => {
    if (Platform.OS !== "web")
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      "Invite Code",
      `Your invite code is: ${inviteCode}\n\nShare this with family members so they can join your vault.`,
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join our family memory vault "${vaultName}" on ManyVersions!\n\nUse invite code: ${inviteCode}\n\nDownload ManyVersions to preserve and listen to family stories.`,
        title: `Join ${vaultName} on ManyVersions`,
      });
    } catch {}
  };

  return (
    <ScreenContainer
      containerClassName="bg-background"
      edges={["top", "left", "right", "bottom"]}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={styles.topBar}>
          <Pressable
            style={({ pressed }) => [
              styles.closeBtn,
              { backgroundColor: colors.surface },
              pressed && { opacity: 0.6 },
            ]}
            onPress={() => router.back()}
          >
            <Text style={[styles.closeBtnText, { color: colors.foreground }]}>
              ✕
            </Text>
          </Pressable>
          <Text style={[styles.topTitle, { color: colors.foreground }]}>
            Invite Family
          </Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>👨‍👩‍👧‍👦</Text>
          <Text style={[styles.heroTitle, { color: colors.foreground }]}>
            Invite family members to "{vaultName}"
          </Text>
          <Text style={[styles.heroText, { color: colors.muted }]}>
            Share the invite code below. Anyone with this code can join your
            family vault and listen to the stories.
          </Text>
        </View>

        {/* Invite Code */}
        <View
          style={[
            styles.codeCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.codeLabel, { color: colors.muted }]}>
            Invite Code
          </Text>
          <Text style={[styles.codeText, { color: colors.primary }]}>
            {inviteCode}
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.copyButton,
              { backgroundColor: colors.primary },
              pressed && { opacity: 0.85 },
            ]}
            onPress={handleCopyCode}
          >
            <Text style={styles.copyButtonText}>Copy Code</Text>
          </Pressable>
        </View>

        {/* Share */}
        <Pressable
          style={({ pressed }) => [
            styles.shareButton,
            { borderColor: colors.primary },
            pressed && { opacity: 0.75 },
          ]}
          onPress={handleShare}
        >
          <Text style={[styles.shareButtonText, { color: colors.primary }]}>
            ↗️ Share Invite Link
          </Text>
        </Pressable>

        {/* Instructions */}
        <View
          style={[
            styles.instructions,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text
            style={[styles.instructionsTitle, { color: colors.foreground }]}
          >
            How it works
          </Text>
          <Text style={[styles.instructionStep, { color: colors.muted }]}>
            1. Share this code with a family member
          </Text>
          <Text style={[styles.instructionStep, { color: colors.muted }]}>
            2. They download ManyVersions and tap "Join a Family Vault"
          </Text>
          <Text style={[styles.instructionStep, { color: colors.muted }]}>
            3. They enter this code to access all family stories
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 40,
    gap: 24,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    fontSize: 18,
    fontWeight: "600",
  },
  topTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  hero: {
    alignItems: "center",
    gap: 12,
  },
  heroEmoji: {
    fontSize: 56,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 30,
  },
  heroText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  codeCard: {
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    gap: 12,
  },
  codeLabel: {
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  codeText: {
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: 6,
  },
  copyButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
    marginTop: 4,
  },
  copyButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  shareButton: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2,
  },
  shareButtonText: {
    fontSize: 18,
    fontWeight: "700",
  },
  instructions: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
  },
  instructionsTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  instructionStep: {
    fontSize: 15,
    lineHeight: 22,
  },
});
