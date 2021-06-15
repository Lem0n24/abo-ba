const fateEffect = (id )=> {
  const element = document.getElementById('root-loader');

  if (!element) {
    return;
  }

  element.classList.add('loader-fade-effect');

  setTimeout(() => {
    element.remove();
  }, 500);
}
export {
  fateEffect
} 