import {
  Component, OnInit,
} from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  ngOnInit(): void {
    this.draw();
  }

  draw() {
    const canvas = document.getElementById('canvas-color-picker');
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.fillStyle = 'blue';
      ctx.fillRect(100, 50, 150, 100);
      ctx.fillStyle = 'red';
      ctx.fillRect(125, 75, 100, 50);
      ctx.rect(25, 25, 25, 25);
      // https://www.youtube.com/watch?v=WA4yOWGKgOE&list=PLM7wFzahDYnFnw7aZfmhlpmflYa_Z98sF&index=2



      ctx.beginPath();
      ctx.lineWidth = '3';
      ctx.strokeStyle = 'red';
      ctx.lineCap = 'round';
      ctx.moveTo(50, 150);
      ctx.lineTo(150, 50);
      ctx.lineTo(200, 150);
      ctx.lineTo(50, 150);

      ctx.stroke();
      // ctx.fillRect(25, 25, 150, 150);
      //
      // ctx.fillStyle = 'rgba(0,0,0,0.5)';
      // ctx.clearRect(60, 60, 120, 120);
      // ctx.strokeRect(90, 90, 80, 80);
    }
    // ctx.fillRect(100, 50, 150, 100);


  }
}
