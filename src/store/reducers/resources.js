/* eslint-disable guard-for-in */
/* eslint-disable no-case-declarations */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable default-param-last */
import { combineReducers } from "redux";
import _ from "lodash";

export const RESOURCE_NAMES = {
  USERS: "users",
};

const reducer = (resourceName) => (state = {}, action) => {
  let temp = {};
  switch (action.type) {
  case `resources.${resourceName}.set`: {
    const data = action.payload;
    const _data = data.rows ? data.rows : _.isArray(data) ? data : [action.payload];
    return {
      ...state,
      ..._.keyBy(_data, "id"),
    };
  }
  case `resources.${resourceName}.update`:
    return {
      ...state,
      [action.payload.id]: {
        ..._.cloneDeep(state[action.payload.id]),
        ...action.payload.data,
      },
    };
  case `resources.${resourceName}.delete`:
    temp = _.cloneDeep(state);
    delete temp[action.payload];
    return temp;
  case `resources.${resourceName}.overwrite`:
    const data = action.payload;
    const data1 = data.rows ? data.rows : _.isArray(data) ? data : [action.payload];
    return {
      ..._.keyBy(data1, "id"),
    };
  default:
    return state;
  }
};

const allReducers = {};
for (const f in RESOURCE_NAMES) {
  allReducers[RESOURCE_NAMES[f]] = reducer(RESOURCE_NAMES[f]);
}

export default combineReducers(allReducers);
