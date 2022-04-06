export default class BaseSeeder {
  data = [];
  amount = 10;

  constructor(amount) {
    if (!amount) {
      throw "An amount is required for the seeders constructor";
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

  randomList(amount) {
    let list = [];
    if (amount >= this.data.length) {
      amount = this.data.length - 1;
    }
    while (list.length < amount) {
      const randomRow = this.random();
      if (list.includes(randomRow) === false) {
        list.push(randomRow);
      }
    }

    return list;
  }

  randomNumberPlox(maxLimit = this.amount) {
    const rand = Math.random() * maxLimit;
    return Math.floor(rand);
  }
}
