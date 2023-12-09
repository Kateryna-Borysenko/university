export const customMiddlewareLogger = (store) => (next) => (action) => {
  if (action.payload) {
    console.log(`%c ${action.type}:`, "color: #6a0", action.payload);
  }
  return next(action);
};
