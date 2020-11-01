const BOOKSHELF_KEY = 'bookshelf';
const EXIT_BUTTON_KEY = 'exitButt';
const PAPER_NOTE_KEY = 'paperNote';
const BOOK0_KEY = 'Haachama';
const BOOK1_KEY = 'Big Brain Peanut';
const BOOK2_KEY = 'Ghast Villager';
const BOOK3_KEY = 'Hell Ya Brother';
const BOOK4_KEY = 'Nicholas Cage';

class book_click_minigame extends Phaser.Scene {
  constructor() {
    super('book_click_minigame');

    // Worked on by: Alexis
    this.sceneKey = 'book_click_minigame';
  }

  init() {}

  preload() {
    // Worked on by: Alexis

    this.load.image(EXIT_BUTTON_KEY, '../../assets/exitButt.png');

    this.load.image(BOOKSHELF_KEY, '../assets/bookshelf.png');
    this.load.image(PAPER_NOTE_KEY, '../assets/paperNote.png');

    // ---------- Pre-load Book Images ---------- //
    this.load.image(BOOK0_KEY, '../../assets/haachamachama112.png');
    this.load.image(BOOK1_KEY, '../../assets/bigBrainPeanut.png');
    this.load.image(BOOK2_KEY, '../../assets/ghastVillager.jpg');
    this.load.image(BOOK3_KEY, '../../assets/hellYaBrother.jpg');
    this.load.image(BOOK4_KEY, '../../assets/nicolasCage.jpg');

    // ---------- Pre-load Audio ---------- //
    this.load.audio('no', '../../assets/no.mp3');
    this.load.audio('yes', '../../assets/yes.mp3');
  }

  create() {
    const SCALE_SIZE = 0.8;
    const BG_COLOUR = '#5d8a54';

    // ---------- Scale Scene size to 80% for 'overlay' ---------- //
    // Worked on by: Charles
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
    // Worked on by: Alexis
    let exitButt = this.add.image(615, 25, EXIT_BUTTON_KEY);
    exitButt.displayWidth = 40;
    exitButt.displayHeight = 40;
    exitButt.setInteractive();
    exitButt.on('pointerdown', () => {
        this.scene.stop(this.sceneKey);
    });

    this.addBackgroundImages();
    this.addBooks();
  }

  addBackgroundImages() {
    // Worked on by: Alexis

    // ---------- Bookshelf ---------- //
    const bookshelfWidth = 400;
    const bookshelfHeight = 405;
    const centerX = this.cameras.main.width / 2;
    const bottomY = this.cameras.main.height - (bookshelfHeight / 2);

    const bookshelfImg = this.add.image(centerX, bottomY, BOOKSHELF_KEY);
    bookshelfImg.displayWidth = bookshelfWidth;
    bookshelfImg.displayHeight = bookshelfHeight;

    // ---------- Paper Note ---------- //
    const paperNoteWidth = 250;
    const paperNoteHeight = 110;
    const bottomRightX = this.cameras.main.width;
    const bottomRightY = this.cameras.main.height;
    const paperNoteImg = this.add.image(bottomRightX, bottomRightY, PAPER_NOTE_KEY);
    paperNoteImg.setOrigin(1, 1);
    paperNoteImg.displayWidth = paperNoteWidth;
    paperNoteImg.displayHeight = paperNoteHeight;
  }

  addBooks() {
    // Worked on bn: Alexis
    const bookWidth = 50;
    const bookHeight = 150;

    // Worked on by: Charles
    // ---------- Audio ---------- //
    let no = this.sound.add('no');
    let yes = this.sound.add('yes');
    no.setVolume(0.4);
    yes.setVolume(0.4);

    // Worked on by: Alexis
    yes.on('complete', sound => {
      this.minigameWon();
    });

    // ---------- Book Images ---------- //
    const booksNeeded = 2;
    let numArr = [];

    // Worked on by: Alexis
    const topShelfY = 205;
    const bottomShelfY = this.cameras.main.height - (bookHeight / 2);

    let books = this.physics.add.group();
    let book0 = this.add.image(175, topShelfY, BOOK0_KEY);
    let book1 = this.add.image(230, topShelfY, BOOK1_KEY);
    let book2 = this.add.image(400, topShelfY + (bookWidth), BOOK2_KEY);
    book2.setRotation(-1.5708); // Rotate -90 degrees
    let book3 = this.add.image(175, bottomShelfY, BOOK3_KEY);
    let book4 = this.add.image(255, bottomShelfY, BOOK4_KEY);
    book4.setRotation(-0.436332); // Rotate -25 degrees

    // Worked on by: Charles
    book0.setData({
      id: 0,
      title: BOOK0_KEY
    });
    book1.setData({
      id: 1,
      title: BOOK1_KEY
    });
    book2.setData({
      id: 2,
      title:  BOOK2_KEY
    });
    book3.setData({
      id: 3,
      title: BOOK3_KEY
    });
    book4.setData({
      id: 4,
      title: BOOK4_KEY
    });

    books.add(book0);
    books.add(book1);
    books.add(book2);
    books.add(book3);
    books.add(book4);

    books.children.iterate((book) => {
      book.displayWidth = bookWidth;
      book.displayHeight = bookHeight;

      book.setInteractive();
      book.on('pointerdown', () => {
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

    let xPosition = this.cameras.main.width - 230;
    let yPosition = this.cameras.main.height - 90;
    const yDistance = 40;
    numArr.forEach((num) => {
      this.add.text(xPosition, yPosition, books.children.entries[num].getData('title'), {
        font: '25px Arial',
        fill: 'black'
      });
      yPosition += yDistance;
    });
  }

  minigameWon() {
    // Worked on by: Alexis

    // TODO:
    // Logic for updating taskbar after minigame completion.

    console.log('Minigame won; book_click_minigame stopped.');
    this.scene.stop(this.sceneKey);
  }
}