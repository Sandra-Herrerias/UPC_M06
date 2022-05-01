export class Player {
    //Properties
    private _id!: number;
    private _nickname!: String;
    private _email!: String;
    private _password!: String;
    private _role!: String;
    private _created_at!: Date;
    private _updated_at!: Date;

    /**
     * 
     * @param {number} id
     * @param {String} nickname
     * @param {String} email
     * @param {String} password
     * @param {String} role
     * @param {Date} created_at
     * @param {Date} updated_at
     */


    constructor(id?: number, nickname?: String, email?: String, password?: String, role?: String, created_at?: Date, updated_at?: Date) {

        if (id != undefined) {
            this._id = id;
        }
        if (nickname != undefined) {
            this._nickname = nickname;
        }
        if (email != undefined) {
            this._email = email;
        }
        if (password != undefined) {
            this._password = password;
        }
        if (role != undefined) {
            this._role = role;
        }
        if (created_at != undefined) {
            this._created_at = created_at;
        }
        if (updated_at != undefined) {
            this._updated_at = updated_at;
        }
    }

    /**
     * Getter id
     * @return {number}
     */
    public get id(): number {
        return this._id;
    }

    /**
     * Setter id
     * @param {number} value
     */
    public set id(value: number) {
        this._id = value;
    }

    /**
     * Getter nickname
     * @return {String}
     */
    public get nickname(): String {
        return this._nickname;
    }

    /**
     * Setter nickname
     * @param {String} value
     */
    public set nickname(value: String) {
        this._nickname = value;
    }

        /**
     * Getter email
     * @return {String}
     */
         public get email(): String {
            return this._email;
        }
    
        /**
         * Setter email
         * @param {String} value
         */
        public set email(value: String) {
            this._email = value;
        }
            /**
     * Getter password
     * @return {String}
     */
    public get password(): String {
        return this._password;
    }

    /**
     * Setter password
     * @param {String} value
     */
    public set password(value: String) {
        this._password = value;
    }
        /**
     * Getter role
     * @return {String}
     */
         public get role(): String {
            return this._role;
        }
    
        /**
         * Setter role
         * @param {String} value
         */
        public set role(value: String) {
            this._role = value;
        }


    /**
     * Getter created_at
     * @return {Date}
     */
    public get created_at(): Date {
        return this._created_at;
    }

    /**
     * Setter created_at
     * @param {Date} value
     */
    public set created_at(value: Date) {
        this._created_at = value;
    }

    /**
    * Getter updated_at
    * @return {Date}
    */
    public get updated_at(): Date {
        return this._updated_at;
    }

    /**
     * Setter updated_at
     * @param {Date} value
     */
    public set updated_at(value: Date) {
        this._updated_at = value;
    }
}
