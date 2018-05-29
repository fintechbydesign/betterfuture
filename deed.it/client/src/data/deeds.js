import { getData, postData, REFRESH } from './fetchWrapper';
import { updateLocalUser } from "./user";

let mappedDeedTypes;

const populateDeedTypesMap = (deedHierarchy) => {
  mappedDeedTypes = deedHierarchy.reduce(
    (map, superDeed) => {
      superDeed.deedTypes.reduce(
        (map, deedType) => {
          map[deedType.id] = deedType;
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

const createSelectedDeed = async(user) => {
  if (!user.deeds.selected.deedType) {
    throw new Error('No selected deed type');
  }
  await createDeed(user, user.deeds.selected.deedType)
  updateLocalUser({
    ...user,
    deeds: {
      ...user.deeds,
      selected: null
    }
  });
};

const getUserDeeds = async(user, force = false) => {
  if (!mappedDeedTypes) {
    await getDeedHierarchy();
  }

  const endpoint = `deeditUserProfile?username=${user.username}`;
  const profile = await getData(endpoint, force);
  const deeds = profile.deeds || [];
  const events = profile.events || [];
  const unhydratedCurrent = deeds.filter((deed) => deed.deedStatus === 'created');
  let current;
  switch (unhydratedCurrent.length) {
    case 0:
      current = null;
      break;
    case 1:
      current = appendDeedTypeProps(unhydratedCurrent[0]);
      break;
    default:
      throw new Error(`More than one current deed: ${unhydratedCurrent}`);
  }
  const approved = deeds.filter((deed) => deed.deedStatus === 'approved').map(appendDeedTypeProps);
  const unapproved = deeds.filter((deed) => deed.deedStatus === 'unapproved').map(appendDeedTypeProps);
  return { current, approved, unapproved, events };
};

const updateDeed = async(deed) => {
  const { id, status }= deed;
  const endPoint = `set-deed-status/${id}/${status}`;
  console.log('WARNING: updateDeed is not correct!');
  return postData(endPoint);
}

export {
  createSelectedDeed,
  getDeedHierarchy,
  getUserDeeds,
  updateDeed,
  REFRESH
};
