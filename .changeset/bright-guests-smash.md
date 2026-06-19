---
"pelatform-ui": minor
---

Fix multiple issues:

- Remove leftover `console.log(item)` in `MobileNavItemRenderer`
- Fix race condition in mobile nav — add `e.preventDefault()` before `window.location.href`
- Fix broken flag URL template in `LanguageSwitcher`
- Fix typo `"toogle"` → `"toggle"` in `ModeSwitcher` type prop
- Remove duplicate `MenuItem`/`MenuConfig` type definitions in `useMenu`, import from `lib/menu` instead
- Fix `Linkedin` monochrome icon rendering Facebook path data
- Fix Discord, Gitlab, Radixui icons — use `currentColor` instead of hardcoded fills
- Add error logging to empty catch blocks in GitHubButton navigation fallback
