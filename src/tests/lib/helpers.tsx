import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'
import { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): [client: QueryClient, result: RenderResult] {
  const client = new QueryClient()

  return [
    client,
    render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <SnackbarProvider>{ui}</SnackbarProvider>
        </QueryClientProvider>
      </BrowserRouter>,
      options
    )
  ]
}
