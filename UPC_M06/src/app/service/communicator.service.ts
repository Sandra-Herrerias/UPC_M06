import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../model/player';
import {  map } from 'rxjs/operators';
import { Comment } from '../model/comment';


@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  private comment = new BehaviorSubject<Comment>(new Comment(-1));
 
  currentComment = this.comment.asObservable();

  private userSubject: BehaviorSubject<Player>;
  public user: Observable<Player>;//part public del Behabiour Subject
  // Cuando te logueas va al servidor, est consulta l bbdd y le retorna datos.
  // Interceptor tiene que darse cuenta si ha dado exito y si sí, debe notificar el sí
  // el guard por ejemplo lo necesita

  // crearemos un objeto observable de tipo user, para que nuestro servicio este más acitvo entra 
  // la comunicaion entre component servidor usaremos un middleware

  // con el metodo map, accederemos a lo que está siendo enviado, será la condicion a aplicar
  // le dira al guard que este user esta logueado

  // componente loguin solo comprueba que el result es diferente de null


  // El servicio inicia el proceso y por otra parte envia una respuesta al componente
  // memorizamos el usuario en un localstorage. pipe(map()). map hará un accion extra

  //Al recoger el usuario, crearemos un localstorage para la sesion dle usuario, asi al recargar se me
  // mantiene la sesion
  // private usuariSubject: BehaviorSubject<User>;
  // public usuario: Observable<User>;

  // JWT, el angular conecta con laravel. Tendrán un middleware en medio
  // m08, creara un dist, hay 4 o 5 archivos que se guardaran en nuestro proyecto laravel
  // .htaccess manipulará las rutas

  constructor(private http: HttpClient) {
    // this.getData();
    this.userSubject = new BehaviorSubject<Player>(JSON.parse(localStorage.getItem('player')!));//estat inicial del BehaviorSubject
    this.user = this.userSubject.asObservable();////part public del Behabiour Subject que s'hi actualitza
    // console.log(this.user.value);
  }

  login(player: Player): Observable<Player> {
    return this.http.post<Player>("http://localhost:3000/login", player, { responseType: "json" }).pipe(
      map(res => {
        // console.log(res);
        if (res) {
          const player: Player = Object.assign(new Player(), res);
          localStorage.setItem('player', JSON.stringify(player));
          this.userSubject.next(player);
        }
        return res;
      })
    );
  }

  public usuariData(): Player | any {
    // return this.usuariSubject;
    return this.userSubject.value;
  }

  

  getComments() {
    return this.http.get("http://localhost:3000/getComments",
      {
        responseType: "json"
      });
  }

  addUser(user: User) {
    return this.http.post("http://localhost:3000/addUser",
      {
        responseType: "json",
        params: { username: user.username, email: user.email, password: user.password }
      });
  }

  logout(): void {
    localStorage.removeItem("player");
    this.userSubject.next(JSON.parse(null!));
    window.location.reload();
  }





  getRanking() {
    return this.http.get("http://localhost:3000/getRanking",
      {
        responseType: "json"
      });
  }

  addComment(info: any) {
    return this.http.post("http://localhost:3000/addComment",
      info,
      { responseType: "json" });

  }


  findByNickname(info: any) {
    return this.http.post("http://localhost:3000/findByNickname",
      info, {
      responseType: "json"
    });

  }

   /**
   * Service POST
   * @param info 
   * @returns 
   */
    delete(info: Object) {
      console.log(info);
      return this.http.delete("http://localhost:3000/delete-comment",
        {
          responseType: "json",
          body: info
        });
    }


  /**
 * This method modifies the selected shirt with the new info.
 * @param info
 */
   modifyComment(info: Object) {
    console.log(this.comment);
    console.log(this.currentComment);
    return this.http.put("http://localhost:3000/update-comment",
    info,
    {responseType: "json"});
  }

}