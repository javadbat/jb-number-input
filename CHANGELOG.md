# Changelog

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
