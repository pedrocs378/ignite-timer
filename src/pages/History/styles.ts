import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    color: ${({ theme }) => theme.colors['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;

    th {
      padding: 1rem;
      text-align: left;
      background-color: ${({ theme }) => theme.colors['gray-600']};
      color: ${({ theme }) => theme.colors['gray-100']};
      font-size: ${({ theme }) => theme.fontSizes.sm};
      line-height: 1.6;
      overflow: hidden;

      &:first-child {
        border-top-left-radius: ${({ theme }) => theme.borderRadius.default};
        padding-left: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: ${({ theme }) => theme.borderRadius.default};
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${({ theme }) => theme.colors['gray-700']};
      border-top: 4px solid ${({ theme }) => theme.colors['gray-800']};
      padding: 1rem;
      font-size: ${({ theme }) => theme.fontSizes.sm};
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }
      &:last-child {
        padding-right: 1.5rem;
      }

      &.no-tasks {
        text-align: center;
        vertical-align: middle;
      }
    }
  }
`

type StatusProps = {
  variant?: Styles.Variant
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${({ theme, variant = 'success' }) => theme.colors[variant]};
  }
`
