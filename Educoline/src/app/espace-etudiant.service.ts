// src/app/espace-etudiant.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspaceEtudiantService {

  constructor() { }

  getNotifications(): Notification[] {
    return [
      { id: 1, message: 'Nouveau cours disponible', date: '2025-05-01' },
      { id: 2, message: 'Note ajoutée pour le module Angular', date: '2025-05-02' }
    ];
  }

  getCours(): Cours[] {
    return [
      { id: 1, titre: 'Angular Avancé', enseignant: 'Mme. Ben Ali' },
      { id: 2, titre: 'Spring Boot', enseignant: 'M. Trabelsi' }
    ];
  }

  getNotes(): Note[] {
    return [
      { id: 1, coursId: 1, valeur: 15.5 },
      { id: 2, coursId: 2, valeur: 17 }
    ];
  }

  getAbsences(): Absence[] {
    return [
      { id: 1, coursId: 1, date: '2025-04-10', justifiee: false },
      { id: 2, coursId: 2, date: '2025-04-12', justifiee: true }
    ];
  }
}

// Interfaces locales au service (plus besoin de fichier models)
interface Cours {
  id: number;
  titre: string;
  enseignant: string;
}

interface Note {
  id: number;
  coursId: number;
  valeur: number;
}

interface Absence {
  id: number;
  coursId: number;
  date: string;
  justifiee: boolean;
}

interface Notification {
  id: number;
  message: string;
  date: string;
}
