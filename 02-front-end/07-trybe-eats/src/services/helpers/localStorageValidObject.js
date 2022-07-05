const localStorageValidObject = (key) => {
  const storage = JSON.parse(localStorage.getItem(key));
  const storageValid = storage === null ? {} : storage;
  return storageValid;
};

export default localStorageValidObject;
