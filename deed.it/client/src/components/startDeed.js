import { createDeed, getUserDeeds, REFRESH } from "../data/deeds";

async function startDeed (user, deedType, pages) {
  const { error, myProfile } = pages;
  try {
    await createDeed(user, deedType.id);
    // update user deeds before showing profile
    await getUserDeeds(user, REFRESH);
    myProfile();
  } catch (err) {
    error({err});
  }
}


export default startDeed;