import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit, OnChanges {

  @Input() nome:String = "";

  constructor() { 
    console.log(`Construtor ${this.nome}`);
  }

  ngOnInit(): void {
    console.log(`OnInit ${this.nome}`);
  }

  ngOnChanges(): void {
    console.log(`onChange ${this.nome}`)
  }  

}
