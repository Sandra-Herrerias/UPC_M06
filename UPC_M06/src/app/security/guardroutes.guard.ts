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
  constructor(private router: Router, private communicator: CommunicatorService) {

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

    console.log(route.component);

    // if ( route.component == "/login" && user) return false;

    if (user) {
      return true;
    }

    return false;
  }

}
