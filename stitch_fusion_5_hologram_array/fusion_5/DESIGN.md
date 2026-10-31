---
name: Fusion 5
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bac9cc'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#849396'
  outline-variant: '#3b494c'
  surface-tint: '#00daf3'
  primary: '#c3f5ff'
  on-primary: '#00363d'
  primary-container: '#00e5ff'
  on-primary-container: '#00626e'
  inverse-primary: '#006875'
  secondary: '#ffb4a2'
  on-secondary: '#621100'
  secondary-container: '#ff562c'
  on-secondary-container: '#560e00'
  tertiary: '#f0ecec'
  on-tertiary: '#313030'
  tertiary-container: '#d3d0cf'
  on-tertiary-container: '#5a5959'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#9cf0ff'
  primary-fixed-dim: '#00daf3'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#004f58'
  secondary-fixed: '#ffdad2'
  secondary-fixed-dim: '#ffb4a2'
  on-secondary-fixed: '#3c0700'
  on-secondary-fixed-variant: '#8a1d00'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  grid-subtle: 1px solid rgba(0, 229, 255, 0.05)
---

## Brand & Style
The design system for Fusion 5 embodies a high-end industrial engineering aesthetic. It is tailored for professional engineers and project managers who require a technical, futuristic, and high-precision environment.

The style is a hybrid of **Futuristic Minimalism** and **Glassmorphism**, grounded by **Industrial Brutalism**. The UI should evoke the feeling of a sophisticated control center or a digital twin interface. Key visual drivers include:
- **Technical Precision:** Use of fine lines and blueprint-style strokes to imply structural integrity.
- **Luminous Feedback:** Glowing accents represent active energy or operational status, contrasted against a void-like dark background.
- **Depth through Translucency:** UI surfaces utilize frosted glass effects to maintain context while layering complex data.

## Colors
The palette is optimized for low-light engineering environments to reduce eye strain and maximize the impact of data visualization.

- **Primary (Technical Cyan):** Used for interactive elements, active states, and data highlights. It represents "flow" and "operation."
- **Secondary (Safety Red):** Reserved strictly for critical alerts, stop commands, and hazardous thresholds. 
- **Base (Deep Charcoal):** The foundation of the interface. Use `#0A0A0A` for main backgrounds and `#1A1A1A` for elevated surface containers.
- **Accent Glows:** Primary and secondary colors should be applied with a 15-20% opacity glow (box-shadow) on active components to simulate hardware LEDs.

## Typography
The typography system prioritizes legibility under technical constraints.

- **Inter** is the workhorse font, providing a clean, modern sans-serif feel for all functional UI and headers.
- **JetBrains Mono** is utilized for all "Data Roles." This includes technical specifications, coordinates, budget figures, and status labels. The monospaced nature ensures that columns of numbers remain perfectly aligned in tables and data cards.
- **Hierarchy:** Use `label-caps` for section headers and metadata to provide an "instrument panel" look.

## Layout & Spacing
The design system employs a **Fixed 12-Column Grid** for desktop and a **4-Column Fluid Grid** for mobile.

- **Grid Lines:** A subtle 32px square background grid pattern should be visible on the base layer (`#0A0A0A`) using the `grid-subtle` token to reinforce the engineering theme.
- **Rhythm:** All spacing must be multiples of 4px. Use larger 48px or 64px gaps to separate major functional modules (e.g., separating the 3D viewport from the data sidebar).
- **Alignment:** All technical data must be top-left aligned to mimic engineering schematics.

## Elevation & Depth
Elevation is not achieved through traditional drop shadows, but through **Tonal Stacking** and **Glassmorphism**.

1.  **Level 0 (Base):** Deep Charcoal `#0A0A0A` with a subtle technical grid.
2.  **Level 1 (Sub-surface):** Slightly lighter neutral `#141414` with a 1px solid border at 10% opacity.
3.  **Level 2 (Glass Cards):** Surfaces use a background of `rgba(26, 26, 26, 0.7)` with a `backdrop-filter: blur(12px)`. 
4.  **Borders:** Every elevated element must feature a "Technical Border"—a 1px solid stroke (Cyan or White at 15% opacity). Corners of these borders can feature "crop marks" or "callout notches" (2px offsets) to simulate blueprint aesthetics.

## Shapes
The shape language is **Sharp and Industrial**.

- **Corners:** 0px roundedness is the default for all primary containers, buttons, and input fields to maintain a high-precision, technical feel.
- **Notches:** For a more advanced futuristic look, use "clipped corners" (45-degree chamfers) on primary action buttons rather than rounding.
- **Dividers:** Use thin, 1px horizontal and vertical lines to separate data points, mimicking the layout of a physical gauge or instrument.

## Components
- **Technical Data Cards:** These utilize the glassmorphism style with a `label-caps` header. Include a small "ID number" in the top right corner in monospaced font.
- **Buttons:** Sharp-edged. Primary buttons have a solid Cyan background with black text. Secondary buttons are ghost-style with a Cyan border and a subtle inner glow.
- **Process Timelines:** Use a continuous 1px Cyan line with "LED" nodes. Active nodes should have an outer glow; completed nodes are solid; future nodes are outlined.
- **Component Galleries:** Use "Engineering Callouts"—thin diagonal lines connecting a part of an image to a text label. Lines should be 1px Cyan.
- **Data Tables:** Border-heavy. Use `JetBrains Mono` for all cell content. Zebra striping should be very subtle (2% difference in grey). Highlight "Total" rows with a 1px top/bottom Cyan border.
- **Input Fields:** Bottom-border only or full-outline with 0px radius. The cursor and focus state should utilize the "Safety Red" only if an error occurs; otherwise, use Cyan.