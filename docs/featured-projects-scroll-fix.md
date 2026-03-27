# Featured Projects – Scroll-Lock Fix Plan

## Revised Scope

The **"Featured Projects" heading may scroll out naturally** — no sticky header needed.

The **card carousel must scroll-lock**: when the user scrolls into the carousel zone, scroll events are captured and only advance the carousel. The page resumes scrolling at the top/bottom boundary of the carousel.

---

## Bugs to Fix

From the diagnosis, there are **3 bugs** to resolve:

| # | Bug | Root Cause |
|---|---|---|
| 1 | Scroll-lock never activates | `isSectionActive` condition uses `getBoundingClientRect()`, which is offset by the early section reveal animation — the user sees cards before `rect.top` ever hits ≤ 0 |
| 2 | Stale closure on `activeProjectIndex` | The wheel handler reads index from a stale closure; during rapid scrolling, the boundary guards check the wrong value |
| 3 | Sticky header inside sticky container | `position: sticky` inside `position: sticky` has no independent scroll parent and doesn't work — **moot now since the heading will scroll out** |

---

## Proposed Changes

All changes are in `src/App.js` only.

---

### Fix 1 — Correct `isSectionActive` detection

**Problem:** `getBoundingClientRect().top <= 0` is the wrong condition. The section's reveal animation starts when `rect.top < screenHeight * 0.8` (80% of viewport), so the user sees the carousel before the section has actually scrolled to the top.

**Fix:** Use `offsetTop` and `window.scrollY` (document-space coordinates that don't vary with reveal animations):

```js
const sectionTop = screen3Ref.current.offsetTop;
const sectionHeight = screen3Ref.current.offsetHeight;
const scrollY = window.scrollY;

// Active = user has scrolled into the section but not past it
const isSectionActive = scrollY >= sectionTop && scrollY < (sectionTop + sectionHeight - windowHeight);
```

The section height is `calc(100vh * 5)` = 500vh. The window height is ~100vh. So the carousel is active from `scrollY = sectionTop` until `scrollY = sectionTop + 400vh` — exactly the virtual range consumed by the 4 cards.

---

### Fix 2 — Eliminate stale closure on `activeProjectIndex`

**Problem:** `handleProjectWheel` is a regular function that closes over `activeProjectIndex` state. Even though `useEffect` re-registers the listener when `activeProjectIndex` changes, during the 650ms debounce window, a new wheel event can arrive and read the *old* index — causing boundary guards to fire incorrectly.

**Fix:** Sync `activeProjectIndex` into a ref on every render and read **that ref** inside the handler:

```js
// Add new ref near the other refs (~line 81):
const activeProjectIndexRef = useRef(activeProjectIndex);

// Sync on every render (one-liner near the top of the component body):
activeProjectIndexRef.current = activeProjectIndex;
```

Then inside `handleProjectWheel`, replace every read of `activeProjectIndex` with `activeProjectIndexRef.current`:

```js
// Boundary checks (use ref, not state):
if (direction === 1 && activeProjectIndexRef.current === projects.length - 1) return;
if (direction === -1 && activeProjectIndexRef.current === 0) return;
```

This removes the need to depend on `activeProjectIndex` in the `useEffect` dependency array entirely, which also eliminates the listener churn on every card change.

```js
// Simplified useEffect — no longer needs activeProjectIndex:
useEffect(() => {
  if (showLanding) return;
  const wheelListener = (e) => handleProjectWheel(e);
  window.addEventListener("wheel", wheelListener, { passive: false });
  return () => window.removeEventListener("wheel", wheelListener);
}, [showLanding]); // <-- removed activeProjectIndex from deps
```

---

### Fix 3 — Revert header to original (heading scrolls out naturally)

**Requirement change:** The heading does not need to stay sticky.

**Fix:** Revert the header div back to `position: absolute; top: 0` with the original `padding: "4rem 6rem 1rem"` and entrance animation. This also removes the layout problem caused by sticky-inside-sticky.

```js
// Revert header styles to original:
{
  padding: "4rem 6rem 1rem",
  opacity: screen3Progress > 0.2 ? 1 : 0,
  transform: `translateY(${screen3Progress > 0.2 ? 0 : 50}px)`,
  transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  pointerEvents: "none",
  background: "transparent",
}
```

The carousel `paddingTop` should also be restored to a value that accounts for the header (e.g., `"30rem"` was the original, or tune to `"18rem"` to give cards more visible area below the heading).

---

## Summary of File Changes

| Location in `App.js` | Change |
|---|---|
| Add `activeProjectIndexRef` near `~line 81` | New `useRef` mirroring `activeProjectIndex` |
| Add sync line in component body | `activeProjectIndexRef.current = activeProjectIndex;` |
| `handleProjectWheel` `~line 752` | Replace `getBoundingClientRect` with `offsetTop`/`scrollY` check; replace `activeProjectIndex` reads with `activeProjectIndexRef.current` |
| `useEffect` for wheel listener `~line 792` | Remove `activeProjectIndex` from dependency array |
| Header div `~line 1559` | Revert to `position: absolute; top: 0; padding: "4rem 6rem 1rem"` with entrance animation |
| Carousel div `paddingTop` `~line 1630` | Tune to `"18rem"` (or restore `"30rem"`) |

No new files needed.

---

## Verification Plan

1. **Enter section** — Scroll down to Featured Projects. When the heading scrolls past the top of the viewport, the carousel should take over scroll control.
2. **Cards advance** — Each additional scroll down advances one card. Counter reads `01/04` → `04/04`.
3. **Bottom boundary** — On card `04/04`, scroll down. The page resumes scrolling to the footer.
4. **Top boundary** — On card `01/04`, scroll up. The page resumes scrolling upward past the section.
5. **No skips** — Rapid scrolling during debounce should never skip more than one card.
