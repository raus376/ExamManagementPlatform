import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css']
})
export class ShowResultComponent implements OnInit{
 
  resultData:any;
  userData:any;

  constructor(private route:ActivatedRoute,private login:LoginService){};
 
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.resultData = params; // Access the passed data here
      this.userData=this.login.getUser();
      console.log(this.resultData);
    });
  }

}
