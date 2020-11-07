/**
 * Credits:
 * Alexis C. Mendiola
 * - Worked on scaling the size of the scene so that gameplay scene is visible beheind it.
 * - Positioning of the book image placeholders
 * - Positioning of book title text
 * - Added Exit Button to close this scene and take user back to gameplay scene.
 * 
 * Charles Huang:
 * - Game logic: determine if correct book was clicked
 * - Audio: stop/start logic
 */
class book_click_minigame extends Phaser.Scene {
  constructor() {
    super('book_click_minigame');

    this.sceneKey = 'book_click_minigame';
  }

  init() {
  }

  preload() {
    this.load.image('haachama', '../../assets/haachamachama112.png');
    this.load.image('bigBrainPeanut', '../../assets/bigBrainPeanut.png');
    this.load.image('ghastVillager', '../../assets/ghastVillager.jpg');
    this.load.image('hellYaBrother', '../../assets/hellYaBrother.jpg');
    this.load.image('nicolasCage', '../../assets/nicolasCage.jpg');
    this.load.image('exitButt', '../../assets/exitButt.png');
    this.load.audio('no', '../../assets/no.mp3');
    this.load.audio('yes', '../../assets/yes.mp3');
  }

  create() {
    const SCALE_SIZE = 0.8;
    const BG_COLOUR = '#5d8a54';

    // ---------- Scale Scene size to 80% for 'overlay' ---------- //
    console.log('Started book click minigame');
    let baseWidth = this.cameras.default.width;
    let baseHeight = this.cameras.default.height;
    let minigameWidth = baseWidth * SCALE_SIZE;
    let minigameHeight = baseHeight * SCALE_SIZE;

    let childScene = this.scene.get(this.sceneKey);
    childScene.cameras.resize(minigameWidth, minigameHeight);
    childScene.cameras.main.x = (baseWidth - minigameWidth) / 2;
    childScene.cameras.main.y = (baseHeight - minigameHeight) / 2;
    childScene.cameras.main.setBackgroundColor(BG_COLOUR);

    // ---------- Exit Button ---------- //
    let exitButt = this.add.image(615, 25, 'exitButt');
    exitButt.displayWidth = 40;
    exitButt.displayHeight = 40;
    exitButt.setInteractive();
    exitButt.on('pointerdown', () => {
        this.scene.stop(this.sceneKey);
    });

    this.addBooks();
  }

  addBooks() {
    // ---------- Audio ---------- //
    let no = this.sound.add('no');
    no.setVolume(0.4);

    let yes = this.sound.add('yes');
    yes.setVolume(0.4);

    // ---------- Book Images ---------- //
    const booksNeeded = 2;
    let numArr = [];

    let books = this.physics.add.group();
    let book0 = this.add.image(75, 200, 'haachama');
    let book1 = this.add.image(130, 200, 'bigBrainPeanut');
    let book2 = this.add.image(185, 200, 'ghastVillager');
    let book3 = this.add.image(240, 200, 'hellYaBrother');
    let book4 = this.add.image(295, 200, 'nicolasCage');

    book0.setData({
      id: 0,
      title: 'Haachama'
    });
    book1.setData({
      id: 1,
      title: 'Big Brain Peanut'
    });
    book2.setData({
      id: 2,
      title: 'Ghast Villager'
    });
    book3.setData({
      id: 3,
      title: 'Hell Ya Brother'
    });
    book4.setData({
      id: 4,
      title: 'Nicolas Cage'
    });

    books.add(book0);
    books.add(book1);
    books.add(book2);
    books.add(book3);
    books.add(book4);

    books.children.iterate((book) => {
      book.displayWidth = 50;
      book.displayHeight = 150;

      book.setInteractive();
      book.on('pointerdown', function () {
        if (numArr.includes(book.getData('id'))) {
          book.disableInteractive();
          console.log(numArr);
          let idx = numArr.findIndex((num) => {
            return num == book.getData('id');
          });
          numArr.splice(idx, 1);
          if (numArr.length == 0) {
            no.stop();
            yes.play();

            // Should stop the scene on success.
          }
      } else {
          if (numArr.length != 0) {
            no.play();
          }
        }
      });
    });

    while (numArr.length != booksNeeded) {
      let randNum = Math.floor(Math.random() * books.children.size);
      if (!numArr.includes(randNum)) {
        numArr.push(randNum);
      }
    }

    let xPosition = 440;
    let yPosition = 400;
    const yDistance = 40;
    numArr.forEach((num) => {
      this.add.text(xPosition, yPosition, books.children.entries[num].getData('title'), {
        font: '25px Arial',
        fill: 'black'
      });
      yPosition += yDistance;
    });
  }
}