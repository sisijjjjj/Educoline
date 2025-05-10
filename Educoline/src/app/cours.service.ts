import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor() { }

  // Simuler la récupération des cours
  getCours(): Observable<any[]> {
    const cours = [
      { id: 1, name: 'Mathématiques', teacher: 'M. Dupont' },
      { id: 2, name: 'Physique', teacher: 'M. Martin' },
      { id: 3, name: 'Informatique', teacher: 'M. Lemoine' }
    ];
    return of(cours);  // Retourner les cours simulés sous forme d'Observable
  }
}

