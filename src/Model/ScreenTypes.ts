const ScreenTypes = {
  HOME: "HOME",
  SPALSH: "SPALSH",
  ADD_TASK: "ADD TASK",
  TEST: "TEST",
};

export interface ScreenParamsList {
  [ScreenTypes.HOME]: undefined;
  [ScreenTypes.SPALSH]: undefined;
  [ScreenTypes.ADD_TASK]: undefined;
  [ScreenTypes.TEST]: undefined;
}

export default ScreenTypes;
