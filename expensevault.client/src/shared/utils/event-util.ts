import { createNanoEvents } from 'nanoevents';

const emitter = createNanoEvents();

export const Emitter = emitter;

export const dispatchWindowEvent = (eventName: string, data?: unknown) => {
  emitter.emit(eventName, data);
};

export const addWindowEventListener = (
  eventName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (data?: any) => void,
) => emitter.on(eventName, listener);
