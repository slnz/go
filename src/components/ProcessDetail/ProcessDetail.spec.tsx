import { render } from '@testing-library/react'

import { ProcessDetail } from '.'

describe('ProcessDetail', () => {
  it('is okay', () => {
    render(<ProcessDetail id="processId" />)
  })
})
