import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {


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

  }

  public usuariData(): User | any {
    // return this.usuariSubject;
    return null;
  }

  getData() {
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
    localStorage.removeItem("usuari");

    // this usuariSubject (json.parse(null!))
    // this.usuariSubject.next(json.parse(null!))
  }

}