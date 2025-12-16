import "@testing-library/jest-dom";
require("react-native-reanimated").setUpTests();

// Mock NativeEventEmitter to avoid warnings during testing
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

// Mock console methods to suppress logs in CI environments
if (process.env.CI) {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
  };
}
