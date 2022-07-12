import { ButtonHTMLAttributes } from 'react'

import * as S from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Styles.Button.Variant
}

export function Button({ variant = 'success', ...rest }: ButtonProps) {
  return (
    <S.Container type="button" variant={variant} {...rest}>
      Enviar
    </S.Container>
  )
}
