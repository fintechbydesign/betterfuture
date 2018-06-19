import { createDeed, getUserDeeds, REFRESH } from "../data/deeds";
import { updateLocalUser } from "../data/user";

async function startDeed (user, deedType, pages) {
  const { error, myProfile } = pages;
  try {
    await createDeed(user, deedType.id);
    // update user deeds before showing profile
    await getUserDeeds(user, REFRESH);
    updateLocalUser({
      ...user,
      openDeedCount: user.openDeedCount + 1
    });
    myProfile();
  } catch (err) {
    error({err});
  }
}


export default startDeed;