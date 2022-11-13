export const setValueOnLocalStorage = (key: string, value: any) => {
  const valueToString = JSON.stringify(value);

  localStorage.setItem(key, valueToString);
};

export const getValueFromLocalStorage = <T>(key: string) => {
  const localStorageValue = localStorage.getItem(key);

  if (localStorageValue) {
    const updatedLocalStorageValue: T = JSON.parse(localStorageValue);
    return updatedLocalStorageValue;
  }

  return null;
};

export const removeLocalStorage = (key: string) =>{
    localStorage.removeItem(key)
}