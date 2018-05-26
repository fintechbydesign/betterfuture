const get = (key) => (localStorage[key]) ? JSON.parse(localStorage[key]) : undefined;

const set = (key, obj) => localStorage[key] = JSON.stringify(obj);

const remove = (key) => delete localStorage[key];

export { get, set, remove };
