export class Comment {
     //Properties
     private _id!: number;
     private _comment!: String;
     private _id_player!: number;
     private _created_at!: Date;
     private _updated_at!: Date;

     /**
      * 
      * @param {number} id
      * @param {String} comment
      * @param {number} id_player
      * @param {Date} created_at
      * @param {Date} updated_at
      */
 
 
     constructor(id?: number, comment?: String, id_player?: number, created_at?: Date, updated_at?: Date) {
 
         if (id != undefined) {
             this._id = id;
         }
         if (comment != undefined) {
             this._comment = comment;
         }
         if (id_player != undefined) {
             this._id_player = id_player;
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
      * Getter comment
      * @return {String}
      */
     public get comment(): String {
         return this._comment;
     }
 
     /**
      * Setter comment
      * @param {String} value
      */
     public set comment(value: String) {
         this._comment = value;
     }
 
     /**
      * Getter id_player
      * @return {number}
      */
     public get id_player(): number {
         return this._id_player;
     }
 
     /**
      * Setter id_player
      * @param {number} value
      */
     public set id_player(value: number) {
         this._id_player = value;
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
