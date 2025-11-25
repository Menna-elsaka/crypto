# Theme System Guide

## Overview
The website now supports two themes:
- **Dark Theme (Original)**: Purple/Blue cyberpunk aesthetic
- **Light Theme (Pastel)**: Soft pastel gradient with glassmorphism

## Theme Toggle
- Located in the Navigation bar (Sun/Moon icon)
- Smooth 0.4s transitions between themes
- Theme preference is saved to localStorage

## CSS Variables

### Dark Theme
```css
--theme-bg-from: #0A0F3C (dark blue)
--theme-bg-via: #1a0533 (dark purple)
--theme-bg-to: #0A0F3C (dark blue)
--theme-text: #ffffff (white)
--theme-text-secondary: #9ca3af (gray)
--theme-card-bg: rgba(10, 15, 60, 0.6) (dark with transparency)
--theme-card-border: rgba(138, 43, 226, 0.3) (purple border)
--theme-accent: #8A2BE2 (purple)
--theme-accent-secondary: #5B8DEE (blue)
--theme-shadow: rgba(138, 43, 226, 0.2) (purple shadow)
--theme-glow: rgba(138, 43, 226, 0.8) (purple glow)
```

### Light Theme
```css
--theme-bg-from: #E3F0FF (light blue)
--theme-bg-via: #F9E8FF (light pink)
--theme-bg-to: #D7FFF3 (mint green)
--theme-text: #333333 (dark gray)
--theme-text-secondary: #666666 (medium gray)
--theme-card-bg: rgba(255, 255, 255, 0.7) (white with glassmorphism)
--theme-card-border: #D0D7E3 (soft gray)
--theme-accent: #C2A8FF (lavender)
--theme-accent-secondary: #9BE8D8 (aqua)
--theme-shadow: rgba(208, 215, 227, 0.5) (soft gray shadow)
--theme-glow: rgba(194, 168, 255, 0.6) (lavender glow)
```

## Utility Classes

### Text
- `theme-text` - Primary text color
- `theme-text-secondary` - Secondary text color
- `theme-accent` - Accent color (purple/lavender)

### Backgrounds
- `theme-bg` - Main gradient background
- `theme-card` - Card background with glassmorphism
- `theme-accent-bg` - Accent background color

### Effects
- `theme-shadow` - Themed box shadow
- `theme-glow` - Themed text shadow/glow
- `theme-transition` - Smooth 0.4s transition (required for smooth theme switching)

## How to Update Components

### Replace Hardcoded Colors

**Before:**
```tsx
<div className="text-purple-400 bg-gradient-to-br from-purple-600/20 to-blue-600/10">
  <p className="text-gray-400">Hello World</p>
</div>
```

**After:**
```tsx
<div className="theme-accent theme-card theme-transition">
  <p className="theme-text-secondary">Hello World</p>
</div>
```

### Update Inline Styles

**Before:**
```tsx
<div style={{
  boxShadow: '0 0 20px rgba(138, 43, 226, 0.2)',
  textShadow: '0 0 10px rgba(138, 43, 226, 0.8)'
}}>
```

**After:**
```tsx
<div style={{
  boxShadow: '0 0 20px var(--theme-shadow)',
  textShadow: '0 0 10px var(--theme-glow)'
}} className="theme-transition">
```

### Conditional Styling Based on Theme

If you need different styles for each theme:

```tsx
// Access theme from props or use document.documentElement.getAttribute('data-theme')
const theme = document.documentElement.getAttribute('data-theme');

<div style={{
  background: theme === 'dark' 
    ? 'rgba(138, 43, 226, 0.2)' 
    : 'rgba(194, 168, 255, 0.2)'
}} className="theme-transition">
```

## Components Updated

✅ App.tsx - Main app wrapper and background
✅ Navigation.tsx - Nav bar with theme toggle button
✅ globals.css - Theme CSS variables and utility classes

## Components to Update

The following components should be updated to use the theme system:

- HomePage.tsx
- AlgorithmsPage.tsx
- AlgorithmVisualization.tsx
- ComparisonPage.tsx
- ResourcesPage.tsx
- HistoryPage.tsx
- AboutPage.tsx
- Footer.tsx
- IntroAnimation.tsx
- Preloader.tsx

## Key Points

1. **Always add `theme-transition`** class to elements that should smoothly transition
2. **Use CSS variables** (`var(--theme-*)`) in inline styles for dynamic theming
3. **Glassmorphism in light theme**: Cards have `backdrop-filter: blur(10px)` automatically
4. **Cursors are themed**: Different cursor colors for each theme
5. **Preserve existing animations**: Theme system works alongside existing Motion animations

## Testing

To test the theme toggle:
1. Click the Sun/Moon button in the navigation
2. Verify all colors transition smoothly
3. Check that text remains readable in both themes
4. Confirm localStorage saves the preference
5. Refresh page to ensure theme persists
