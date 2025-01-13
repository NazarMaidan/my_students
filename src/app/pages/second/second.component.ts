import { Component, inject, OnInit } from '@angular/core';
import { map, shareReplay, Subject, switchMap } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
const MONTH = 'nov';
@Component({
    selector: 'app-second',
    imports: [],
    templateUrl: './second.component.html',
    styleUrl: './second.component.scss'
})
export class SecondComponent implements OnInit {

  firebaseService = inject(FirebaseService);
  selectedClass: number | null = null;
  spinChart: boolean = false;
  private triggerUpdate$ = new Subject<void>();

  public ngOnInit():void {
    this.triggerUpdate$.pipe(
      switchMap(() => this.firebaseService.getStudents().pipe(shareReplay(1))),
      map((students: any) => students.filter((student: any) => student.class === this.selectedClass)),
      map((students: any) => this.removeHighestPoints(students)),

    ).subscribe((res: any) => {
      this.drawPieChart(res);
    })
  }

  onCheckboxChanged({ checked }: any, classRoom: number): void {
    this.selectedClass = checked ? classRoom : null;
    this.triggerUpdate$.next();
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * 156) + 100; // Red: 100–255
    const g = Math.floor(Math.random() * 156) + 100; // Green: 100–255
    const b = Math.floor(Math.random() * 156) + 100; // Blue: 100–255
    return `rgb(${r}, ${g}, ${b})`;
  }

  removeHighestPoints(arr: any) {
    if (arr.length === 0) return arr;

    const maxPoints = Math.max(...arr.map((item: any) => item.points));

    return arr.filter((item: any) => item.points !== maxPoints);
  }

  // Draw the pie chart
  drawPieChart(res: any) {
    const canvas: any = document.getElementById('pieChartCanvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 250;

    const data = res.map((student: any) => ({
      label: student.name,
      value: student[MONTH],
      color: this.getRandomColor()
    }))
    const total = data.reduce((sum: any, item: any) => sum + item.value, 0);
    let startAngle = 0;

    data.forEach((item: any) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();

      // Add labels
      const labelAngle = startAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
      ctx.fillStyle = "#000";
      ctx.font = "18px Arial";
      ctx.textAlign = "center";
      ctx.fillText(item.label, labelX, labelY);

      startAngle += sliceAngle;
    });


    function getRandomRotation() {
      return Math.floor(Math.random() * (18000 - 360 + 1)) + 360; // Random between 1440 and 36000 degrees
    }

    // Rotate function with smooth animation
    function rotateWheel() {
      const randomRotation = getRandomRotation(); // Get random rotation angle
      const rotationDuration = 5000; // 5 seconds duration for rotation

      let startTime: any;
      let currentRotation = 0;
      const endRotation = randomRotation;

      // Smooth animation using requestAnimationFrame
      function animateRotation(timestamp: any) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / rotationDuration, 1);

        // Calculate easing for the rotation (start fast, slow down at the end)
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Smooth slow-down effect

        // Update the current rotation value
        currentRotation = easedProgress * endRotation;

        // Apply the rotation to the element
        canvas.style.transform = `rotate(${currentRotation}deg)`;

        // Continue the animation until it finishes
        if (progress < 1) {
          requestAnimationFrame(animateRotation);
        }
      }

      // Start the animation
      requestAnimationFrame(animateRotation);
    }

    // Trigger the rotation on click
    canvas.addEventListener('click', rotateWheel);
  }


}
