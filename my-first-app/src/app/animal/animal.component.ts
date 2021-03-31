import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  animalName = 'Single-celled organisms'; // 單細胞生物

  constructor() { }

  ngOnInit(): void {
  }

}
