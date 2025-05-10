import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import du Router
import { AuthService } from '../auth.service'; // Import du service d'authentification

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  signUpUsername: string = '';
  signUpPassword: string = '';
  confirmPassword: string = '';
  signUpEmail: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  // Méthode pour gérer la connexion
  onSignIn() {
    const isAuthenticated = this.authService.signIn(this.username, this.password);

    if (isAuthenticated) {
      this.router.navigate(['/accueil']); // Redirection vers la page d'accueil
    } else {
      alert('Identifiants incorrects.');
    }
  }

  // Méthode pour gérer l'inscription
  onSignUp() {
    if (this.signUpPassword === this.confirmPassword) {
      this.authService.signUp(this.signUpUsername, this.signUpPassword, this.signUpEmail);
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    } else {
      alert('Les mots de passe ne correspondent pas.');
    }
  }
}
