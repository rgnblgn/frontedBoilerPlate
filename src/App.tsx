import { useEffect, useState } from 'react'
import { createStateMachine } from '@features/state-machine/machine'
import type { State } from '@features/state-machine/types'

const machine = createStateMachine({ status: 'idle' })

export default function App() {
  const [state, setState] = useState<State>(machine.getState())

  useEffect(() => {
    return machine.subscribe(setState)
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Machine demo</h1>

      <pre>{JSON.stringify(state, null, 2)}</pre>

      <button
        onClick={() =>
          machine.dispatch({ type: 'EDITING', value: 'hello' })
        }
      >
        Edit
      </button>

      <button
        onClick={() =>
          machine.dispatch({ type: 'SUBMIT' })
        }
      >
        Submit
      </button>
    </div>
  )
}
