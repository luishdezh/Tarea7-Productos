import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../Producto';
import { ProductosListaComponent } from '../productos-lista.component';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.css']
})
export class ProductoItemComponent implements OnInit {

  @Input() producto: Producto;
  @Output() productoPorBorrar = new EventEmitter;
  @Output() mostrarDetalles = new EventEmitter;
  @Output() anadirCarro = new EventEmitter; 
  modoCarrito=false;
  constructor(private productosLista: ProductosListaComponent) { }

  ngOnInit() {
    this.modoCarrito = this.productosLista.modoCarrito;
  }

  borrarDelCarrito() {
    this.productoPorBorrar.emit(this.producto);
  }

  mostrarDetalle(){
    this.mostrarDetalles.emit(this.producto);
  }

  anadirTemp() {
    this.anadirCarro.emit(this.producto);
  }

  add(e){
    this.productosLista.actualizarCuenta(e.target.checked);
    this.anadirTemp();
  }

  
}