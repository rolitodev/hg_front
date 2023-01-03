import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  public isDark: boolean = false;
  public actualYear: number = 0;

  constructor(private themeService: NbThemeService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.setYear();
    const theme = this.cookieService.get('theme'); // Obtenemos el valor del tema si es que se ha guardado.
    this.themeService.changeTheme(theme); // Cambiamos el estilo del tema dependiendo del valor que esté guardado en las cookies.
    if (theme === 'dark') { // Si el tema es igual a dark entonces volvemos la variable global isDark a true.
      this.isDark = true;
    } else {
      this.cookieService.set('theme', 'default');
      this.themeService.changeTheme('default');
    }
  }

  setYear(): void {
    const year = new Date().getFullYear();
    this.actualYear = year;
  }

  changeTheme(): void {
    this.isDark = !this.isDark; // Cambiamos el estado de la variable a su negación cuando de clic en el botón.
    this.cookieService.set('theme', this.isDark ? 'dark' : 'default'); // Seteamos la cookie del tema dependiendo la variable isDark.
    this.themeService.changeTheme(this.isDark ? 'dark' : 'default'); // Cambiamos el tema en el servicio de nebular.
  }

}