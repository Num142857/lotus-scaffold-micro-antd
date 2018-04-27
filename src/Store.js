import { createStore } from 'redux'

const initialState = {
  namespace: 'base', // 全局Store的命名空间,每个项目必须不一样.请记得修改
  count: 0,
  refresh: 0
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state,
        count: state.count + 1
      }
    case 'DECREMENT':
      return { ...state,
        count: state.count - 1
      }
    case 'REFRESH':
      return { ...state,
        refresh: state.refresh + 1
      }
    default:
      return state
  }
}

export const storeInstance = createStore(reducer)
