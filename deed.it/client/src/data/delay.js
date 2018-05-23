const ZERO_DELAY = Promise.resolve();

export default (timeout) => (timeout === 0) ? ZERO_DELAY : new Promise((resolve) => setTimeout(resolve, timeout));
