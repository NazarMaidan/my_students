import { Component } from '@angular/core';
import { LIST } from '../../constants/students.list';

@Component({
  selector:'app-wheel',
  imports:[],
  templateUrl:'./wheel.component.html',
  standalone:true,
  styleUrl:'./wheel.component.scss'
})
export class WheelComponent {

  selectedList: any = [];
  selectedClass: any = [];
  classRoom: any = [];
  activeItem: any | null = null;
  selectedItems: Set<string> = new Set();

  onCheckboxChanged({ checked }:any, classRoom:number):void {
    this.selectedList = checked ? LIST[classRoom] : [];
    this.selectedClass = checked ? LIST[classRoom] : [];
    this.classRoom = classRoom;
    this.drawPieChart(this.shuffleArray(this.selectedList));
  }

  getRandomColor() {
    const r = Math.floor(Math.random()*156)+100; // Red: 100–255
    const g = Math.floor(Math.random()*156)+100; // Green: 100–255
    const b = Math.floor(Math.random()*156)+100; // Blue: 100–255
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Draw the pie chart
  drawPieChart(res:any) {
    // const canvas:any = document.getElementById('pieChartCanvas');
    // const ctx = canvas.getContext('2d');
    // const centerX = canvas.width/2;
    // const centerY = canvas.height/2;
    // const radius = 250;
    //
    // const data = res.map((student:any) => ({
    //   label:student.name, value:50, color:this.getRandomColor()
    // }))
    // const total = data.reduce((sum:any, item:any) => sum + item.value, 0);
    // let startAngle = 0;
    //
    // data.forEach((item:any) => {
    //   const sliceAngle = (item.value/total)*2*Math.PI;
    //
    //   // Draw slice
    //   ctx.beginPath();
    //   ctx.moveTo(centerX, centerY);
    //   ctx.arc(centerX, centerY, radius, startAngle, startAngle+sliceAngle);
    //   ctx.closePath();
    //   ctx.fillStyle = item.color;
    //   ctx.fill();
    //
    //   // Add labels
    //   const labelAngle = startAngle+sliceAngle/2;
    //   const labelX = centerX+Math.cos(labelAngle)*(radius*0.7);
    //   const labelY = centerY+Math.sin(labelAngle)*(radius*0.7);
    //   ctx.fillStyle = "#000";
    //   ctx.font = "18px Arial";
    //   ctx.textAlign = "center";
    //   ctx.fillText(item.label, labelX, labelY);
    //
    //   startAngle += sliceAngle;
    // });
    //
    //
    // function getRandomRotation() {
    //   return Math.floor(Math.random()*(18000-360+1))+360; // Random between 1440 and 36000 degrees
    // }
    //
    // // Rotate function with smooth animation
    // function rotateWheel() {
    //   const randomRotation = getRandomRotation(); // Get random rotation angle
    //   const rotationDuration = 5000; // 5 seconds duration for rotation
    //
    //   let startTime:any;
    //   let currentRotation = 0;
    //   const endRotation = randomRotation;
    //
    //   // Smooth animation using requestAnimationFrame
    //   function animateRotation(timestamp:any) {
    //     if(!startTime) startTime = timestamp;
    //     const elapsed = timestamp-startTime;
    //     const progress = Math.min(elapsed/rotationDuration, 1);
    //
    //     // Calculate easing for the rotation (start fast, slow down at the end)
    //     const easedProgress = 1-Math.pow(1-progress, 3); // Smooth slow-down effect
    //
    //     // Update the current rotation value
    //     currentRotation = easedProgress*endRotation;
    //
    //     // Apply the rotation to the element
    //     canvas.style.transform = `rotate(${currentRotation}deg)`;
    //
    //     // Continue the animation until it finishes
    //     if(progress<1){
    //       requestAnimationFrame(animateRotation);
    //     }
    //   }
    //
    //   // Start the animation
    //   requestAnimationFrame(animateRotation);
    // }
    //
    // // Trigger the rotation on click
    // canvas.addEventListener('click', rotateWheel);
  }

 
  onNameChanged({ checked }:any, name:string):void {
    this.selectedList = !checked ? this.selectedList.filter((el:any)=> el.name !== name) : [...this.selectedList, {name}];
    this.drawPieChart(this.shuffleArray(this.selectedList));
  }

  shuffleArray(array: any[]): any[] {
    const shuffled = array.slice();
  
    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      const temp = shuffled[i];
      shuffled[i] = shuffled[randomIndex];
      shuffled[randomIndex] = temp;
    }
  
    return shuffled;
  }

  onSelectStudent(){
    const result = this.selectedList.filter((el: any) => !this.selectedItems.has(el.name))
    this.randomElementWithIntervals(result);
  }

  randomElementWithIntervals(arr: any) {
    let interval = 200; // 0.3 секунди
    let duration = 4000; // 3 секунди
    let elapsed = 0;

    let timer = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * arr.length);
      this.activeItem = arr[randomIndex];
      elapsed += interval;

      if (elapsed >= duration) {
        clearInterval(timer);
        let finalIndex = Math.floor(Math.random() * arr.length);
        this.activeItem = arr[finalIndex];
        this.updateSelectedList(this.activeItem);
      }
    }, interval);
  }

  updateSelectedList(item: any) {
    this.selectedItems.add(item.name);
  }

  onToggleStudent(name: string){
    if(this.selectedItems.has(name)){
      this.selectedItems.delete(name);
    } else {
      this.selectedItems.add(name);
    }
  }

  onClearList(){
    this.selectedItems.clear();
  }
}
