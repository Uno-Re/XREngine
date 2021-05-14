import { Vector3, Quaternion } from 'three';
import { Behavior } from '../../../../common/interfaces/Behavior';
import { Entity } from '../../../../ecs/classes/Entity';
import { getComponent } from "../../../../ecs/functions/EntityFunctions";
import { addStateComponent, removeStateComponent } from '../../../../game/functions/functionsState';

import { ColliderComponent } from '../../../../physics/components/ColliderComponent';
import { getStorage, setStorage } from '../functions/functionsStorage';

/**
 * @author HydraFire <github.com/HydraFire>
 */

export const displayScore: Behavior = (entity: Entity, args?: any, delta?: number, entityTarget?: Entity, time?: number, checks?: any): void => {
  /*
  const collider = getComponent(entityTarget, ColliderComponent);
  const transform = getComponent(entity, TransformComponent);
  const q = new Quaternion().copy(transform.rotation);
  const force = new Vector3(0, 0, args.forwardForce).applyQuaternion(q);
  collider.body.addForce({
    x: force.x,
    y: force.y + args.upForce,
    z: force.z
   });
   */
};
