/*
 Contract for any 'progress' object passed to FetchingProgress
 */
class FetchingProgress {

  setProgress(percentage, text) {
    // null op
  }
}

/*
 Default implementation based on an assumed max duration
 */
class DefaultProgress extends FetchingProgress {

  constructor() {
    super();
    this.increment = this.increment.bind(this);
    this.percentage = 0;
    setTimeout(this.increment, 150);
  }

  increment() {
    const { percentage } = this;
    if (percentage < 100) {
      let increment;
      if (percentage < 50) {
        increment = 10;
      } else if (percentage < 80) {
        increment = 5;
      } else {
        increment = 1;
      }
      const newPercentage = percentage + increment;
      this.percentage = newPercentage;
      this.setProgress(newPercentage);
      setTimeout(this.increment, 150);
    }
  }
}

export default FetchingProgress;
export {
  DefaultProgress
};