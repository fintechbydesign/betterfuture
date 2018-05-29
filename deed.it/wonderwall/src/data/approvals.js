import { getData, postData } from './fetchWrapper';

// const fetchEndpoint = 'deeditWonderwallLatest?deedStatus=unapproved';
const fetchEndpoint = 'wonderwall/latest/' + Date.now();
const setEndpoint = 'set-deed-status';

const fetchUnapprovedEvidence = async(events) => {

  const reportNews = (msg) => {
    events.news({ src: msg });
  }

  const reportError = (errMsg) => {
    console.log(errMsg);
    reportNews(errMsg);
  }

  const processTile = (tile) => {
    const { type } = tile;
    if ( type === 'photo') {
      events.admin(tile);
    }
  }

  try {
    const { results } = await getData(fetchEndpoint);
    const numDeeds = results.length;
    if (numDeeds === 0) {
      reportNews('No unapproved deeds');
    } else {
      reportNews(`${numDeeds} unapproved deeds`);
      results.forEach(processTile);
    }
  } catch (err) {
    reportError(err.message, events);
  }
}

const approve = async(deedId) => {
  console.log(`Approve deed ${deedId}`);
  const endpoint = `${setEndpoint}/${deedId}/approved`
  return postData(endpoint);
}

const disapprove = async(deedId) => {
  console.log(`Disapprove of deed ${deedId}`);
  const endpoint = `${setEndpoint}/${deedId}/unapproved`
  return postData(endpoint);
}

export {
  approve,
  disapprove,
  fetchUnapprovedEvidence
};