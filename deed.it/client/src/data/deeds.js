import { getData, postData, REFRESH } from './fetchWrapper';

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
  if (!user.selected.deedType) {
    throw new Error('No selected deed type');
  }
  await createDeed(user, user.selected.deedType)
};

const getUserDeeds = async(user, force = false) => {
  if (!mappedDeedTypes) {
    await getDeedHierarchy();
  }

  const endpoint = `deeditUserProfile?username=${user.username}`;
  const profile = await getData(endpoint, force);
  const deeds = profile.deeds || [];
  const events = profile.events || [];
  const created = deeds.filter((deed) => deed.deedStatus === 'created');
  const inProgress = (created.lehgth === 0)
    ? null
    : created.map(appendDeedTypeProps);
  const completed = deeds.filter((deed) => deed.deedStatus === 'completed').map(appendDeedTypeProps);
  const unapproved = deeds.filter((deed) => deed.deedStatus === 'unapproved').map(appendDeedTypeProps);
  const rejected = deeds.filter((deed) => deed.deedStatus === 'rejected').map(appendDeedTypeProps);
  return { inProgress, completed, rejected, unapproved, events };
};

const updateDeed = async(deed) => {
  const { id: deedId, status: deedStatus, evidenceType, location, src }= deed;
  const endPoint = 'deeditSetDeedStatus';
  return postData(endPoint, { deedStatus, deedId, evidenceType, location, src });
}

export {
  createSelectedDeed,
  getDeedHierarchy,
  getUserDeeds,
  updateDeed,
  REFRESH
};
