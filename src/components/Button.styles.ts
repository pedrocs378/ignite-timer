import styled from 'styled-components'

type ContainerProps = {
  variant: Styles.Button.Variant
}

export const Container = styled.button<ContainerProps>`
  border: 0;
  cursor: pointer;

  height: 64px;
  width: 100%;
  border-radius: 8px;

  font-size: 16px;
  font-weight: 700;

  background-color: ${({ theme, variant }) => theme.colors[variant]};

  &:disabled {
    cursor: not-allowed;
    filter: brightness(0.95);
  }
`
