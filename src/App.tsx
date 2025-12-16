import { useReducer } from 'react'
import { reducer } from '@features/state-machine/reducer'
import type { State } from '@features/state-machine/types'

const initialState: State = { status: 'idle' }

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => dispatch({ type: 'EDITING', value: 'hi' })}>
        Edit
      </button>
    </div>
  )
}
