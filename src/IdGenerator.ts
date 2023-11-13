export class IdGenerator {
  static id = 0;
  static generateId() {
    ++IdGenerator.id;
    return IdGenerator.id;
  }
}
