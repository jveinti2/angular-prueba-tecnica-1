import { Component } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Personaje } from 'src/app/interface/Personaje';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  personajes: Personaje[] | undefined;
  personajesCopy: Personaje[] | undefined;

  constructor(public http: HttpClient) {
    this.getData();
  }

  async getData() {
    await this.http
      .get<any>(`${environment.apiUrl}character`)
      .subscribe((res) => {
        this.personajes = res.results.map(
          ({ id, name, status, image, species }: Personaje) => {
            return {
              id: id,
              name: name,
              image: image,
              status: status,
              species: species,
            };
          }
        );
        this.personajesCopy = this.personajes;
      });
  }

  filter($event: any) {
    const search = $event.target.value;
    this.personajes = this.personajesCopy?.filter(({ name }: Personaje) => {
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
