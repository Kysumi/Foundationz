export default class BaseSeeder {
  data = [];
  amount = 10;

  constructor(amount) {
    if (!amount) {
      throw "Set an amount you POS";
    }
    this.amount = amount;
  }

  generate() {
    this.data = Array.from(Array(this.amount)).map(() => {
      return {
        ...this.fields(),
        created_at: new Date(),
        updated_at: new Date(),
      };
    });
    return this;
  }

  fields() {
    return {};
  }

  get() {
    return this.data;
  }

  random() {
    return this.data[this.randomNumberPlox(this.data.length)];
  }

  randomNumberPlox(maxLimit = this.amount) {
    console.log(maxLimit, this.amount);

    const rand = Math.random() * maxLimit;
    return Math.floor(rand);
  }
}
