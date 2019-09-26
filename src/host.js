export const emit = (host, name, detail) => {
  const event = new CustomEvent(name, {
    detail,
    bubbles: true,
    composed: true
  });
  host.dispatchEvent(event);
};
