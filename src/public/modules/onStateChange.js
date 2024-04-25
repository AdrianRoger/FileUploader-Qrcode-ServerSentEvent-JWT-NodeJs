export default function onStateChange(path) {
  return new CustomEvent('onStateChange', { detail :{ path : path}});
}