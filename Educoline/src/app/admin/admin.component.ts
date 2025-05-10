import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  title = 'VENUS DASHBOARD';

  // Données utilisateur
  user = {
    username: '',
    email: '',
    role: '',
    password: ''
  };

  // Statistiques
  stats = {
    students: 1245,
    teachers: 84,
    lockedAccounts: 23,
    lateStudents: 17,
    studentsChange: 12,
    teachersChange: 5,
    activeStudents: 1222
  };

  // Listes des étudiants et enseignants
  students = [
    { 
      id: 1001, 
      name: 'Jean Dupont', 
      email: 'jean.dupont@email.com', 
      class: 'Terminale A', 
      status: 'active', 
      absences: 2,
      birthDate: '15/03/2005',
      address: '12 Rue des Écoles, Paris',
      phone: '06 12 34 56 78',
      lastAccess: '2023-05-15 14:30'
    },
    { 
      id: 1002, 
      name: 'Marie Martin', 
      email: 'marie.martin@email.com', 
      class: 'Première B', 
      status: 'locked', 
      absences: 5,
      birthDate: '22/07/2006',
      address: '45 Avenue des Roses, Lyon',
      phone: '06 98 76 54 32',
      lastAccess: '2023-04-28 09:15'
    },
    { 
      id: 1003, 
      name: 'Pierre Durand', 
      email: 'pierre.durand@email.com', 
      class: 'Terminale C', 
      status: 'active', 
      absences: 1,
      birthDate: '03/11/2005',
      address: '8 Boulevard des Chênes, Marseille',
      phone: '07 65 43 21 09',
      lastAccess: '2023-05-16 10:45'
    }
  ];

  teachers = [
    { 
      id: 2001, 
      name: 'Monsieur Leclerc', 
      course: 'Mathématiques', 
      schedule: 'Lundi 10h-12h', 
      email: 'leclerc@email.com', 
      role: 'Teacher',
      hireDate: '01/09/2015',
      phone: '06 11 22 33 44',
      classes: ['Terminale A', 'Terminale B']
    },
    { 
      id: 2002, 
      name: 'Madame Dupuis', 
      course: 'Français', 
      schedule: 'Mardi 14h-16h', 
      email: 'dupuis@email.com', 
      role: 'Teacher',
      hireDate: '01/09/2018',
      phone: '06 55 66 77 88',
      classes: ['Première A', 'Première B']
    }
  ];

  // Données pour les graphiques
  activityChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    data: [650, 590, 800, 810, 560, 550, 400]
  };

  classDistributionData = {
    labels: ['Terminale A', 'Terminale B', 'Première A', 'Première B', 'Seconde'],
    data: [25, 20, 20, 15, 20],
    colors: ['#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6']
  };

  // États du composant
  selectedMenu = 'students';
  selectedStudents: number[] = [];
  selectedTeachers: number[] = [];
  newUserType: string = '';
  showDetailsPanel = false;
  currentDetails: any = null;
  detailsType: 'student' | 'teacher' | null = null;

  // Données pour nouveau utilisateur
  newUserData = {
    name: '',
    email: '',
    class: '',
    course: '',
    schedule: ''
  };

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.initActivityChart();
    this.initClassDistributionChart();
  }

  // Initialisation des graphiques
  private initActivityChart(): void {
    const ctx = document.getElementById('activityChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.activityChartData.labels,
        datasets: [{
          label: 'Connexions',
          data: this.activityChartData.data,
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  private initClassDistributionChart(): void {
    const ctx = document.getElementById('classChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.classDistributionData.labels,
        datasets: [{
          data: this.classDistributionData.data,
          backgroundColor: this.classDistributionData.colors
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right' }
        }
      }
    });
  }

  // Gestion du menu
  selectMenu(menu: string): void {
    this.selectedMenu = menu;
  }

  // Gestion des sélections
  toggleStudentSelection(studentId: number): void {
    const index = this.selectedStudents.indexOf(studentId);
    if (index === -1) {
      this.selectedStudents.push(studentId);
    } else {
      this.selectedStudents.splice(index, 1);
    }
  }

  toggleTeacherSelection(teacherId: number): void {
    const index = this.selectedTeachers.indexOf(teacherId);
    if (index === -1) {
      this.selectedTeachers.push(teacherId);
    } else {
      this.selectedTeachers.splice(index, 1);
    }
  }

  // Méthodes ajoutées pour corriger les erreurs
  toggleSelectAllStudents(event: any): void {
    const checked = event.target.checked;
    if (checked) {
      this.selectedStudents = this.students.map(student => student.id);
    } else {
      this.selectedStudents = [];
    }
  }

  toggleSelectAllTeachers(event: any): void {
    const checked = event.target.checked;
    if (checked) {
      this.selectedTeachers = this.teachers.map(teacher => teacher.id);
    } else {
      this.selectedTeachers = [];
    }
  }

  isTeacherSelected(teacherId: number): boolean {
    return this.selectedTeachers.includes(teacherId);
  }

  // Gestion des utilisateurs
  addUser(): void {
    if (this.newUserType === 'student') {
      this.students.push({
        id: Date.now(),
        name: this.newUserData.name,
        email: this.newUserData.email,
        class: this.newUserData.class,
        status: 'active',
        absences: 0,
        birthDate: '',
        address: '',
        phone: '',
        lastAccess: new Date().toISOString()
      });
    } else if (this.newUserType === 'teacher') {
      this.teachers.push({
        id: Date.now(),
        name: this.newUserData.name,
        course: this.newUserData.course,
        schedule: this.newUserData.schedule,
        email: this.newUserData.email,
        role: 'Teacher',
        hireDate: new Date().toLocaleDateString(),
        phone: '',
        classes: []
      });
    }
    this.resetNewUserData();
  }

  resetNewUserData(): void {
    this.newUserData = { name: '', email: '', class: '', course: '', schedule: '' };
    this.newUserType = '';
  }

  // Actions sur les étudiants
  lockSelectedStudents(): void {
    this.students.forEach(student => {
      if (this.selectedStudents.includes(student.id)) {
        student.status = 'locked';
      }
    });
    this.selectedStudents = [];
  }

  unlockSelectedStudents(): void {
    this.students.forEach(student => {
      if (this.selectedStudents.includes(student.id)) {
        student.status = 'active';
      }
    });
    this.selectedStudents = [];
  }

  deleteSelectedStudents(): void {
    this.students = this.students.filter(student => !this.selectedStudents.includes(student.id));
    this.selectedStudents = [];
  }

  // Actions sur les enseignants
  deleteSelectedTeachers(): void {
    this.teachers = this.teachers.filter(teacher => !this.selectedTeachers.includes(teacher.id));
    this.selectedTeachers = [];
  }

  // Utilitaires
  isStudentSelected(studentId: number): boolean {
    return this.selectedStudents.includes(studentId);
  }

  // Gestion des mots de passe
  resetStudentPasswords(): void {
    this.students.forEach(student => {
      if (this.selectedStudents.includes(student.id)) {
        console.log(`Mot de passe réinitialisé pour ${student.name}`);
        student.status = 'reset';
      }
    });
    this.selectedStudents = [];
  }

  resetTeacherPasswords(): void {
    this.teachers.forEach(teacher => {
      if (this.selectedTeachers.includes(teacher.id)) {
        console.log(`Mot de passe réinitialisé pour ${teacher.name}`);
        (teacher as any).status = 'reset';
      }
    });
    this.selectedTeachers = [];
  }

  // Gestion des absences
  assignZeroToEliminated(): void {
    this.students.forEach(student => {
      if (student.absences > 3) {
        console.log(`Note 0 attribuée à ${student.name} pour absences.`);
        (student as any).note = 0;
      }
    });
  }

  getEliminatedStudents(): any[] {
    return this.students.filter(student => student.absences > 3);
  }

  // Affichage des détails
  viewStudentDetails(student: any): void {
    this.currentDetails = {
      ...student,
      type: 'student',
      details: {
        'Date de naissance': student.birthDate,
        'Adresse': student.address,
        'Téléphone': student.phone,
        'Dernier accès': student.lastAccess,
        'Absences': student.absences
      }
    };
    this.detailsType = 'student';
    this.showDetailsPanel = true;
  }

  viewTeacherDetails(teacher: any): void {
    this.currentDetails = {
      ...teacher,
      type: 'teacher',
      details: {
        'Matière': teacher.course,
        'Emploi du temps': teacher.schedule,
        'Date d\'embauche': teacher.hireDate,
        'Téléphone': teacher.phone,
        'Classes enseignées': teacher.classes.join(', ')
      }
    };
    this.detailsType = 'teacher';
    this.showDetailsPanel = true;
  }

  closeDetailsPanel(): void {
    this.showDetailsPanel = false;
    this.currentDetails = null;
    this.detailsType = null;
  }

  // Autres méthodes
  viewNotes(student: any): void {
    console.log(`Voir les notes de ${student.name}`);
    // Implémentez cette fonction selon vos besoins
  }

  viewSchedule(teacher: any): void {
    console.log(`Emploi du temps de ${teacher.name}: ${teacher.schedule}`);
    // Implémentez cette fonction selon vos besoins
  }

  resetPassword(user: any): void {
    if (this.detailsType === 'student') {
      console.log(`Réinitialisation du mot de passe pour l'étudiant ${user.name}`);
    } else {
      console.log(`Réinitialisation du mot de passe pour l'enseignant ${user.name}`);
    }
  }

  onSubmit(): void {
    console.log('Form submitted:', this.user);
  }
  logout(): void {
    // Ici vous pouvez implémenter la logique de déconnexion
    console.log('Déconnexion en cours...');
    
    // Exemple de logique de déconnexion :
    // 1. Effacer les données de session
    // 2. Rediriger vers la page de login
    // this.router.navigate(['/login']);
    
    // Pour l'instant, nous allons simplement afficher un message
    alert('Vous avez été déconnecté avec succès');
  }
}