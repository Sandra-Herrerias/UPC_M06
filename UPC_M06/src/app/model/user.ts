export class User {
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }
    constructor(private _username: string, private _email: string, private _password: string) {
        // this._username = _username;
        // this._email = _email;
        // this._password = _password;
    }

}
