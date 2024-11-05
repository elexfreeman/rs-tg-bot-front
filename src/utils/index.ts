export { formatWordByNumber } from './formatByNumbers'
export { imageIntersectionObserver } from './imageIntersectionObserver'

export const delay = () => {
  return new Promise(resolve => {
    setTimeout(resolve);
  });
}
