const GestureHandler = {
  // Mock the methods you commonly use in tests
  Swipeable: jest.fn().mockImplementation(({ children }) => children),
  DrawerLayout: jest.fn().mockImplementation(({ children }) => children),

  // Basic gesture handler methods
  State: {},
  Directions: {},

  // Gesture handlers
  PanGestureHandler: jest.fn().mockImplementation(({ children }) => children),
  TapGestureHandler: jest.fn().mockImplementation(({ children }) => children),
  LongPressGestureHandler: jest
    .fn()
    .mockImplementation(({ children }) => children),
  RotationGestureHandler: jest
    .fn()
    .mockImplementation(({ children }) => children),
  FlingGestureHandler: jest.fn().mockImplementation(({ children }) => children),
  PinchGestureHandler: jest.fn().mockImplementation(({ children }) => children),

  // Gesture handler root view mock
  GestureHandlerRootView: jest
    .fn()
    .mockImplementation(({ children }) => children),

  // Dummy functions to avoid breaking tests
  gestureHandlerRootHOC: jest.fn((Component) => Component),
};

module.exports = { GestureHandler };
