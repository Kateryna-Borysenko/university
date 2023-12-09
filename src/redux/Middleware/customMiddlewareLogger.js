export const customMiddlewareLogger = store => next => action => {
  if (action.payload) {
    console.log(`%c ${action.type}:`, 'color: #e1b4d3', action.payload);
  }
  return next(action);
};
