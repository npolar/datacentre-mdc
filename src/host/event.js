export const addListeners = ({ host, attachTo = host, handlers }) => {
  for (const [eventname, on] of handlers) {
    attachTo.addEventListener(eventname, on);
  }
};
export const removeListeners = ({ host, attachTo = host, handlers }) => {
  for (const [eventname, on] of handlers) {
    attachTo.addEventListener(eventname, on);
  }
};
export const emit = ({ host, name, detail }) => {
  const event = new CustomEvent(name, {
    detail,
    bubbles: true,
    composed: true,
    cancelable: true
  });
  host.dispatchEvent(event);
};
