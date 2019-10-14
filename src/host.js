export const emit = (host, name, detail) => {
  const event = new CustomEvent(name, {
    detail,
    bubbles: true,
    composed: true
  });
  host.dispatchEvent(event);
};

// toggle(e) {
// data-toggle="search"
//   const { toggle } = e.target.dataset;
//   if ([true, false].includes(this[toggle])) {
//     this[toggle] = !this[toggle];
//   }
// }
