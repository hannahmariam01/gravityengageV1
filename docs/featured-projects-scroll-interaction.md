# Featured Projects – Scroll Interaction Redesign

## Overview

This document describes the planned changes to the **Featured Projects** section on the Home page (`src/App.js`).

### Goal
Replace the current scroll-driven section reveal with a **scroll-highjack carousel**:
- When the user scrolls into the Featured Projects section, the page stops scrolling and the vertical carousel consumes all scroll events.
- Once every card has been viewed (reached the last card scrolling down, or the first card scrolling up), control returns to normal page scroll.

---

## Current Implementation Summary

| Concept | Current state |
|---|---|
| Section container | `<div ref={screen3Ref}>` with `height: "150vh"` and a sticky inner container |
| Scroll tracking | `screen3Progress` state updated via a global `scroll` listener; drives opacity/reveal animations |
| Carousel control | `handleProjectWheel` intercepts `wheel` events via a global `window` listener; advances `activeProjectIndex` with a 650 ms debounce lock |
| Projects array | 5 items: ADPM UI Revamp, Eden Monaro, Health Landscape Visualisation, ECAS Transformation, VFS Global |
| Header | Positioned `absolute` inside the sticky viewport, fades in with `screen3Progress`; not truly locked |

---

## Planned Changes

### 1. Trim projects array to 4 cards
**File:** `src/App.js` – `projects` constant (~line 127)

Remove the last entry `"VFS Global: / VFS Insight"`. Retain in order:
1. ADPM UI Revamp
2. Eden Monaro
3. Health Landscape Visualisation
4. ECAS Transformation

> No other project-array-consuming code needs changing; counter and nav dots are already dynamic.

---

### 2. Restructure the section for scroll-lock behaviour

The core mechanic is **scroll-jacking using `position: sticky`** combined with an **expanded scroll container** that creates virtual scroll height for the carousel.

#### 2a. Outer section height
The `screen3Ref` div currently has `height: "150vh"`. Increase to provide enough virtual scroll height to step through all 4 cards:

```
height: `calc(100vh * ${projects.length + 1})`   // e.g. 500vh for 4 cards
```

This gives the browser real scroll distance to consume inside the section, keeping the page from advancing until the user exits the section.

#### 2b. Sticky inner layout
The sticky container inside `screen3Ref` stays at `top: 0`, `height: "100vh"`. No change required here structurally, but tweak:
- The `"Featured Projects"` header div moves to a **fixed-position** element (or retains `position: sticky` inside the sticky container) with `top: <navHeight + 60>px`. Nav height is currently ~60 px (see line 1091 where `isHoveringNav` sets cursor; actual nav bar must be measured — use `60px` nav + `60px` padding = `top: 120px`).
- The carousel div below the header fills the remaining viewport height and is the only visible scroll target.

---

### 3. Replace `handleProjectWheel` with intersection-based scroll-jacking

**File:** `src/App.js` – `handleProjectWheel` function (~line 756) and its `useEffect` registration (~line 786–791).

#### New logic

```
Wheel event fires
│
├─ Is the screen3 section currently "active"?
│   (section top ≤ window.scrollY < section bottom − innerHeight)
│
├─ YES → is a wheel lock already active?
│         ├─ YES  → preventDefault() and return (debounce)
│         └─ NO   →
│               direction = deltaY > 0 ? 'down' : 'up'
│               nextIndex = clamp(activeIndex + direction, 0, 3)
│               │
│               ├─ nextIndex !== activeIndex  →  preventDefault()
│               │                                set activeIndex = nextIndex
│               │                                start 650 ms lock
│               │
│               └─ nextIndex === activeIndex AND already at boundary
│                     → do NOT preventDefault()  → page scrolls naturally
│
└─ NO  → do nothing (page scrolls normally)
```

