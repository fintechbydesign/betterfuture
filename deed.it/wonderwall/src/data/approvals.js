import { getData, postData } from './fetchWrapper';

const fetchEndpoint = 'deeditWonderwallLatest?deedStatus=unapproved';
const setEndpoint = 'deeditSetDeedStatus';

const fetchUnapprovedEvidence = async(events) => {

  const reportNews = (msg) => {
    events.news({ src: msg });
  }

  const reportError = (errMsg) => {
    console.log(errMsg);
    reportNews(errMsg);
  }

  try {
    const unapprovedDeeds = await getData(fetchEndpoint);
    const photoDeeds = unapprovedDeeds.filter((tile) => tile.type === 'photo');
    const numDeeds = photoDeeds.length;
    if (numDeeds === 0) {
      reportNews('No unapproved photo deeds');
    } else {
      reportNews(`${numDeeds} unapproved deeds`);
      photoDeeds.forEach(events.admin);
    }
  } catch (err) {
    reportError(err.message, events);
  }
}

const approve = async(deedId) => {
  console.log(`Approve deed ${deedId}`);
  return postData(setEndpoint, { deedId, deedStatus: 'completed' });
}

const disapprove = async(deedId) => {
  console.log(`Disapprove of deed ${deedId}`);
  return postData(setEndpoint, { deedId, deedStatus: 'rejected' });
}

export {
  approve,
  disapprove,
  fetchUnapprovedEvidence
};