const Axes = {
  SCREENXY: 0,
  DPADONE: 1,
  DPADTWO: 2,
  MOVEMENT_IDLE: 0,
  MOVEMENT_WALKING_FORWARD: 11,
  MOVEMENT_JOGGING_FORWARD: 12,
  MOVEMENT_RUNNING_FORWARD: 13,
  MOVEMENT_WALKING_BACKWARD: 14,
  MOVEMENT_JOGGING_BACKWARD: 15,
  MOVEMENT_STRAFING_RIGHT: 16,
  MOVEMENT_STRAFING_LEFT: 17,
  MOVEMENT_RUNNING_BACKWARD: 18
}

const Actions = {
  DEFAULT: -1,
  PRIMARY: 0,
  SECONDARY: 1,
  FORWARD: 2,
  BACKWARD: 3,
  UP: 4,
  DOWN: 5,
  LEFT: 6,
  RIGHT: 7,
  INTERACT: 8,
  CROUCH: 9,
  JUMP: 10,
  WALK: 11,
  RUN: 12,
  SPRINT: 13
}

const Axes = {
  SCREENXY: 0,
  DPADONE: 1,
  DPADTWO: 2
}

const AxisMap = {
  [Axes.SCREENXY]: { x: 0, y: 0 },
  [Axes.DPADONE]: { x: 0, y: 0 },
  [Axes.DPADTWO]: { x: 0, y: 0 }
}

const ActionMap = {
  [Actions.FORWARD]: { opposes: [Actions.BACKWARD] },
  [Actions.BACKWARD]: { opposes: [Actions.FORWARD] },
  [Actions.LEFT]: { opposes: [Actions.RIGHT] },
  [Actions.RIGHT]: { opposes: [Actions.LEFT] }
}

const KeyboardInputMap = {
  w: Actions.FORWARD,
  a: Actions.LEFT,
  s: Actions.RIGHT,
  d: Actions.BACKWARD
}

const MouseInputActionMap = {
  0: Actions.PRIMARY,
  2: Actions.SECONDARY, // Right mouse
  1: Actions.INTERACT // Middle Mouse button
}

const MouseInputAxisMap = {
  mousePosition: Axes.SCREENXY
}
