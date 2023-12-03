/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-cycle */
import axs from "axios";
import { setResource, overwriteResource, updateResource } from "../store/actions/resources";
import sessionUtils from "./sessionUtils";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const axios = axs.create({
  baseURL,
});

export let axsCancelSource = axs.CancelToken.source();
export const refreshAxsCancelToken = () => {
  axsCancelSource = axs.CancelToken.source();
};

axios.interceptors.request.use((config) => {
  const token = sessionUtils.getToken() || "";
  config.headers.Authorization = token ? `Bearer ${token}` : "";

  // these configuration will be passed to response and we can automatically map data to redux store
  config.resourceName = config.headers.resourceName;
  config.overwrite = config.headers.overwrite;

  return config;
});

export const interceptResponse = (dispatch, getState) => {
  axios.interceptors.response.use((res) => {
    const { config, data } = res;
    if (!config.resourceName) return res;
    if (config.overwrite) {
      dispatch(overwriteResource(config.resourceName, data));
    } else if (config.method === "patch") {
      dispatch(
        updateResource(config.resourceName, {
          id: data.id,
          data,
        }),
      );
    } else {
      dispatch(setResource(config.resourceName, data));
    }
    return res;
  });
};

export default axios;