**Key boundary pass-through rules:**
- **Last card, scrolling down** (`activeIndex === 3` and `deltaY > 0`): do **not** call `e.preventDefault()`. The expanded section height means the browser now scrolls the page past the section.
- **First card, scrolling up** (`activeIndex === 0` and `deltaY < 0`): do **not** call `e.preventDefault()`. Page scrolls upward normally.

> This replaces the current approach that always intercepts when the carousel div is in view regardless of boundary state.

#### Wheel listener registration

The current `useEffect` adds the listener to `window` with `passive: false`. Keep this approach. Remove `onWheel={handleProjectWheel}` from the carousel JSX (line 1616) to avoid double-firing — the window listener is sufficient.

---

### 4. Header lock — 60 px offset from top nav

**File:** `src/App.js` – Header div inside the sticky container (~line 1552–1611)

Change the header's positioning to make the title visually "lock" at `top: nav_height + 60px` as the page enters the section. The existing `position: absolute; top: 0` with an entrance transition works, but needs:

```js
// Change:
padding: "4rem 6rem 1rem"   // currently drives header offset

// To (approximate match for 60 px below nav):
position: "sticky",
top: "120px",   // 60px nav + 60px padding requirement
```

Or keep `position: absolute` and change `top: 0` → `top: "120px"` with no entrance translateY animation (since the section is already sticky, the header appears immediately when scrolled in).

> **Exact nav height** – The nav bar renders at fixed position; its rendered height should be validated by inspecting the browser. We assume 60 px based on the cursor hover size found in the code. Update `120px` if the actual nav differs.

---

### 5. Carousel visible area adjustment

Currently `paddingTop: "30rem"` on the carousel div pushes cards very far down. With the header now sticky at ~120 px from top, the carousel needs to start just below the header:

```js
// Change paddingTop from "30rem" to account for header height
paddingTop: "calc(120px + <header height>)"
// Estimated: header (~120px tall content) + 120px top offset → ~260px total
paddingTop: "260px"
```

The exact value should be fine-tuned visually after implementation.

---

## Summary of File Changes

| File | Change |
|---|---|
| `src/App.js` | Remove 5th project from `projects` array |
| `src/App.js` | Increase `screen3Ref` div height to `calc(100vh * 5)` |
| `src/App.js` | Rewrite `handleProjectWheel` with boundary pass-through logic |
| `src/App.js` | Change header div to `position: sticky, top: 120px` |
| `src/App.js` | Adjust carousel `paddingTop` from `"30rem"` to ~`"260px"` |

No new files needed. All changes are confined to `src/App.js`.

---

## Verification Plan

### Manual browser testing (dev server already running on `npm start`)

Open `http://localhost:3000` in the browser.

1. **Card count** – Scroll to Featured Projects. Confirm exactly **4 cards** display (ADPM UI Revamp, Eden Monaro, Health Landscape Visualisation, ECAS Transformation). Counter should read `01/04` → `04/04`.

2. **Header lock** – Begin scrolling into the Featured Projects section. Confirm the "Featured Projects" title and subtitle text **stay fixed** while scroll events only animate the card carousel below. Measure visually that title is ≈60 px below the nav bar.

3. **Carousel-only scroll (middle cards)** – While on card 01, scroll down. Confirm:
   - Page does **not** advance past Featured Projects.
   - Card transitions to 02, then 03, then 04.
   - At each step, only the carousel moves.

4. **Bottom boundary pass-through** – On card 04 (`04/04`), scroll **downward**. Confirm the page resumes normal scrolling and progresses past the Featured Projects section to the footer/contact section.

5. **Top boundary pass-through** – Scroll back up until on card 01 (`01/04`). Scroll **upward**. Confirm the page scrolls up normally past Featured Projects back into the Velocity Engine / Our Clients section.

6. **Debounce / smoothness** – Rapidly scroll through cards. Confirm no index skips more than one at a time; debounce lock is working.

7. **Side nav dots & slider** – Confirm dot indicators and the side progress slider still track `activeProjectIndex` correctly with only 4 dots.
