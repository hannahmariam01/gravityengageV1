# Implementation Plan: DoH Visualisation View

This document outlines the step-by-step technical implementation plan for creating the new "DoH Visualisation" view, connecting it to the Work page, and styling it to align with the provided design requirements.

## 1. Routing & Navigation Infrastructure Updates

### Update `src/index.tsx`
* **Import Component**: Add `import DohVisualisation from "./DohVisualisation";`.
* **Add Route**: Within the `<Routes>` block, add a new route:
  ```tsx
  <Route path="/doh-visualisation" element={<DohVisualisation />} />
  ```

### Update `src/Workpage.tsx`
* **Update Project Data**: Locate the `projects` state array (around line 100).
* **Enable Routing**: Find the object where `name: "DOH Visualisation"`. Change its `route` property from `null` to `"/doh-visualisation"`.

## 2. Component Creation: `src/DohVisualisation.tsx`

Create a new React functional component `DohVisualisation` that incorporates the visual theme of the `EdenMonaro` component while retaining the top navigation from `Workpage.tsx`.

### A. Global Styles and Animated Background
* Utilize the same starry/constellation canvas background effect used in `EdenMonaro.tsx`. This involves an HTML5 `<canvas>` positioned fixed behind all content, managed by a `useEffect` hook that draws connecting particles.
* Apply the radial gradient background (`#1a0a2e` to `#000000`) and the pulsing blurred orbs (blue, purple) using absolute positioning with animated CSS keyframes (`pulse`, `glow`, etc.).

### B. Top Navigation Bar
* Copy the `<nav>` implementation from `Workpage.tsx`.
* It must include the Gravity Engage logo on the left and the standard navigation links (**HOME, WORK, PLAYGROUND, ABOUT**) on the right.
* Ensure navigation handles routing (`navigate('/')`, etc.) and includes the specific hover animations and layout styling currently found on the Work page.

### C. Back Button
* Position a 'Back' button (`<button onClick={() => navigate("/work")}>`) in the top left area, just below the main navigation bar.
* Style it with a glassmorphism effect (semi-transparent background, thin border, border-radius, backdrop-filter) to match the styling paradigm in `EdenMonaro.tsx`.

### D. Content Grid Layout
* Implement a 2-column flex or grid layout for the main content area below the navigation.
* **Left Column (Text Content, ~50-60% width)**: This will house the provided textual content.
* **Right Column (Empty/Visual space, ~40-50% width)**: Keep this area empty to allow the user to appreciate the animated canvas background, effectively recreating the "network/constellation graphic on the right" effect from the reference image.

## 3. Content Integration and Styling

Within the left-aligned content container, populate and style the following text blocks sequentially, ensuring vertical scrolling is available (`overflowY: "auto"`) if content overflows the viewport. 

### Typography & Colors
* **Title**: Font size ~`clamp(48px, 6vw, 72px)`, styled with a custom linear gradient background clip (e.g., `#ffffff` to `#89cff0`).
* **Section Headings**: Font size ~`18px`, color `#e2e2e2`, `fontWeight: 500`.
* **Paragraph Text**: Font size ~`16px`, color `#e2e2e2`, `fontWeight: 300` or `400`, `lineHeight: 1.5` for high legibility.

### Content Structure
1. **Main Header & Subtitle**:
   - `<h1>DoH Landscape – Australia</h1>`
   - `<p className="subtitle">Reimagining Strategic Health Policy Visualisation</p>`

2. **Context**:
   - DHDA shapes Australia’s health, disability, and aged care systems through evidence-based policy. Australia’s health ecosystem is vast, interconnected, and constantly evolving. Yet, policy systems remained fragmented—difficult to visualize, navigate, and act upon.

3. **The Challenge**:
   - Enable a whole of system understanding of Australia's Health Landscape and strategic priority areas by nurturing complexity.

4. **Approach**:
   - We transformed complex policy landscape from static documentation into an engaging visualisation, conveying the story of connected systems.

5. **Design & Experience**:
   - *System as Interface*: The health ecosystem visualized as an explorable landscape.
   - *Clarity in Complexity*: Achieving clarity in highly complex systems.
   - *Retained Memory*: Providing a recall value of defined hierarchies and relationships in the Health system.

6. **Solution**:
   - An evolving policy intelligence platform that:
     - Structures complexity through spatial storytelling to reveal relationships at a glance.
     - Enables users to trace pathways and understand cross-system interdependencies.

7. **Impact**:
   - *Clarity at Scale → Enabling system-level thinking*: Complex systems became navigable and actionable. Reduces cognitive load through visual and relational clarity.
   - *Siloed views → Holistic System understanding*: Unifies fragmented data and domains into a clear, system-level view for better decisions.
   - *Alignment across Departments → Stronger Outcomes*: Shared system views improved cross-stakeholder alignment.

8. **Insight**:
   - Complex systems strategically represented visually holds meaning, nurtures alignment and provides clarity.
