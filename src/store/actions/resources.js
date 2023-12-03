/* eslint-disable import/no-cycle */
import _ from "lodash";
import axios from "../../utils/axios";

export const setResource = (resourceName, payload) => ({
  type: `resources.${resourceName}.set`,
  payload, // data
});

export const updateResource = (resourceName, payload) => ({
  type: `resources.${resourceName}.update`,
  payload, // { id, data }
});

export const deleteResource = (resourceName, payload) => ({
  type: `resources.${resourceName}.delete`,
  payload, // id
});

// since setResource(resourceName, {}) will always update the state (not overwrite)
export const overwriteResource = (resourceName, payload) => ({
  type: `resources.${resourceName}.overwrite`,
  payload,
});

// overwrite state by default
export const getAllData = (resourceName, query = "", overwrite = true, withTotal = false) => async () => {
  const { data } = await axios.get(`/${resourceName}?${query}`, {
    headers: {
      resourceName,
      overwrite,
    },
  });

  if (withTotal) return { total: _.get(data, "total", 0), data: _.get(data, "data", data) };
  return _.get(data, "data", data);
};

// update state by default
export const getDataById = (resourceName, id, query = "", overwrite = false) => async () => {
  const { data } = await axios.get(`/${resourceName}/${id}?${query}`, {
    headers: {
      resourceName,
      overwrite,
    },
  });
  return data;
};

export const updateData = (resourceName) => (id, update, query = "") => async () => {
  const { data } = await axios.patch(`/${resourceName}/${id}?${query}`, update, {
    headers: {
      resourceName,
    },
  });
  return data;
};

export const addData = (resourceName) => (payload) => async (dispatch) => {
  const response = await axios.post(`/${resourceName}`, payload, {
    headers: {
      resourceName,
    },
  });
  const data = _.get(response.data, "data", response.data);

  return _.isArray(data)
    // eslint-disable-next-line no-shadow
    ? _.map(data, (data) => dispatch(updateResource(resourceName, { id: data.id, data })))
    : dispatch(updateResource(resourceName, { id: data.id, data }));
};

export const deleteData = (resourceName, id) => async (dispatch) => {
  await axios.delete(`/${resourceName}/${id}`);
  return dispatch(deleteResource(resourceName, id));
};
