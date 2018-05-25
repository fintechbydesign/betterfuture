import { getData, postData } from './fetchWrapper';

let mappedDeedTypes;

const populateDeedTypesMap = async(deedHierarchy) => {
  mappedDeedTypes = deedHierarchy.reduce(
    (map, superDeed) => {
      superDeed.deedTypes.reduce(
        (map, deedType) => {
          map[deedType.deedTypeId] = deedType;
          return map;
        },
        map
      );
      return map;
      },
    {}
  );
}

const appendDeedTypeProps = (deed) => ({ ...mappedDeedTypes[deed.deedTypeId], ...deed });

const getDeedHierarchy = async() => {
  const deedHierarchy = await getData('deed-hierarchy');
  // yuk yuk yuk
  if (!mappedDeedTypes) {
    populateDeedTypesMap(deedHierarchy);
  };
  return deedHierarchy;
}

const createDeed = async(user, deedType) => {
  const body = {
    deedTypeId: deedType.deedTypeId,
    username: user.username
  }
  return postData('create-user-deed', body);
}

const getUserDeeds = async(user) => {
  const endpoint = `user-profile/${user.username}`;
  const profile = await getData(endpoint);
  const deeds = profile.deeds || [];
  const events = profile.events || [];
  let current = deeds.filter((deed) => deed.status === 'created');
  switch(current.length) {
    case 0:
      current = null;
      break;
    case 1:
      current = appendDeedTypeProps(current[0]);
      break;
    default:
      throw new Error(`More than one current deed: ${current}`);
  };
  const approved  = deeds.filter((deed) => deed.status === 'approved').map(appendDeedTypeProps);
  const unapproved  = deeds.filter((deed) => deed.status === 'unapproved').map(appendDeedTypeProps);
  return { current, approved, unapproved, events };
}

export {
  createDeed,
  getDeedHierarchy,
  getUserDeeds
}