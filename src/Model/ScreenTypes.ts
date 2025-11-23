const ScreenTypes = {
  HOME: "HOME",
  SPALSH: "SPALSH",
  ADD_TASK: "ADD TASK",
  TEST: "TEST",
  SIGNIN: "SIGNIN",
  PROFILE: "PROFILE",
};

export interface ScreenParamsList {
  [ScreenTypes.HOME]: undefined;
  [ScreenTypes.SPALSH]: undefined;
  [ScreenTypes.ADD_TASK]: undefined;
  [ScreenTypes.TEST]: undefined;
  [ScreenTypes.SIGNIN]: undefined;
  [ScreenTypes.PROFILE]: undefined;
}

export default ScreenTypes;
