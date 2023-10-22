import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-sample',
  templateUrl: './check-sample.component.html',
  styleUrls: ['./check-sample.component.css']
})
export class CheckSampleComponent implements OnInit, DoCheck, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, OnDestroy {

  quantidade:number = 0;

  constructor() { }

  adicionar(): void {
    this.quantidade++;
  }

  remover(): void {
    this.quantidade--;
  }

  ngOnInit(): void {
    console.log("ngOnInit")
  }

  ngDoCheck(): void {
    console.log("ngDoChek")
  }

  // checked -> content -> view
  //quando o primeiro conteudo é iniciado
  ngAfterContentInit(): void {
    console.log("ngAfterContentInit")
  }

  //depois da inicialização da view
  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked")
  }

  //após alguma alteração, verifica o conteudo
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit")
  }

  //após alguma alteração, verifica a view
  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked")
  }

  ngOnDestroy(): void {
      console.log("goodbye my friend")
  }
}
