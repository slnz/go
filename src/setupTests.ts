// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import { setupIonicReact } from '@ionic/react'
import { mockIonicReact } from '@ionic/react-test-utils'

setupIonicReact({
  mode: 'md'
})
mockIonicReact()

// Mock matchmedia
window.matchMedia =
  window.matchMedia ||
  function (): MediaQueryList {
    return {
      matches: false,
      addListener: (): void => {},
      removeListener: (): void => {}
    } as unknown as MediaQueryList
  }
