import { Component } from '@angular/core';

interface Note {
  student: string;
  tp: number;
  exam: number;
  absences: number;
}

interface CourseContent {
  title: string;
  chapters: string[];
  resources: string[];
}

interface Course {
  name: string;
  instructor: string;
  image: string;
  courseContent: CourseContent;
  notes: Note[];
}

@Component({
  selector: 'app-espace-etudiant',
  templateUrl: './espace-etudiant.component.html',
  styleUrls: ['./espace-etudiant.component.css']
})
export class EspaceEtudiantComponent {
  activeSection: {id: string, type: 'course' | 'notes'} | null = null;
  selectedCourse: Course | null = null;
  
  courses: Course[] = [
    {
      name: 'Mathématiques',
      instructor: 'Mme. Lilia',
      image: 'https://th.bing.com/th/id/OIP.Uz-MpHfJo-4_4bbt4DNHFAHaE8?cb=iwp1&rs=1&pid=ImgDetMain',
      courseContent: {
        title: '📚 Cours de Mathématiques',
        chapters: [
          'Algèbre linéaire',
          'Analyse réelle',
          'Probabilités',
          'Géométrie différentielle'
        ],
        resources: [
          'Livre "Mathématiques Avancées"',
          'TD corrigés',
          'Annales d\'examens',
          'Exercices supplémentaires'
        ]
      },
      notes: [
        { student: 'Ali', tp: 16, exam: 18, absences: 1 },
        { student: 'Sami', tp: 12, exam: 14, absences: 3 },
        { student: 'Leila', tp: 15, exam: 17, absences: 2 }
      ]
    },
    {
      name: 'Informatique',
      instructor: 'Mr. Fathi',
      image: 'https://th.bing.com/th/id/OIP.77Vh-7L2LVSncDvbx59wpAHaHa?cb=iwp1&rs=1&pid=ImgDetMain',
      courseContent: {
        title: '💻 Programmation Avancée',
        chapters: [
          'Algorithmique',
          'Structures de données',
          'Bases de données',
          'Réseaux informatiques'
        ],
        resources: [
          'Environnement de développement',
          'Projets pratiques',
          'Documentation technique',
          'Tutoriels vidéo'
        ]
      },
      notes: [
        { student: 'Ali', tp: 18, exam: 17, absences: 0 },
        { student: 'Sami', tp: 15, exam: 14, absences: 2 },
        { student: 'Leila', tp: 19, exam: 18, absences: 1 }
      ]
    },
    {
      name: 'Physique',
      instructor: 'Mme. Asma',
      image: 'https://th.bing.com/th/id/OIP.U7lzTSzbMSG5ymsOYn6i5gHaE0?cb=iwp1&rs=1&pid=ImgDetMain',
      courseContent: {
        title: '⚛️ Physique Quantique',
        chapters: [
          'Mécanique ondulatoire',
          'Physique statistique',
          'Théorie des champs',
          'Relativité'
        ],
        resources: [
          'Simulateur quantique',
          'Recueil de formules',
          'Expériences virtuelles',
          'Articles scientifiques'
        ]
      },
      notes: [
        { student: 'Ali', tp: 15, exam: 16, absences: 1 },
        { student: 'Sami', tp: 12, exam: 13, absences: 4 },
        { student: 'Leila', tp: 17, exam: 18, absences: 0 }
      ]
    },
    {
      name: 'Chimie',
      instructor: 'Mr. Karim',
      image: 'https://th.bing.com/th/id/OIP.2ikRqDXmbQsiaKqKL9AbJgHaDn?cb=iwp1&rs=1&pid=ImgDetMain',
      courseContent: {
        title: '🧪 Chimie Organique',
        chapters: [
          'Stéréochimie',
          'Réactivité des composés',
          'Synthèse organique',
          'Chimie des polymères'
        ],
        resources: [
          'Tableau périodique interactif',
          'Guide de laboratoire',
          'Banque de molécules 3D',
          'Protocoles expérimentaux'
        ]
      },
      notes: [
        { student: 'Ali', tp: 17, exam: 16, absences: 0 },
        { student: 'Sami', tp: 14, exam: 15, absences: 5 },
        { student: 'Leila', tp: 16, exam: 18, absences: 1 }
      ]
    },
    {
      name: 'Biologie',
      instructor: 'Mme. Salma',
      image: 'https://th.bing.com/th/id/OIP.c6Hy5evDkYWV0kVhzOHhsgHaE8?cb=iwp1&rs=1&pid=ImgDetMain',
      courseContent: {
        title: '🌿 Biologie Moléculaire',
        chapters: [
          'Structure de l\'ADN',
          'Expression génétique',
          'Biotechnologies',
          'Évolution moléculaire'
        ],
        resources: [
          'Atlas d\'anatomie',
          'Cas cliniques',
          'Banque de séquences ADN',
          'Logiciels d\'analyse'
        ]
      },
      notes: [
        { student: 'Ali', tp: 19, exam: 18, absences: 0 },
        { student: 'Sami', tp: 16, exam: 17, absences: 1 },
        { student: 'Leila', tp: 20, exam: 19, absences: 0 }
      ]
    }
  ];

  showContent(course: Course, type: 'course' | 'notes'): void {
    this.selectedCourse = course;
    this.activeSection = {id: this.getSectionId(course.name, type), type};
    
    setTimeout(() => {
      const element = document.getElementById(this.activeSection!.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  getSectionId(courseName: string, type: 'course' | 'notes'): string {
    const baseId = courseName.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
    return type === 'course' ? baseId : `notes-${baseId}`;
  }

  isActive(course: Course, type: 'course' | 'notes'): boolean {
    return this.activeSection?.id === this.getSectionId(course.name, type) && 
           this.selectedCourse?.name === course.name;
  }

  hasCriticalAbsences(notes: Note[]): boolean {
    return notes.some(note => note.absences > 3);
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