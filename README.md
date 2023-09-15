# js13k

# FAILED: Not finished in time for JS13k.
In the middle of this project I had to completely change the game I was building because the first version was not fun. This contributed to me being unable to finish in time for JS13k 2023.






---

While developing this game, I kept adjusting the State Acrchitecture pattern until I stumbled upon a pattern I'm calling Async State Flow. It's the reducer pattern with less boilerplate, perfect for a small jam.

# AsyncStateFlow

**AsyncStateFlow** is an innovative state management architecture that streamlines state transformations and UI interactions. It is crafted to provide a seamless, intuitive experience, especially when dealing with asynchronous operations and state updates. With AsyncStateFlow, dispatch functions act as the primary "verbs" orchestrating state updates. By leveraging async/await, the architecture ensures a predictable and sequential order of state operations.

In traditional reducer patterns:

1. The frontend triggers a dispatch function with a specific payload.
2. The reducer identifies the appropriate action based on the dispatched type.
3. The payload is passed to the designated action function for state transformation.
4. Once the state is transformed, an update is dispatched to notify the UI to refresh.

However, this conventional method involves several intermediary steps and potentially delays in UI updates.

AsyncStateFlow elegantly simplifies this process. Here, dispatch functions are synonymous with action functions. There's no need to create a separate payload, funnel it through a reducer, relay it to an action function, and then dispatch an additional update for the UI. When the frontend invokes a dispatch in AsyncStateFlow, it leverages async/await to directly receive the updated state. This bypasses the need for separate UI update events and provides a more efficient and responsive experience.



## Overview

At its core, AsyncStateFlow aims to eliminate boilerplate and introduce a more direct approach to state management. Instead of dispatching action objects to be interpreted by a reducer, you directly dispatch functions that handle the asynchronous operations and state updates.

## How It Works

### Dispatch Functions
These functions serve as the entry point from the UI, akin to traditional action creators in Redux. However, instead of returning action objects, they directly return functions (typically asynchronous) that dictate the state transformation.

### Action Functions
These are pure functions responsible for transforming the state. They take the current state (and any other necessary parameters) and return the new state.

## Usage

```javascript
import { dispatch } from 'async-state-flow';

export async function someUIEventTrigger(data) {
  await dispatch(async (prevState) => {
    let state = await someAsyncOperation(prevState, anything_you_need);
    state = await anotherAsyncOperation(state);
    return state;
  });
}
```

In the example above, when `someUIEventTrigger` is invoked (typically from the UI layer), it dispatches a function that handles multiple asynchronous operations in sequence, updating the state after each step.

## Benefits

1. **Simplicity**: Reduces the boilerplate associated with traditional action creators, action types, and reducers.
2. **Flexibility**: Easy to handle complex asynchronous operations, chaining multiple actions, and conditionally dispatching based on the state or other criteria.
3. **Testability**: Action functions remain pure and are easy to test in isolation. Dispatch functions handle orchestration and side-effects, requiring more integration-style testing but keeping the core logic clean.
