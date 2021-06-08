import { Component } from "../../ecs/classes/Component";
// Action Components
import { HasHadInteraction } from "../actions/HasHadInteraction";
import { GameObjectCollisionTag } from "../actions/GameObjectCollisionTag";
import { BallMoving } from "../actions/BallMoving";
import { BallStopped } from "../actions/BallStopped";
// State TagComponents
import { SpawnedObject } from '../templates/gameDefault/components/SpawnedObjectTagComponent';
import { ButtonDown } from '../templates/gameDefault/components/ButtonDownTagComponent';
import { ButtonUp } from '../templates/gameDefault/components/ButtonUpTagComponent';
import { Closed } from '../templates/gameDefault/components/ClosedTagComponent';
import { Open } from '../templates/gameDefault/components/OpenTagComponent';
import { PanelDown } from '../templates/gameDefault/components/PanelDownTagComponent';
import { PanelUp } from '../templates/gameDefault/components/PanelUpTagComponent';
import { YourTurn } from '../templates/Golf/components/YourTurnTagComponent';
import { Goal } from '../templates/Golf/components/GoalTagComponent';
import { Active } from "../templates/gameDefault/components/ActiveTagComponent";
import { Inactive } from "../templates/gameDefault/components/InactiveTagComponent";
import { Ready } from "../templates/Golf/components/ReadyTagComponent";
import { NotReady } from "../templates/Golf/components/NotReadyTagComponent";
/**
 * @author HydraFire <github.com/HydraFire>
 */
// its for adding new Action in State in One Plase, please don't splite this
enum gameActions {
    HasHadInteraction = 'HasHadInteraction',
    GameObjectCollisionTag = 'GameObjectCollisionTag'
}

export const Action = {
    [gameActions.HasHadInteraction]: HasHadInteraction,
    [gameActions.GameObjectCollisionTag]: GameObjectCollisionTag
}
// its for adding new Action in State in One Plase, please don't splite this
enum gameStates {
    Open = 'Open',
    Closed = 'Closed',
    ButtonUp = 'ButtonUp',
    ButtonDown = 'ButtonDown',
    PanelUp = 'PanelUp',
    PanelDown = 'PanelDown',
    
    Waiting = 'Waiting',
    YourTurn = 'YourTurn',
    WaitTurn = 'WaitTurn',
    Goal = 'Goal',

    SpawnedObject = 'SpawnedObject',

    BallMoving = 'BallMoving',
    BallStopped = 'BallStopped',

    Active = 'Active',
    Inactive = 'Inactive',

    Ready = 'Ready',
    NotReady = 'NotReady'
}

class Waiting extends Component<any> {}
class WaitTurn extends Component<any> {}

export const State = {
    [gameStates.Active]: Active,
    [gameStates.Inactive]: Inactive,
    [gameStates.Open]: Open,
    [gameStates.Closed]: Closed,
    [gameStates.ButtonUp]: ButtonUp,
    [gameStates.ButtonDown]: ButtonDown,
    [gameStates.PanelUp]: PanelUp,
    [gameStates.PanelDown]: PanelDown,
    [gameStates.Waiting]: Waiting,
    [gameStates.YourTurn]: YourTurn,
    [gameStates.WaitTurn]: WaitTurn,
    [gameStates.Goal]: Goal,
    [gameStates.SpawnedObject]: SpawnedObject,
    [gameStates.BallMoving]: BallMoving,
    [gameStates.BallStopped]: BallStopped,
    [gameStates.Ready]: Ready,
    [gameStates.NotReady]: NotReady
};



