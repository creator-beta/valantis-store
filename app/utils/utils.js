export const formatCurrency = (value) => {
  if (isNaN(value)) {
    console.error("Ошибка входного значения");
    return "";
  }
  const parts = value.toString().split(".");
  const formattedValue = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const result = `${formattedValue}₽${parts[1] ? `.${parts[1]}` : ""}`;
  return result;
};
export const getFormattedTimestamp = () => {
  const currentDate = new Date();
  const isoString = currentDate.toISOString();
  const formattedTimestamp = isoString.slice(0, 10).replace(/-/g, "");
  return formattedTimestamp;
};
export const getUniqueValues = (array, getKey = (item) => item) => {
  const uniqueValues = array
    .filter((item) => item != null)
    .filter((item, index, arr) => {
      const key = getKey(item);
      return arr.findIndex((i) => getKey(i) === key) === index;
    });

  return uniqueValues;
};
export const validateObject = (obj) => {
  if (!obj || typeof obj !== "object") {
    return false;
  }

  function isValidNumber(value) {
    return (
      value !== undefined &&
      typeof value === "number" &&
      !isNaN(value) &&
      value !== 0
    );
  }

  function isValidString(value) {
    return (
      value !== undefined && typeof value === "string" && value.trim() !== ""
    );
  }

  const validatedObject = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (isValidNumber(value) || isValidString(value)) {
        validatedObject[key] = isValidNumber(value)
          ? parseFloat(value.toFixed(1))
          : value;
      }
    }
  }

  if (Object.keys(validatedObject).length === 0) {
    return false;
  }

  return validatedObject;
};
