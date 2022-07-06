// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import { mockIonicReact } from '@ionic/react-test-utils'
import { setupIonicReact } from '@ionic/react'

setupIonicReact()
mockIonicReact()

// Mock matchmedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {}, // eslint-disable-line @typescript-eslint/no-empty-function
      removeListener: function () {} // eslint-disable-line @typescript-eslint/no-empty-function
    }
  }
