import { createDeed, getUserDeeds, REFRESH } from "../data/deeds";
import { updateLocalUser } from "../data/user";

async function startDeed (user, pages) {
  const { error, myProfile } = pages;
  const { deedType } = user.selected;
  if (!deedType) {
    throw new Error('No selected deedType for user');
  }
  try {
    await createDeed(user, deedType.id);
    updateLocalUser({
      ...user,
      selected: null
    });
    // update user deeds before showing profile
    await getUserDeeds(user, REFRESH);
    myProfile();
  } catch (err) {
    error({err});
  }
}


export default startDeed;