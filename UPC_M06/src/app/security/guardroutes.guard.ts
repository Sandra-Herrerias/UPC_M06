import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommunicatorService } from '../service/communicator.service';

@Injectable({
  providedIn: 'root'
})
export class GuardroutesGuard implements CanActivate {

  // Router redirecciona <-- inyectar en el constructor
  // HttpService es mi servicio
  constructor(private route: Router, private communicator: CommunicatorService) {

  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   // dependiendo de una condicion devolveré true o false
  //   // deja siempre pasar por defecto
  //   return true;
  // }

  canActivate(route: ActivatedRouteSnapshot) {
    const user = this.communicator.usuariData();
    console.log(route.data['role']);//gets role
    //Si la ruta es admin_comments y el rol es admin, me tiene que dejar pasar 
    //a la vista admin_comments en vez de la comments_feedback
    if (user) {
      if (route.component == "/admin_comments" && route.data['role'] != 'admin') {
        return false;
      } else {
        return true;
      }
    }
    this.route.navigate(['/home']);
    return false;
  }

}
