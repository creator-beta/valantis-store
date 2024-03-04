import {
  getFormattedTimestamp,
  getUniqueValues,
  validateObject,
} from "../utils/utils";
import { endpoint, itemsPerPage, methods, password } from "./config";
import { MD5 } from "crypto-js";

export const getData = async (action, params = {}, maxRetries = 2) => {
  const authHeader = MD5(`${password}_${getFormattedTimestamp()}`).toString();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const requestBody = {
      action: action,
      ...(Object.keys(params).length > 0 && { params: params }),
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": authHeader,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status !== 200) {
      console.error(`API Error: ${response.status}`);
      if (maxRetries > 0) {
        return getData(action, params, maxRetries - 1);
      } else {
        throw new Error("Превышено количество попыток");
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getProductsData = async (page = 1, filters = {}) => {
  try {
    const params = validateObject(filters);
    const offset = page === 1 ? 0 : page * itemsPerPage;
    const ids = await getData(
      params ? methods.getFilterItems : methods.getIds,
      params ? params : { offset: offset, limit: itemsPerPage }
    );

    if (!ids.result.length) {
      throw new Error("Товары не найдены");
    }

    const startIdx = itemsPerPage * (page - 1);
    const endIdx = startIdx + itemsPerPage;
    const data = await getData(methods.getItems, {
      ids: params ? ids.result.slice(startIdx, endIdx) : ids.result,
    });

    return isResponseOk(data) ? normalizeData(data.result, "id") : data;
  } catch (error) {
    return error;
  }
};

export const isResponseOk = (response) => {
  return !(response instanceof Error);
};

export const normalizeData = (data, key) => {
  const getKey = key ? (item) => item[key] : (item) => item;
  return getUniqueValues(data, getKey);
};
