export class User {
    constructor(
        public id: number,
        public nombre: string,
        public email: string,
        public password_hash: string,
        public rol: 'admin' | 'usuario'
    ) {}
}
