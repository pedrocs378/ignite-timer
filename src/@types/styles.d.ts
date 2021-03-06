declare module Styles {
  type Variant = 'danger' | 'success' | 'warning'
  type Colors =
    keyof typeof import('../styles/themes/default').defaultTheme.colors

  declare module Font {
    type Sizes =
      keyof typeof import('../styles/themes/default').defaultTheme.fontSizes
    type Weights =
      keyof typeof import('../styles/themes/default').defaultTheme.fontWeights
  }
}
