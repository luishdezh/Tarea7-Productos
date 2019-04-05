import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductosService } from '../productos.service';
import { Producto } from '../Producto';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {

  id: number;
  producto: Producto;
  error = false;

  constructor(private route: ActivatedRoute,
    private productoService: ProductosService,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params) => {
        this.id = Number(params.id);
        this.error = false;
        this.producto = this.productoService.getProducto(this.id);
      }
    );
  }

  cancelar(){
    this.location.back();
  }
}
