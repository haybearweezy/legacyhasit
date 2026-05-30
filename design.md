# ManyVersions — Design Document

## Brand Identity

**Tagline:** "Preserve the stories behind the photos."

**Color Palette:**
- Primary: `#8B5E3C` — warm walnut brown (heritage, warmth, trust)
- Accent: `#D4956A` — soft terracotta (warmth, approachability)
- Background: `#FDF8F3` — warm cream (paper-like, gentle on eyes)
- Surface: `#FFFFFF` — white cards
- Foreground: `#2D1F14` — deep espresso text
- Muted: `#9B8578` — warm gray for secondary text
- Success: `#4A7C59` — forest green
- Border: `#E8DDD4` — warm beige border

**Typography:** Large, generous line heights. Minimum 18sp body text for elder accessibility.

---

## Screen List

### Onboarding Flow (first-time only)
1. **WelcomeScreen** — Full-screen hero with tagline, "Get Started" + "I'm a Family Member" split
2. **RoleSelectScreen** — Choose: "I'm the Elder" / "I'm a Family Organizer" / "I'm a Relative"
3. **FamilySetupScreen** — Create or join a family vault (name + invite code)

### Elder Mode (simplified, large-button UX)
4. **ElderHomeScreen** — Single large "Answer Today's Question" CTA + recent memories strip
5. **TodaysPromptScreen** — Full-screen prompt display with big record button
6. **RecordingScreen** — Voice/video recording with large stop button, waveform animation
7. **PlaybackReviewScreen** — Review recording before saving, re-record option

### Family Mode (organizer/relative view)
8. **FamilyHomeScreen** — Family name header, memory count, recent activity feed
9. **MemoryThreadsScreen** — Themed collections: Childhood, Recipes, Love & Marriage, Work, Advice, Faith
10. **ThreadDetailScreen** — All memories in a theme, chronological list
11. **MemoryDetailScreen** — Single memory: audio/video player, transcript, date, prompt
12. **SearchScreen** — Full-text search across transcripts and prompts
13. **AddMemoryScreen** — Manual memory entry (photo + text, or record new)

### Shared Screens
14. **SettingsScreen** — Profile, family members list, invite, notifications
15. **InviteScreen** — Share invite code / link to family vault

---

## Primary Content & Functionality

### ElderHomeScreen
- Large greeting: "Good morning, [Name]"
- Today's prompt card (big, warm, readable)
- "Record Your Answer" button — 72pt touch target minimum
- Recent memories: horizontal scroll of last 3 recordings
- Simple bottom nav: Home | My Stories

### TodaysPromptScreen
- Prompt text in 28sp, centered, generous padding
- Prompt category badge (e.g., "Childhood")
- Two big buttons: "Record Voice" and "Record Video"
- "Skip for now" small link at bottom

### RecordingScreen
- Full-screen warm background
- Animated waveform / recording indicator
- Elapsed time in large text
- Single large red STOP button (80pt)
- Subtle "Tap to pause" hint

### PlaybackReviewScreen
- Playback controls (play/pause, scrubber)
- "Save to Family Vault" primary button
- "Record Again" secondary button
- Optional: add a title or note

### FamilyHomeScreen
- Family vault name + member avatars
- Stats: total memories, hours recorded
- Recent memories feed (card list)
- Quick action: "Add a Memory" FAB

### MemoryThreadsScreen
- 6 themed cards in 2-column grid:
  - 🏡 Childhood
  - 🍳 Recipes & Food
  - 💕 Love & Marriage
  - 💼 Work & Career
  - 🌟 Life Advice
  - ✝️ Faith & Values
- Each card shows memory count

### MemoryDetailScreen
- Audio/video player at top
- Transcript text (scrollable)
- Original prompt shown as context
- Date recorded
- Share button

### SearchScreen
- Large search bar
- Recent searches
- Results grouped by theme
- Transcript snippets with keyword highlight

---

## Key User Flows

### Elder Records a Memory
1. Elder opens app → ElderHomeScreen
2. Sees today's prompt → taps "Record Your Answer"
3. TodaysPromptScreen → taps "Record Voice"
4. RecordingScreen → speaks answer → taps STOP
5. PlaybackReviewScreen → listens back → taps "Save"
6. Confirmation animation → returns to ElderHomeScreen

### Family Member Views Archive
1. Family member opens app → FamilyHomeScreen
2. Taps "Childhood" thread → ThreadDetailScreen
3. Taps a memory card → MemoryDetailScreen
4. Reads transcript, plays audio
5. Taps share → system share sheet

### Organizer Invites Relative
1. Organizer → Settings → "Invite Family Member"
2. InviteScreen shows unique code + share button
3. Relative enters code on FamilySetupScreen → joins vault

---

## Color Choices

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| primary | #8B5E3C | #C4956A | Buttons, active states |
| accent | #D4956A | #E8A87C | Highlights, badges |
| background | #FDF8F3 | #1A1208 | Screen backgrounds |
| surface | #FFFFFF | #2A1E14 | Cards, modals |
| foreground | #2D1F14 | #F5EDE4 | Body text |
| muted | #9B8578 | #8A7568 | Secondary text |
| border | #E8DDD4 | #3D2E22 | Dividers, card borders |
| success | #4A7C59 | #6AAE7A | Save confirmations |
| error | #C0392B | #E05A4A | Recording errors |

---

## Elder-First Design Principles

1. **Minimum touch target: 72×72pt** for all primary actions
2. **Font size: 20sp minimum** for all body text
3. **High contrast**: foreground on background meets WCAG AA
4. **Single action per screen**: never more than 2 choices at once
5. **No icons without labels**: every icon has a text label
6. **Confirmation before delete**: always ask before discarding
7. **Warm, familiar aesthetic**: like a family photo album, not a tech app
