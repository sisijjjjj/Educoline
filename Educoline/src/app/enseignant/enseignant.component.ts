import { Component, OnInit } from '@angular/core';

interface Student {
  name: string;
  tp: number;
  exam: number;
  absences: number;
}

interface Course {
  name: string;
  students: Student[];
}

interface Teacher {
  id: number;
  name: string;
  email: string;
  subject: string;
  absences: number;
  cours: Course;
}

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css']
})
export class EnseignantComponent implements OnInit {
  enseignants: Teacher[] = [
    {
      id: 1, 
      name: 'Enseignant 1', 
      email: 'enseignant1@mail.com',
      subject: 'Mathematics',
      absences: 3, 
      cours: { 
        name: 'Mathematics', 
        students: [
          { name: 'Student A', tp: 12, exam: 15, absences: 2 },
          { name: 'Student B', tp: 10, exam: 14, absences: 4 },
          { name: 'Student C', tp: 14, exam: 16, absences: 1 }
        ]
      }
    },
    {
      id: 2, 
      name: 'Enseignant 2', 
      email: 'enseignant2@mail.com',
      subject: 'Physics',
      absences: 1,
      cours: {
        name: 'Physics', 
        students: [
          { name: 'Student D', tp: 11, exam: 13, absences: 1 },
          { name: 'Student E', tp: 15, exam: 18, absences: 0 }
        ]
      }
    }
  ];

  isDetailView = false;
  selectedEnseignant: Teacher | null = null;
  showAbsenceSection = false;
  showNotesSection = false;

  constructor() { }

  ngOnInit(): void { }

  afficherDetail(enseignant: Teacher): void {
    this.selectedEnseignant = enseignant;
    this.isDetailView = true;
    this.showAbsenceSection = false;
    this.showNotesSection = false;
  }

  retourListe(): void {
    this.isDetailView = false;
    this.selectedEnseignant = null;
  }

  showNotes(): void {
    this.showNotesSection = true;
    this.showAbsenceSection = false;
  }

  showAbsences(): void {
    this.showAbsenceSection = true;
    this.showNotesSection = false;
  }

  addTp(course: Course, student: Student, newTp: number): void {
    if (newTp >= 0 && newTp <= 20) {
      student.tp = newTp;
    }
  }

  addExam(course: Course, student: Student, newExam: number): void {
    if (newExam >= 0 && newExam <= 20) {
      student.exam = newExam;
    }
  }

  markPresent(student: Student): void {
    student.absences = Math.max(0, student.absences - 1);
    this.checkAbsences(student);
  }

  markAbsent(student: Student): void {
    student.absences += 1;
    this.checkAbsences(student);
  }

  private checkAbsences(student: Student): void {
    if (student.absences > 3) {
      student.tp = 0;
      student.exam = 0;
      // You might want to add a notification here for makeup session
    }
  }

  removeStudent(course: Course, student: Student): void {
    const index = course.students.indexOf(student);
    if (index > -1) {
      course.students.splice(index, 1);
    }
  }

  calculateAverage(tp: number, exam: number): number {
    return (tp + exam) / 2;
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