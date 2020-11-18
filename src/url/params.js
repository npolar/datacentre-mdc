export const searchParams = ({
  location = window.location,
  url = new URL(location)
} = {}) => {
  const { searchParams } = new URL(url);
  return searchParams;
};
const _sp = searchParams;

export const get = (
  name,
  { location = window.location, searchParams = _sp(location) } = {}
) => searchParams.get(name);

export const add = (
  [name, value],
  { location = window.location, url = new URL(location) } = {}
) => {
  const { searchParams } = url;
  if (value === undefined) {
    searchParams.delete(name);
  } else {
    searchParams.set(name, value);
  }
  history.replaceState(null, "", url.href);
};

export const set = (name, value, { url = new URL(window.location) } = {}) => {
  const { searchParams } = url;
  if (value === undefined) {
    searchParams.delete(name);
  } else {
    searchParams.set(name, value);
  }
  history.replaceState(null, "", url.href);
};

export const remove = (name, { url = new URL(window.location) } = {}) => {
  set(name, undefined, { url });
};
