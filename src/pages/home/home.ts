import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES }   from '../../assets/data.animales';
import { Animal } from '../../interfaces/animal.interface';
import {Refresher,reorderArray } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animales:Animal[]=[];
  itemActual:Animal=null;
  audio:any=null;
  ordenando:boolean=false;
  tituloOrdenando:string;
  constructor(public navCtrl: NavController) {
    //this.animales = ANIMALES.map(a=>{ return{"nombre":a.nombre,"origen":a.origen, "descripcion":a.descripcion,"imagen":a.imagen
    //                                 ,"audio":a.audio,"duracion":a.duracion,"reproduciendo":a.reproduciendo} });
    this.animales = ANIMALES.slice(0);
    this.audio = new Audio();
    console.log(this.animales);
  }
  reproducir(animal:Animal)
  {
    if(this.itemActual==null)
      this.itemActual=animal;
    if(!this.itemActual.reproduciendo)
    {
      this.itemActual=animal;
      this.audio.src= animal.audio;
      animal.reproduciendo=true;
      this.audio.load();
      this.audio.play();
      setTimeout(()=>{animal.reproduciendo=false;
        this.audio.pause();
      },animal.duracion*1000);
    }
  }
  borrarItem(item,i)
  {
    console.log(this.animales.indexOf(item));
    this.animales.splice(i,1);
  }
  refrescar(refresher:Refresher)
  {
    if(this.ordenando)
      refresher.complete();
      else{
        console.log("inicio de refresh");
        setTimeout(()=>{
          console.log("termino refresh");
          this.animales = ANIMALES.slice(0);
          refresher.complete();
        },2000);
      }
  }
  reordenar(reorder:any)
  {
    console.log(reorder);
    this.animales = reorderArray(this.animales,reorder);
  }
  TituloOrdenando():string
  {
    let retorno:string="";
    retorno= this.ordenando?"Ordenando":"Ordenar";
    return retorno;
  }
}
