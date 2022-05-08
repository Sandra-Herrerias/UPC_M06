import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../model/player';
import { map } from 'rxjs/operators';
import { Comment } from '../model/comment';
import { Router } from '@angular/router';


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

  constructor(private http: HttpClient, private route: Router) {
    // this.getData();
    this.userSubject = new BehaviorSubject<Player>(JSON.parse(localStorage.getItem('player')!));//estat inicial del BehaviorSubject
    this.user = this.userSubject.asObservable();////part public del Behabiour Subject que s'hi actualitza
    // console.log(this.user.value);
  }

  login(player: Player) {
    // return this.http.post<Player>("http://127.0.0.1:8000/api/login", player, { responseType: "json" }).pipe(
    //   map(res => {
    //     if (res) {
    //       console.log(res);
    //       const player: Player = Object.assign(new Player(), res);
    //       localStorage.setItem('player', JSON.stringify(player));
    //       this.userSubject.next(player);
    //     }
    //     return res;
    //   })
    // );
    // http://127.0.0.1:8000/api/comments petición a laravel api local
    return this.http.post("https://apps.proven.cat/~DAWUPC2201/upc-m07/public/api/login", player,
      {
        responseType: "json",
        // params: { "email": player.email, "password": player.password }
      }).pipe(
        map((res: any) => {
          if (res.success) {
            console.log(res);
            const player: Player = new Player(res.user.id, res.user.nickname, res.user.avatar, res.user.email, "", res.user.role);
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
    // return this.http.get("http://localhost:3000/getComments",
    //   {
    //     responseType: "json"
    //   });
    // http://127.0.0.1:8000/api/comments petición a laravel api local

    return this.http.get("https://apps.proven.cat/~DAWUPC2201/upc-m07/public/api/comments",
      {
        responseType: "json"
      });
  }

  getCommentsForAdmin() {
    // return this.http.get("http://localhost:3000/getComments",
    //   {
    //     responseType: "json"
    //   });
    // http://127.0.0.1:8000/api/admin_comments petición a laravel api local

    return this.http.get("https://apps.proven.cat/~DAWUPC2201/upc-m07/public/api/admin_comments",
      {
        responseType: "json"
      });
  }

  // Player tiene todos los campos de la tabla user
  addUser(user: Player) {
    // return this.http.post("http://localhost:3000/addUser",
    //   {
    //     responseType: "json", user,
    //     params: { responseType: "json" }
    //   });
    // http://127.0.0.1:8000/api/register petición a laravel api local
    return this.http.post("https://apps.proven.cat/~DAWUPC2201/upc-m07/public/api/register", user,
      {
        responseType: "json"
        // params: { "name": user.nickname,"nickname": user.nickname, "password": user.password, "email": user.email }
      });
  }

  logout(): void {
    localStorage.removeItem("player");
    this.userSubject.next(JSON.parse(null!));
    // this.route.navigate(['/home']);
    // let currentUrl = this.route.url;
    // this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.route.navigate([currentUrl]);
    //     // console.log(currentUrl);
    // });
    this.route.navigate(['/home'])
      .then(() => {
        window.location.reload();
      });

  }





  getRanking() {
    // return this.http.get("http://localhost:3000/getRanking",
    //   {
    //     responseType: "json"
    //   });
    // http://127.0.0.1:8000/api/show petición a laravel api local
    return this.http.get("https://apps.proven.cat/~DAWUPC2201/upc-m07/public/api/show",
      {
        responseType: "json"
      });
  }


  addComment(info: any) {
    // return this.http.post("http://localhost:3000/addComment",
    //   info,
    //   { responseType: "json" });
    // http://127.0.0.1:8000/api/store petición a laravel api local
    return this.http.post("https://apps.proven.cat/~DAWUPC2201/upc-m07/public/api/store",
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
  delete(info: any) {
    // return this.http.delete("http://localhost:3000/delete-comment",
    //   {
    //     responseType: "json",
    //     body: info
    //   });
    // http://localhost:8000/destroy  petición a laravel api local
    return this.http.delete("https://apps.proven.cat/~DAWUPC2201/upc-m07/public/api/destroy",
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
    // console.log(this.comment);
    // console.log(this.currentComment);
    // return this.http.put("http://localhost:3000/update-comment",
    //   info,
    //   { responseType: "json" });
    // http://127.0.0.1:8000/update petición a laravel api local
      return this.http.post("https://apps.proven.cat/~DAWUPC2201/upc-m07/public/api/update",
      info,
      { responseType: "json" });
  }

}