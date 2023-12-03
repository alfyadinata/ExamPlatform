export const getResource = (resourceName) => (state) => state.resources[resourceName];

export const getResourceById = (resourceName, id) => (state) => state.resources[resourceName][id];
