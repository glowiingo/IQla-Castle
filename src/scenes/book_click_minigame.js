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
  }

  init() {
    // Worked on by: Alexis
    this.sceneKey = 'book_click_minigame';
    this.background; // The background image to be used for relative positioning.
    // Objects used for storing the background image's x,y coordinates:
    this.bottomRightCoords = {};
    this.bottomCentreCoords = {};
    this.centreCoords = {};

    this.paperNoteTopLeftCoords = {};
  }

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
    this.load.audio('ok', '../../assets/ok.mp3');

    // ---------- Pre-load Video ---------- //
    this.load.video('bravo', '../../assets/bravowow.mp4');
  }

  create(data) {
    // Worked on by: Alexis
    // ---------- Background Image ---------- //
    this.background = this.add.image(this.cameras.default.width / 2, this.cameras.default.height / 2, BG_IMG_KEY);
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
    paperNoteImg.getTopLeft(this.paperNoteTopLeftCoords); // Store coordinates of top left position for later use.
  }

  /** Add the book interactables to the scene and position them on the background images. */
  addBooks() {
    // Worked on bn: Alexis
    const bookWidth = 50;
    const bookHeight = 150;

    // Worked on by: Charles
    // ---------- Audio ---------- //
    let no = this.sound.add('no');
    let yes = this.sound.add('yes');
    let ok = this.sound.add('ok');
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
    let bookKeyArray = minigame_scene_manager.shuffleArray([BOOK0_KEY, BOOK1_KEY, BOOK2_KEY, BOOK3_KEY, BOOK4_KEY]);
    const topShelfY = this.centreCoords.y - 62;

    let books = this.physics.add.group();
    let book0 = this.add.image(245, topShelfY, bookKeyArray[0]);
    let book1 = this.add.image(300, topShelfY, bookKeyArray[1]);
    let book2 = this.add.image(this.centreCoords.x + bookWidth, topShelfY + bookWidth, bookKeyArray[2]);
    book2.setRotation(-1.5708); // Rotate -90 degrees
    let book3 = this.add.image(215, this.bottomCentreCoords.y, bookKeyArray[3]);
    book3.setOrigin(0, 1);
    let book4 = this.add.image(328, this.bottomCentreCoords.y, bookKeyArray[4]);
    book4.setOrigin(0, 1);
    book4.setRotation(-0.436332); // Rotate -25 degrees

    // Worked on by: Charles
    book0.setData({
      id: 0,
      title: bookKeyArray[0],
    });
    book1.setData({
      id: 1,
      title: bookKeyArray[1],
    });
    book2.setData({
      id: 2,
      title: bookKeyArray[2],
    });
    book3.setData({
      id: 3,
      title: bookKeyArray[3],
    });
    book4.setData({
      id: 4,
      title: bookKeyArray[4],
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
        let idx = numArr.indexOf(book.getData('id'));
        if (idx >= 0) {
          book.disableInteractive();
          numArr.splice(idx, 1);
          no.stop();
          if (numArr.length === 0) {
            this.playVideo();
          } else {
            ok.play();
          }
        } else if (numArr.length !== 0) {
          no.play();
        }
      });
    });

    while (numArr.length != booksNeeded) {
      let randNum = Math.floor(Math.random() * books.children.size);
      if (!numArr.includes(randNum)) {
        numArr.push(randNum);
      }
    }

    // Worked on by: Alexis
    // ---------- Text Positions  ---------- //
    let padding = 20;
    let xPosition = this.paperNoteTopLeftCoords.x + padding;
    let yPosition = this.paperNoteTopLeftCoords.y + padding;
    const yDistance = 40;
    numArr.forEach((num) => {
      this.add.text(xPosition, yPosition, books.children.entries[num].getData('title'), {
        font: '20px Arial',
        fill: 'black',
      });
      yPosition += yDistance;
    });
  }

  playVideo() {
    let bravo = this.add.video(400, 300, 'bravo');
    bravo.setVolume(0.8);
    bravo.alpha = 0.5;
    bravo.setDepth(2);
    bravo.play();

    this.tweens.add({
      targets: bravo,
      scale: 4,
      duration: bravo.getDuration() * 1000,
      repeat: 0,
    });

    bravo.on('complete', () => {
      // When the audio plays, the win condition has been satisfied.
      // After the audio has finished playing, call the 'won' function.
      minigame_scene_manager.minigameWon('book_click_minigame');
    });
  }
}
