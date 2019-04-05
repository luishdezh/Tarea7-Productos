import { Injectable } from '@angular/core';
import { Producto } from './Producto';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cambiaDato= new Subject<Producto[]>();
  private lastId = 0;

  productos: Producto[] =[
    new Producto(this.lastId++,'Zbook','hp','laptop',15000,8),
    new Producto(this.lastId++,'MacBook Pro','Apple','laptop',60000,11),
    new Producto(this.lastId++,'Predator','Acer','laptop',70600,5),
    new Producto(this.lastId++,'Omen','hp','laptop',40000,4),
    new Producto(this.lastId++,'Inspiron','Dell','laptop',12000,10),
    new Producto(this.lastId++,'Alienware','Dell','laptop',65000,3),
    new Producto(this.lastId++,'Zenbook','Asus','laptop',45000,7),
    new Producto(this.lastId++,'MacBook Air','Apple','laptop',33000,9)
  ];

  carrito: Producto[] =[
  ];

  temp: Producto[] =[
  ];

  constructor() { }

  
  addToCart() {
    this.temp.forEach(pr => {
      if (!this.carrito.includes(pr)) {
        this.carrito.push(pr);
      }
    });
    this.temp.length = 0;
  }

  anadirTemp(producto: Producto) {
    const pos = this.temp.findIndex(pr => pr.id === producto.id);
    if (pos === -1) {
      this.temp.push(producto);
    } else {
      this.temp.splice(pos, 1);
    }
  }

  getNextId(): number {
    return this.lastId;
  }

  getProductos(): Producto[]{
    return this.productos.slice();
  }

  getProducto(id: number): Producto {
    const pos = this.productos.findIndex(pr => pr.id === id);
    return Object.assign({}, this.productos[pos]);
  }

  getCarrito(): Producto[]{
    return this.carrito.slice();
  }

  notificarCambios() {
    this.cambiaDato.next(this.carrito.slice());
  }

  borrarProducto(id: number): boolean {
    const prPos = this.carrito.findIndex(pr => pr.id === id);

    if(prPos >= 0){
      console.log('Producto borrado');
      this.carrito.splice(prPos,1);
      this.notificarCambios();
      return true;
    }
    return false;
  }
}