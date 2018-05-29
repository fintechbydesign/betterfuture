import { getData, postData, REFRESH } from './fetchWrapper';

let mappedDeedTypes;

const populateDeedTypesMap = (deedHierarchy) => {
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
};

const appendDeedTypeProps = (deed) => ({ ...mappedDeedTypes[deed.deedTypeId], ...deed });

const getDeedHierarchy = async() => {
  const deedHierarchy = await getData('deeditDeedHierarchy');
  // yuk yuk yuk
  if (!mappedDeedTypes) {
    populateDeedTypesMap(deedHierarchy);
  }
  return deedHierarchy;
};

const createDeed = async(user, deedType) => {
  console.log('CREATE DEED, user:', user, 'deedType:', deedType);
  const body = {
    deedTypeId: deedType.id,
    username: user.username
  };
  return postData('deeditCreateUserDeed', body);
};

const getUserDeeds = async(user, force = false) => {
  if (!mappedDeedTypes) {
    await getDeedHierarchy();
  }

  const endpoint = `deeditUserProfile?username=${user.username}`;
  const profile = await getData(endpoint, force);
  const deeds = profile.deeds || [];
  const events = profile.events || [];
  let current = deeds.filter((deed) => deed.status === 'created');
  switch (current.length) {
    case 0:
      current = null;
      break;
    case 1:
      current = appendDeedTypeProps(current[0]);
      break;
    default:
      throw new Error(`More than one current deed: ${current}`);
  }
  const approved = deeds.filter((deed) => deed.status === 'approved').map(appendDeedTypeProps);
  const unapproved = deeds.filter((deed) => deed.status === 'unapproved').map(appendDeedTypeProps);
  return { current, approved, unapproved, events };
};

const updateDeed = async(deed) => {
  const { id, status }= deed;
  const endPoint = `set-deed-status/${id}/${status}`;
  console.log('WARNING: updateDeed is not correct!');
  return postData(endPoint);
}

export {
  createDeed,
  getDeedHierarchy,
  getUserDeeds,
  updateDeed,
  REFRESH
};
