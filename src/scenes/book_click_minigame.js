const IMAGE_SCALE = 0.45;
const BG_COLOUR = '0x5d8a54';
const BOOKSHELF_KEY = 'bookshelf';
const BG_IMG_KEY = 'bookClickBg';
const PAPER_NOTE_KEY = 'paperNote';
const BOOK0_KEY = 'Haachama';
const BOOK1_KEY = 'Big Brain Peanut';
const BOOK2_KEY = 'Ghast Villager';
const BOOK3_KEY = 'Hell Ya Brother';
const BOOK4_KEY = 'Nicholas Cage';

class book_click_minigame extends Phaser.Scene {
  constructor() {
    super('book_click_minigame');
    this.sceneKey = 'book_click_minigame';
    this.background; // The background image to be used for relative positioning.
    // Objects used for storing the background image's x,y coordinates:
    this.bottomRightCoords = {};
    this.bottomCentreCoords = {};
    this.centreCoords = {};
  }

  init() {}

  preload() {
    // Worked on by: Alexis
    this.load.image(BG_IMG_KEY, '../assets/transparentBg.png');
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

  create(data) {

    // ---------- Background Image ---------- //
    this.background = this.add.image(
      this.cameras.default.width / 2, 
      this.cameras.default.height / 2, 
      BG_IMG_KEY
    );
    this.background.setTint(BG_COLOUR);
    this.background.displayWidth = data.width;
    this.background.displayHeight = data.height;

    // Get x,y coordinates for each corner of the background image.
    this.background.getBottomRight(this.bottomRightCoords);
    this.background.getCenter(this.centreCoords);
    this.background.getBottomCenter(this.bottomCentreCoords);
    this.addBackgroundImages();
    this.addBooks();
  }

  /**
   * Position the bookshelf and note paper images that are in the scene's background.
   * @param {JSON} data - contains the width and height information for the background.
   */
  addBackgroundImages() {
    // Worked on by: Alexis
    // ---------- Bookshelf ---------- //
    const bookshelfWidth = this.scene.scene.textures.get(BOOKSHELF_KEY).getSourceImage().width * IMAGE_SCALE;
    const bookshelfHeight = this.scene.scene.textures.get(BOOKSHELF_KEY).getSourceImage().height * IMAGE_SCALE;
    const bookshelfImg = this.add.image(this.centreCoords.x, this.bottomCentreCoords.y, BOOKSHELF_KEY);
    bookshelfImg.setScale(IMAGE_SCALE);
    bookshelfImg.setOrigin(0.5, 1);
    bookshelfImg.displayWidth = bookshelfWidth;
    bookshelfImg.displayHeight = bookshelfHeight;

    // ---------- Paper Note ---------- //
    const paperNoteWidth = this.scene.scene.textures.get(PAPER_NOTE_KEY).getSourceImage().width * IMAGE_SCALE;
    const paperNoteHeight = this.scene.scene.textures.get(PAPER_NOTE_KEY).getSourceImage().height * IMAGE_SCALE;
    const paperNoteImg = this.add.image(this.bottomRightCoords.x, this.bottomRightCoords.y, PAPER_NOTE_KEY);
    paperNoteImg.setScale(IMAGE_SCALE);
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
    yes.on('complete', () => {
      // When the yes audio plays, the win condition has been satisfied.
      // After the yes audio has finished playing, call the 'won' function.
      minigame_scene_manager.minigameWon(this.sceneKey);
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
}