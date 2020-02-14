import { Component, ReactNode } from 'react'
import { Subject } from 'rxjs'

export function syncState(template: Template, component: Component, getState: () => unknown[]) {
  let current = getState()
  return template.afterChange.subscribe(() => {
    const state = getState()
    if (current.some((x, i) => x !== state[i])) {
      current = state
      component.setState({ })
    }
  })
}

export default class Template extends Component<{ children: ReactNode }> {
  afterChange = new Subject<void>()

  componentDidUpdate() {
    this.afterChange.next()
  }

  get template(): ReactNode {
    return this.props.children
  }

  syncState(component: Component, getState: () => unknown[]) {
    return syncState(this, component, getState)
  }

  render() {
    return null
  }
}
