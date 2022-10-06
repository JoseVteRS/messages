export class BcryptAdapter {
  constructor(private readonly bcrypt: any) {}

  async hashAsync(password: string, salt: number) {
    return this.bcrypt.hashAsync(password, salt);
  }
}
