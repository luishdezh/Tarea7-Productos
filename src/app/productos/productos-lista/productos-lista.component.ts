import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../Producto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productos-lista',
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.css']
})
export class ProductosListaComponent implements OnInit {

  productos: Producto[];
  carrito: Producto[];
  temp: Producto[];
  modoCarrito = false;
  cuentaCarrito:number;
  totalCarrito: number;

  private subscript: Subscription; 
  error: boolean;

  constructor(private productosService: ProductosService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.productos = this.productosService.getProductos();
    this.carrito = this.productosService.getCarrito();
    this.temp=[];
    this.cuentaCarrito = 0;
    this.totalCarrito = 0;
    this.productosService.carrito.forEach(pr => {
      this.totalCarrito+= pr.precio;
    });
    if(this.router.url =="/carrito"){
      this.modoCarrito=true;      
    }
    else{
      this.modoCarrito=false;
    }
    this.subscript = this.productosService.cambiaDato.subscribe((arregloProductos: Producto[]) => {
      this.carrito = arregloProductos;
      }
    );
  }

  anadirAlCarrito(){
    this.productosService.addToCart(); 
    this.router.navigate( ['/carrito']);
  }

  anadirTemp(producto: Producto) {
    this.productosService.anadirTemp(producto);
  }

  mostrarDetalle(productoDetalle){
    this.router.navigate([productoDetalle.id], {relativeTo: this.route});
  }

  borrarProductoLista(productoABorrar) {
    this.productosService.borrarProducto(productoABorrar.id);
  }

  actualizarCuenta(box){
    if(box)
      this.cuentaCarrito++;
    else
      this.cuentaCarrito--;
  }  
}
