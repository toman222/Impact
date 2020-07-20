import { Action } from '../types/actions'
import { Button } from '../types/buttons'
import { Msg } from './model'

import * as React from 'react'

interface ControlContainerProps extends React.Props<ControlContainer> {
  buttons: Button[]
  onsignal?: (msg: Msg) => void
}

/**
 * Turn an array of Actions into a Msg to perform.
 *
 * @param actions - The Actions to turn into a Msg.
 * @returns The resulting Msg.
 */
function msgFromActions (actions: Action[]): Msg {
  if (actions.length === 0) {
    return new Msg.PerformAction(new Action.Wait(1))
  } else if (actions.length === 1) {
    return new Msg.PerformAction(actions[0])
  }

  return new Msg.Bulk(actions.map(action => new Msg.PerformAction(action)))
}

export class ControlContainer extends React.Component<ControlContainerProps> {
  private static bId: number = 0
  title: string = 'Control'
  buttons: Button[]
  onsignal?: (msg: Msg) => void

  constructor (props: ControlContainerProps) {
    super(props)

    this.buttons = props.buttons
    this.onsignal = props.onsignal
  }

  shouldComponentUpdate (_nextProps: Readonly<{}>, _nextState: Readonly<{}>, _nextContext: any): boolean {
    return true
  }

  render () {
    /**
     * Helper function to turn Buttons into Elements.
     *
     * @param button - The Button to render.
     * @param container - The Container to render in.
     * @returns Element of the Button.
     */
    function renderButton (button: Button, container: ControlContainer) {
      if (button?.actions === undefined) {
        return <span key={ControlContainer.bId++} />
      }

      const msg = msgFromActions(button.actions)
      const onsignal = container.onsignal !== undefined ? container.onsignal : () => {}

      return (
        <span key={ControlContainer.bId++} className='control-button'>
          <button onClick={() => onsignal(msg)}>{button.toString()}</button>
        </span>
      )
    }

    return (
      <div className='container container-control'>
        <div className='title'>{this.title}</div>
        <div className='scroller'>
          {this.buttons.map(button => renderButton(button, this))}
        </div>
      </div>
    )
  }
}

export default ControlContainer
