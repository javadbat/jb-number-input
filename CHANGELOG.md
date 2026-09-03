# Changelog

## [2.0.0] - 2026-09-03

### Changed

- Added the readonly native-style `valueAsNumber` representation; empty or incomplete values return `NaN`.
- Added inherited support for the standard public `reset()` method through `jb-input`.
- Breaking: renamed React keyboard event props to the React convention: `onBeforeInput`, `onKeyDown`, and `onKeyUp`; old prop names are removed.

## [1.8.0] - 2026-09-01

### Changed

- Made custom-element module evaluation SSR-safe by extending `JBBaseComponent` where needed and registering elements through the shared `defineWebComponent()` helper; raised the minimum `jb-core` version to `0.36.0`.

## [1.7.0] - 2026-08-15

### Added

- Added Storybook interaction coverage for initial-value initialization, live-value precedence, explicit `null`, and native form reset.

### Changed

- Replaced the control buttons' embedded SVGs with `jb-icon-plus` and `jb-icon-minus` from `jb-icons`.
- Aligned control icons centrally and made button and icon dimensions follow the inherited `jb-input` size variants.
- Updated component color defaults to use the shared semantic content and surface tokens.
- Updated the React wrapper so an omitted `value` no longer writes an empty live value, allowing the inherited `initialValue` behavior to initialize the component; explicit `null` still clears the live value.

## [1.6.0] - 2026-07-19

### Changed

- Increase and decrease controls now use native buttons with visible keyboard focus and follow the input's disabled state.
- Added the React `initialValue` prop and forwarded `value` and `initialValue` directly as React 19 custom-element properties.
