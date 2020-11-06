// ---- THIS FILE IS NO LONGER NEEDED. PROGRESS BAR IS IN PLAYERUI_SCENE.JS ----


// //worked on by: Kshitiz Bisht
//
// class ProgressBar {
//
//     constructor(scene, x, y) {
//         this.bar = new Phaser.GameObjects.Graphics(scene);
//
//         this.x = x; // x-ordinate of the taskbar.
//         this.y = y; // y-ordinate of the taskbar.
//         this.value = 0;
//         this.p = 75 / 100; // p is a variable which is used to increase the taskbar corresponding to the value.
//         // for e.g. in game we say that a task completed will give 35 points to the user's team.
//         // this. p will change the 35 to a taskbar value
//
//         this.draw();
//         scene.add.existing(this.bar);
//     }
//
//     increase(amount) {
//         this.value += amount;
//         console.log("increase clicked " + this.value);
//         if (this.value < 0) {
//             this.value = 0;
//         }
//         this.draw();
//         return (this.value === 0);
//     }
//
//     draw() {
//         this.bar.clear();
//
//         //  BG
//         this.bar.fillStyle(0xffffff);
//         this.bar.fillRect(this.x + 2, this.y + 2, 200, 16);
//         this.bar.fillStyle(0x00fe00);
//         var d = Math.floor(this.p * this.value);
//         this.bar.fillRect(this.x + 2, this.y + 2, d, 16);
//     }
// }