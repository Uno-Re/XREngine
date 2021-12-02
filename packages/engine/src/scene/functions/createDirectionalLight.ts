import { CameraHelper, DirectionalLight, Vector2, Color } from 'three'
import { isClient } from '../../common/functions/isClient'
import { Engine } from '../../ecs/classes/Engine'
import { Entity } from '../../ecs/classes/Entity'
import { addComponent } from '../../ecs/functions/ComponentFunctions'
import EditorDirectionalLightHelper from '../classes/EditorDirectionalLightHelper'
import { DirectionalLightComponent } from '../components/DirectionalLightComponent'
import { Object3DComponent } from '../components/Object3DComponent'
import { ScenePropertyType, SceneDataComponent } from '../functions/SceneLoading'

export const createDirectionalLight = (entity: Entity, component: SceneDataComponent, _: ScenePropertyType) => {
  if (!isClient || !component) return

  const light = new DirectionalLight()

  light.target.position.set(0, 0, 1)
  light.target.name = 'light-target'
  light.add(light.target)

  if (Engine.isEditor) {
    const helper = new EditorDirectionalLightHelper()
    helper.visible = true
    light.add(helper)
    ;(light as any).helper = helper

    const cameraHelper = new CameraHelper(light.shadow.camera)
    cameraHelper.visible = false
    light.add(cameraHelper)
    ;(light as any).cameraHelper = cameraHelper
  }

  addComponent(entity, DirectionalLightComponent, {
    ...component.props,
    color: new Color(component.props.color),
    shadowMapResolution: new Vector2().fromArray(component.props.shadowMapResolution),
    dirty: true
  })

  addComponent(entity, Object3DComponent, { value: light })
}
