import { NetworkObjectComponent } from '../components/NetworkObjectComponent'
import { addComponent, getComponent, hasComponent, removeComponent } from '../../ecs/functions/ComponentFunctions'
import { createEntity, removeEntity } from '../../ecs/functions/EntityFunctions'
import { isClient } from '../../common/functions/isClient'
import { NetworkWorldAction } from './NetworkWorldAction'
import { useWorld } from '../../ecs/functions/SystemHooks'
import matches from 'ts-matches'
import { Engine } from '../../ecs/classes/Engine'
import { NetworkObjectOwnedTag } from '../components/NetworkObjectOwnedTag'
import { dispatchFrom, dispatchLocal } from './dispatchFrom'

/**
 * @author Gheric Speiginer <github.com/speigg>
 * @author Josh Field <github.com/HexaField>
 */
export function incomingNetworkReceptor(action) {
  const world = useWorld()

  matches(action)
    .when(NetworkWorldAction.createClient.matches, ({ $from, userId, name }) => {
      if (!isClient) return
      if ($from !== world.hostId) return
      world.clients.set(userId, {
        userId,
        name,
        subscribedChatUpdates: []
      })
    })

    .when(NetworkWorldAction.destroyClient.matches, ({ $from, userId }) => {
      if (!isClient) return
      if ($from !== world.hostId) return
      for (const eid of world.getOwnedNetworkObjects(userId)) {
        const { networkId } = getComponent(eid, NetworkObjectComponent)
        dispatchLocal(NetworkWorldAction.destroyObject({ $from: userId, networkId }))
      }
      if (!isClient || userId === Engine.userId) return
      world.clients.delete(userId)
    })

    .when(NetworkWorldAction.spawnObject.matches, (a) => {
      const isSpawningAvatar = NetworkWorldAction.spawnAvatar.matches.test(a)
      /**
       * When changing location via a portal, the local client entity will be
       * defined when the new world dispatches this action, so ignore it
       */
      if (
        isSpawningAvatar &&
        Engine.userId === a.$from &&
        hasComponent(world.localClientEntity, NetworkObjectComponent)
      ) {
        getComponent(world.localClientEntity, NetworkObjectComponent).networkId = a.networkId
        return
      }
      const params = a.parameters
      const isOwnedByMe = a.$from === Engine.userId
      let entity
      if (isSpawningAvatar && isOwnedByMe) {
        entity = world.localClientEntity
      } else {
        let networkObject = world.getNetworkObject(a.$from, a.networkId)
        if (networkObject) {
          entity = networkObject
        } else if (params?.sceneEntityId) {
          entity = (Engine.scene.children.find((child) => (child as any).sceneEntityId === params.sceneEntityId) as any)
            .entity
        } else {
          entity = createEntity()
        }
      }
      if (isOwnedByMe) addComponent(entity, NetworkObjectOwnedTag, {})

      addComponent(entity, NetworkObjectComponent, {
        ownerId: a.$from,
        networkId: a.networkId,
        prefab: a.prefab,
        parameters: a.parameters
      })
    })

    .when(NetworkWorldAction.destroyObject.matches, (a) => {
      const entity = world.getNetworkObject(a.$from, a.networkId)
      if (entity === world.localClientEntity) return
      if (entity) removeEntity(entity)
    })

    .when(NetworkWorldAction.setEquippedObject.matchesFromAny, (a) => {
      let entity = world.getNetworkObject(a.object.ownerId, a.object.networkId)
      if (entity) {
        if (a.$from === Engine.userId) {
          if (a.equip) {
            if (!hasComponent(entity, NetworkObjectOwnedTag)) {
              addComponent(entity, NetworkObjectOwnedTag, {})
            }
          } else {
            removeComponent(entity, NetworkObjectOwnedTag)
          }
        } else {
          removeComponent(entity, NetworkObjectOwnedTag)
        }

        // Give ownership back to server, so that item shows up where it was last dropped
        if (Engine.userId === world.hostId && !a.equip) {
          addComponent(entity, NetworkObjectOwnedTag, {})
        }
      }
    })
}
