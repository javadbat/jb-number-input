# Changelog

## Unreleased

### Added

- Added Storybook interaction coverage for initial-value initialization, live-value precedence, explicit `null`, and native form reset.

### Changed

- Updated the React wrapper so an omitted `value` no longer writes an empty live value, allowing the inherited `initialValue` behavior to initialize the component; explicit `null` still clears the live value.

## [1.6.0] - 2.26-07-19

### Changed

- Increase and decrease controls now use native buttons with visible keyboard focus and follow the input's disabled state.
- Added the React `initialValue` prop and forwarded `value` and `initialValue` directly as React 19 custom-element properties.
