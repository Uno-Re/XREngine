import React, { Component } from 'react'
import NodeEditor from './NodeEditor'
import InputGroup from '../inputs/InputGroup'
import ColorInput from '../inputs/ColorInput'
import NumericInputGroup from '../inputs/NumericInputGroup'
import LightShadowProperties from './LightShadowProperties'
import { Bolt } from '@styled-icons/fa-solid/Bolt'
import { useTranslation } from 'react-i18next'
import BooleanInput from '../inputs/BooleanInput'
import { CommandManager } from '../../managers/CommandManager'
import { getComponent } from '@xrengine/engine/src/ecs/functions/ComponentFunctions'
import { DirectionalLightComponent } from '@xrengine/engine/src/scene/components/DirectionalLightComponent'

/**
 * Defining properties for DirectionalLightNodeEditor.
 *
 * @author Robert Long
 * @type {Object}
 */
type DirectionalLightNodeEditorProps = {
  node?: any
}

/**
 * DirectionalLightNodeEditor is used provides  properties to customize DirectionaLight element.
 *
 *  @author Robert Long
 *  @type {Component class}
 */
export const DirectionalLightNodeEditor = (props: DirectionalLightNodeEditorProps) => {
  const { t } = useTranslation()

  //function to handle changes in color property
  const onChangeColor = (color) => {
    CommandManager.instance.setPropertyOnEntity(props.node.entity, DirectionalLightComponent, 'color', color)
  }
  //function to handle the changes in intensity property of DirectionalLight
  const onChangeIntensity = (intensity) => {
    CommandManager.instance.setPropertyOnEntity(props.node.entity, DirectionalLightComponent, 'intensity', intensity)
  }

  //function to handle the changes in camera far property of DirectionalLight
  const onChangeCameraFar = (cameraFar) => {
    CommandManager.instance.setPropertyOnEntity(props.node.entity, DirectionalLightComponent, 'cameraFar', cameraFar)
  }

  // function to handle changes in showCameraHelper propery
  const onChangeshowCameraHelper = (showCameraHelper) => {
    CommandManager.instance.setPropertyOnEntity(props.node.entity, DirectionalLightComponent, 'showCameraHelper', showCameraHelper)
  }

  // renders editor view, provides inputs to customize properties of DirectionalLight element.
  const lightComponent = getComponent(props.node.entity, DirectionalLightComponent)

  return (
    <NodeEditor {...props} description={t('editor:properties.directionalLight.description')}>
      <InputGroup name="Color" label={t('editor:properties.directionalLight.lbl-color')}>
        <ColorInput value={lightComponent.color} onChange={onChangeColor} />
      </InputGroup>
      <NumericInputGroup
        name="Intensity"
        label={t('editor:properties.directionalLight.lbl-intensity')}
        min={0}
        smallStep={0.001}
        mediumStep={0.01}
        largeStep={0.1}
        value={lightComponent.intensity}
        onChange={onChangeIntensity}
        unit="cd"
      />
      <LightShadowProperties node={props.node} comp={DirectionalLightComponent} />
      <InputGroup name="Camera Debugger" label={t('editor:properties.directionalLight.lbl-showCameraHelper')}>
        <BooleanInput value={lightComponent.showCameraHelper} onChange={onChangeshowCameraHelper} />
      </InputGroup>
      <NumericInputGroup
        name="CameraFar"
        label={t('editor:properties.directionalLight.lbl-cameraFar')}
        min={0}
        smallStep={0.01}
        mediumStep={0.1}
        largeStep={1}
        value={lightComponent.cameraFar}
        onChange={onChangeCameraFar}
      />
    </NodeEditor>
  )
}

DirectionalLightNodeEditor.iconComponent = Bolt

export default DirectionalLightNodeEditor
