import superDeedStyles from '../components/superDeedStyles';
import { getData, postData, REFRESH } from './fetchWrapper';

let mappedDeedTypes;

const populateDeedTypesMap = (deedHierarchy) => {
  // add styles to each superdeed and to their child deed types
  for (let index = 0 ; index < deedHierarchy.length; index++) {
    deedHierarchy[index].style = superDeedStyles[index];
    deedHierarchy[index].deedTypes.forEach((deedType) => deedType.style = superDeedStyles[index]);
  }
  // create map: key=deedType.id value=deedType
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

const createDeed = async(user, deedTypeId) => {
  const body = {
    deedTypeId,
    username: user.username
  };
  return postData('deeditCreateUserDeed', body);
};

/*
const createSelectedDeed = async(user) => {
  if (!user.selected.deedType) {
    throw new Error('No selected deed type');
  }
  await createDeed(user, user.selected.deedType.id)
};
*/

const getUserDeeds = async(user, force = false) => {
  if (!mappedDeedTypes) {
    await getDeedHierarchy();
  }

  const endpoint = `deeditUserProfile?username=${user.username}`;
  const profile = await getData(endpoint, force);
  const deeds = profile.deeds || [];
  const events = profile.events || [];
  const created = deeds.filter((deed) => deed.deedStatus === 'created');
  const inProgress = (created.length === 0)
    ? null
    : created.map(appendDeedTypeProps);
  const completed = deeds.filter((deed) => deed.deedStatus === 'completed').map(appendDeedTypeProps);
  const unapproved = deeds.filter((deed) => deed.deedStatus === 'unapproved').map(appendDeedTypeProps);
  const rejected = deeds.filter((deed) => deed.deedStatus === 'rejected').map(appendDeedTypeProps);
  return { inProgress, completed, rejected, unapproved, events };
};

const updateDeed = async(deed) => {
  const { id: deedId, status: deedStatus, evidenceType, latitude, longitude, src } = deed;
  const endPoint = 'deeditSetDeedStatus';
  return postData(endPoint, { deedId, deedStatus, evidenceType, latitude, longitude, src });
}

export {
  createDeed,
  getDeedHierarchy,
  getUserDeeds,
  updateDeed,
  REFRESH
};
