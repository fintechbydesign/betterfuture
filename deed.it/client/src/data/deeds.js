import { getData, postData } from './fetchWrapper';

const getDeedHierarchy = async() => {
  return getData('deed-hierarchy');
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
      current = current[0];
      break;
    default:
      throw new Error(`More than one current deed: ${current}`);
  };
  const approved  = deeds.filter((deed) => deed.status === 'approved');
  const unapproved  = deeds.filter((deed) => deed.status === 'unapproved');
  return { current, approved, unapproved, events };
}

export {
  createDeed,
  getDeedHierarchy,
  getUserDeeds
}