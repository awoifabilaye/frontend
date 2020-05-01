import React from 'react'
import SandboxComponent from 'components/Sandbox'
import SandboxServiceComponent from 'components/Sandbox/index.service'
import ContextComponent from 'components/Cache/Context'
import { initializePriorityQueue } from 'store/ducks/cache/service'

const queues = {
  searchImages: initializePriorityQueue(),
}

class SandboxScreen extends React.Component {
  render() {
    return (
      <SandboxServiceComponent>
        {(searchProps) => (
          <ContextComponent.Provider value={queues}>
            <SandboxComponent
              {...searchProps}
            />
          </ContextComponent.Provider>
        )}
      </SandboxServiceComponent>
    )
  }
}

export default SandboxScreen