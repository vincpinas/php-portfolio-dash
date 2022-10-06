export const lAF = (e: any) => {
  const parent = e.target.parentElement;
  parent.classList.remove('iF-label'); parent.classList.remove('iFe-label');
  if (e.target.value) parent.classList.add('iF-label');
  else parent.classList.add('iFe-label');
}

export const lAB = (e: any) => {
  const parent = e.target.parentElement;
  parent.classList.remove('iF-label'); parent.classList.remove('iFe-label');
}