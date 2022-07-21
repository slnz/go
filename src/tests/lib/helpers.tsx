import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'
import { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): [client: QueryClient, result: RenderResult] {
  const client = new QueryClient()

  return [
    client,
    render(
      <QueryClientProvider client={client}>
        <SnackbarProvider>{ui}</SnackbarProvider>
      </QueryClientProvider>,
      options
    )
  ]
}
