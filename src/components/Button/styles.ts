import styled from 'styled-components'

import { defaultTheme } from '../../styles/themes/default'

type ContainerProps = {
  variant: Styles.Variant
  fontSize: Styles.Font.Sizes
  fontWeight: Styles.Font.Weights
  color: Styles.Colors
}

type HoverBackgroundColors = {
  [key in Styles.Variant]: string
}

const hoverBackgroundColors: HoverBackgroundColors = {
  success: defaultTheme.colors['green-700'],
  danger: defaultTheme.colors['red-700'],
  warning: defaultTheme.colors['yellow-500'],
}

export const Container = styled.button<ContainerProps>`
  border: 0;
  cursor: pointer;

  height: 64px;
  width: 100%;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  font-size: ${({ theme, fontSize }) => theme.fontSizes[fontSize]};
  font-weight: ${({ theme, fontWeight }) => theme.fontWeights[fontWeight]};

  background-color: ${({ theme, variant }) => theme.colors[variant]};
  color: ${({ theme, color }) => theme.colors[color]};

  transition: all 0.2s;

  &:not(:disabled):hover {
    background-color: ${({ variant }) => hoverBackgroundColors[variant]};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`
