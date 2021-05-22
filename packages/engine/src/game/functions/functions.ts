import { Component } from "../../ecs/classes/Component";
import { Entity } from '../../ecs/classes/Entity';
import { Network } from '../../networking/classes/Network';
import { GameManagerSystem } from '../../game/systems/GameManagerSystem';
import { addComponent, getComponent, getMutableComponent, hasComponent, removeComponent } from '../../ecs/functions/EntityFunctions';

import { Game } from "../components/Game";
import { GameObject } from "../components/GameObject";
import { GamePlayer } from "../components/GamePlayer";
/**
 * @author HydraFire <github.com/HydraFire>
 */
export const getGameEntityFromName = (name: string): Entity => {
  return GameManagerSystem.instance.createdGames.find(entity => getComponent(entity, Game).name === name);
};

export const getEntityFromRoleUuid = (game: Game, role: string, uuid: string): Entity => (game.gameObjects[role] || game.gamePlayers[role]).find(entity => getUuid(entity) === uuid);

export const getEntityArrFromRole = (game: Game, role: string, ): Entity => (game.gameObjects[role] || game.gamePlayers[role]);

export const getRole = (entity: Entity) => {
  return hasComponent(entity, GameObject) ? getComponent(entity, GameObject).role : getComponent(entity, GamePlayer).role;
};
export const setRole = (entity: Entity, newGameRole: string) => {
  return hasComponent(entity, GameObject) ? getMutableComponent(entity, GameObject).role = newGameRole : getMutableComponent(entity, GamePlayer).role = newGameRole;
};
export const getGame = (entity: Entity): Game => {
  return hasComponent(entity, GameObject) ? getComponent(entity, GameObject).game as Game : getComponent(entity, GamePlayer).game as Game;
};
export const getUuid = (entity: Entity) => {
  return hasComponent(entity, GameObject) ? getComponent(entity, GameObject).uuid : getComponent(entity, GamePlayer).uuid;
};

export const getTargetEntity = (entity: Entity, entityTarget: Entity, args: any) => {
  if (args === undefined || args.on === undefined || args.on === 'me') {
    return entity;
  } else if (args.on === 'target') {
    return entityTarget
  } else if (checkRolesNames(entity, args.on)) {
    const game = getGame(entity);
    return getEntityArrFromRole(game, args.on)
  }
};

export const checkRolesNames = ( entity: Entity, str: string ) => {
  const game = getGame(entity);
  return Object.keys(game.gameObjects).concat(Object.keys(game.gamePlayers)).find(v => v === str);
}
