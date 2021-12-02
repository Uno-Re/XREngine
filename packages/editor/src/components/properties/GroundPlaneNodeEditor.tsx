import React from 'react'
import NodeEditor from './NodeEditor'
import InputGroup from '../inputs/InputGroup'
import ColorInput from '../inputs/ColorInput'
import BooleanInput from '../inputs/BooleanInput'
import { SquareFull } from '@styled-icons/fa-solid/SquareFull'
import { useTranslation } from 'react-i18next'
import { CommandManager } from '../../managers/CommandManager'
import { GroundPlaneComponent } from '@xrengine/engine/src/scene/components/GroundPlaneComponent'
import { EntityTreeNode } from '@xrengine/engine/src/ecs/classes/EntityTree'
import { getComponent } from '@xrengine/engine/src/ecs/functions/ComponentFunctions'
import { ShadowComponent } from '@xrengine/engine/src/scene/components/ShadowComponent'

/**
 * Declaring GroundPlaneNodeEditor properties.
 *
 * @author Robert Long
 * @type {Object}
 */

type GroundPlaneNodeEditorProps = {
  node: EntityTreeNode
  t: Function
}

/**
 * IconComponent is used to render GroundPlaneNode
 *
 * @author Robert Long
 * @type {class component}
 */
export const GroundPlaneNodeEditor = (props: GroundPlaneNodeEditorProps) => {
  const { t } = useTranslation()

  //function handles the changes in color property
  const onChangeColor = (color) => {
    CommandManager.instance.setPropertyOnSelectionEntities(GroundPlaneComponent, 'color', color)
  }

  const onChangeGenerateNavmesh = (generateNavmesh) => {
    CommandManager.instance.setPropertyOnSelectionEntities(GroundPlaneComponent, 'generateNavmesh', generateNavmesh)
  }

  //function handles the changes for receiveShadow property
  const onChangeReceiveShadow = (receiveShadow) => {
    CommandManager.instance.setPropertyOnSelectionEntities(ShadowComponent, 'receiveShadow', receiveShadow)
  }

  // function handles the changes in walkable property
  const onChangeWalkable = (walkable) => {
    CommandManager.instance.setPropertyOnSelectionEntities(GroundPlaneComponent, 'walkable', walkable)
  }

  const groundPlaneComponent = getComponent(props.node.entity, GroundPlaneComponent)
  const shadowComponent = getComponent(props.node.entity, ShadowComponent)

  return (
    <NodeEditor {...props} description={t('editor:properties.groundPlane.description')}>
      <InputGroup name="Color" label={t('editor:properties.groundPlane.lbl-color')}>
        <ColorInput value={groundPlaneComponent.color} onChange={onChangeColor} />
      </InputGroup>
      <InputGroup name="Receive Shadow" label={t('editor:properties.groundPlane.lbl-receiveShadow')}>
        <BooleanInput value={shadowComponent.receiveShadow} onChange={onChangeReceiveShadow} />
      </InputGroup>
      <InputGroup name="Generate Navmesh" label={t('editor:properties.groundPlane.lbl-generateNavmesh')}>
        <BooleanInput value={groundPlaneComponent.generateNavmesh} onChange={onChangeGenerateNavmesh} />
      </InputGroup>
      <InputGroup name="Walkable" label={t('editor:properties.groundPlane.lbl-walkable')}>
        <BooleanInput value={groundPlaneComponent.walkable} onChange={onChangeWalkable} />
      </InputGroup>
    </NodeEditor>
  )
}

GroundPlaneNodeEditor.iconComponent = SquareFull

export default GroundPlaneNodeEditor
