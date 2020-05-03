import { Component, OnInit,OnDestroy } from "@angular/core";
import { timer, Subscription } from "rxjs";
import { Pipe, PipeTransform } from "@angular/core";
import { take } from 'rxjs/operators';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  countDown: Subscription;
  counter = 10;
  tick = 1000;
  isValid: Boolean
  ngOnInit() {
    this.isValid = false;
    this.countDown = timer(0, this.tick).pipe(take(10)).subscribe(() => --this.counter,
    ()=> {},
    () => {
      this.isValid = true;
    });
  }
  ngOnDestroy(){
    this.countDown=null;
  }
}

@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}
