import { ButtonHTMLAttributes } from 'react'

import * as S from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Styles.Button.Variant
  color?: Styles.Button.Colors
  fontSize?: Styles.Font.Sizes
  fontWeight?: Styles.Font.Weights
}

export function Button({
  variant = 'success',
  fontSize = 'md',
  fontWeight = 'bold',
  color = 'gray-100',
  ...rest
}: ButtonProps) {
  return (
    <S.Container
      type="button"
      variant={variant}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      {...rest}
    />
  )
}
