/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (propertyListToExclude, objectList) => {
  return objectList?.map(objectItem => {
    propertyListToExclude?.forEach(property => {
      delete objectItem?.[property]
    });
    return objectItem;
  });
};

exports.excludeByProperty = (propertyToExclude, objectList) => {
  return objectList?.filter(objectItem => !(propertyToExclude in objectItem)) ?? [];
};

exports.sumDeep = (objectList) => {
  objectList?.forEach(level1Item => {
    level1Item.objects = level1Item?.objects?.map(level2item => level2item?.val ?? 0)
      ?.reduce((prev, curr) => prev + curr) ?? 0;
  });
  return objectList;
};

exports.applyStatusColor = (colorConfig, statusList) => {
  const colorEntries = Object.entries(colorConfig)
  return statusList?.map(statusItem => {
    let entry = colorEntries?.find(([, valueList]) => {
      return valueList?.includes(statusItem.status)
    })
    return entry !== undefined ? { ...statusItem, color: entry[0] } : null
  })?.filter(Boolean)
};

exports.createGreeting = (greetingFunc, greetingLabel) => {
  return (personName) => {
    return greetingFunc(greetingLabel, personName)
  }
};

exports.setDefaults = (defaultConfig) => {
  return function (config) {
    return {
      ...defaultConfig,
      ...config,
    }
  }
};

exports.fetchUserByNameAndUsersCompany = async (userName, services) => {
  const [status, users] = await Promise.all([services.fetchStatus(), services.fetchUsers()])
  const user = users?.find(userItem => userItem.name === userName)
  const company = await services.fetchCompanyById(user?.companyId)
  return {company, status, user}
};