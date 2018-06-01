import uuidv4 from 'uuid/v4';
import { postData } from './fetchWrapper';

const createEvent = async(event) => {
  const { deedId, eventType, nickname, src, username } = event;
  const id = uuidv4();
  await postData('deeditCreateEvent', { deedId, eventType, id, nickname, src, username });
};

export {
  createEvent
};
