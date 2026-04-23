---
name: Serene Pro Finance
colors:
  surface: '#fdf8f5'
  surface-dim: '#ddd9d6'
  surface-bright: '#fdf8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f0'
  surface-container: '#f1edea'
  surface-container-high: '#ece7e4'
  surface-container-highest: '#e6e2df'
  on-surface: '#1c1b1a'
  on-surface-variant: '#424844'
  inverse-surface: '#31302e'
  inverse-on-surface: '#f4f0ed'
  outline: '#727974'
  outline-variant: '#c2c8c3'
  surface-tint: '#4c6358'
  primary: '#4c6358'
  on-primary: '#ffffff'
  primary-container: '#8fa89b'
  on-primary-container: '#273d33'
  inverse-primary: '#b3ccbf'
  secondary: '#645d53'
  on-secondary: '#ffffff'
  secondary-container: '#e8ded1'
  on-secondary-container: '#686257'
  tertiary: '#5e5e5c'
  on-tertiary: '#ffffff'
  tertiary-container: '#a3a2a0'
  on-tertiary-container: '#383937'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cee9da'
  primary-fixed-dim: '#b3ccbf'
  on-primary-fixed: '#092017'
  on-primary-fixed-variant: '#354c41'
  secondary-fixed: '#ebe1d4'
  secondary-fixed-dim: '#cfc5b9'
  on-secondary-fixed: '#1f1b13'
  on-secondary-fixed-variant: '#4c463c'
  tertiary-fixed: '#e4e2df'
  tertiary-fixed-dim: '#c8c6c4'
  on-tertiary-fixed: '#1b1c1a'
  on-tertiary-fixed-variant: '#474745'
  background: '#fdf8f5'
  on-background: '#1c1b1a'
  surface-variant: '#e6e2df'
typography:
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 24px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is built for the modern solo esthetician who values both aesthetic beauty and rigorous professional organization. The brand personality is poised, nurturing, and sophisticated—moving away from traditional "cold" finance into a space that feels like a high-end spa reception.

The visual style is **Soft Minimalism**. It prioritizes heavy whitespace and a restricted, tonal color palette to reduce cognitive load during financial management. By utilizing generous negative space and a mobile-first philosophy, the system ensures that complex data feels approachable and calm. The goal is to evoke a sense of quiet confidence and mastery over one’s business finances.

## Colors

The palette is rooted in organic, earthy tones that provide a premium feel without the harshness of high-contrast black and white.

- **Primary (Muted Sage):** Used for primary actions, success states, and brand highlights. It represents growth and stability.
- **Secondary (Warm Sand):** Used for subtle backgrounds, secondary buttons, and decorative elements.
- **Surface (Light Cream):** The foundational background color to keep the UI feeling "airy" and expansive.
- **Neutral (Warm Gray):** Used for primary text and iconography to maintain readability while appearing softer than pure black.
- **Semantic Accents:** Use a desaturated "Dusty Rose" (#D4A5A5) exclusively for warnings or negative financial trends to maintain the feminine professional aesthetic.

## Typography

**Manrope** is selected for its perfect balance of geometric modernity and organic softness. Its high legibility at small sizes makes it ideal for mobile financial tracking.

Headlines should use tighter letter-spacing and heavier weights to establish a clear hierarchy. Body text relies on generous line heights (1.6) to ensure the interface feels breathable. Use the "Label Caps" style for section headers and non-interactive metadata to provide a structured, professional rhythm to lists and forms.

## Layout & Spacing

This design system utilizes a **Mobile-First Fluid Grid**. On handheld devices, it employs a 4-column system with a 24px outer margin to provide a premium "frame" around the content.

The spacing philosophy follows a strict 4pt base unit. To maintain the "Calm" vibe, vertical spacing between disparate sections (e.g., between a chart and a list) should be aggressive (32px+), while related items within a card should remain tightly grouped (8px-12px). Elements should never touch the edge of the screen; the 24px safety margin is mandatory for maintaining the minimalist aesthetic.

## Elevation & Depth

Depth is conveyed through **Ambient Shadows** and **Tonal Layering** rather than heavy borders. 

1.  **Base Layer:** The light cream surface (#F9F7F4).
2.  **Interactive Cards:** Elevated using a very soft, diffused shadow. Shadow color should be a tinted version of the neutral gray (e.g., `rgba(94, 92, 90, 0.06)`) with a high blur radius (20px-30px) and 0px spread.
3.  **Active Elements:** For buttons or active inputs, use a subtle 1px stroke in a slightly darker cream or muted sage to define boundaries without adding visual weight.

Avoid using pure black shadows; they break the "Calm" emotional response.

## Shapes

The shape language is defined by high-radius curves that feel friendly and tactile. 

- **Cards:** Use `rounded-xl` (1.5rem / 24px) to create a soft, modern container.
- **Buttons & Inputs:** Use `rounded-lg` (1rem / 16px) for a comfortable, finger-friendly touch target.
- **Chips/Badges:** Utilize pill shapes (full radius) to differentiate them from larger interactive components.

All iconography must be thin-stroke (1.5px weight) with rounded terminals to match the typography and corner radii.

## Components

- **Buttons:** Primary buttons are solid Muted Sage with white or cream text. Secondary buttons are ghost-style with a thin 1px Sage border.
- **Cards:** Cards are the primary container for financial data. They should have a white background, no border, and the signature soft ambient shadow.
- **Input Fields:** Use "Floating Label" inputs. The field background should be a subtle 2% darker than the page background to indicate interactivity.
- **List Items:** Use generous vertical padding (20px) and thin, 1px horizontal dividers in a very light warm gray (#E8DED1).
- **Charts:** Use simplified line graphs or "donut" charts. Data lines should be thick (3px) and rounded, using the Muted Sage and Warm Sand colors to represent income vs. expenses.
- **Navigation:** A bottom navigation bar with thin-stroke icons and no labels for a clean, minimalist "app-like" feel.