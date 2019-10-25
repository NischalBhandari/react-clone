export default function h(nodeName, attributes, ...children) {
  return { nodeName, attributes, children }
}