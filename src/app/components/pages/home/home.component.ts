import { Tag } from './../../../shared/models/tag';
import { FoodService } from './../../../services/food.service';
import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods:Food[]=[]
  constructor(private foodService:FoodService, activatedRoute:ActivatedRoute) {
    activatedRoute.params.subscribe((params)=>{
      if(params['searchTerm'])
      this.foods=foodService.getAllFoodBySearchTerm(params['searchTerm']);
      if(params['tag'])
      this.foods=this.foodService.getAllFoodsByTag(params['tag'])
      else
      this.foods=this.foodService.getAll();
    })

   }

  ngOnInit(): void {
  }

}
