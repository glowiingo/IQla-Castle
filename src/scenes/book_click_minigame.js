// Worked on by: Alexis C. Mendiola, Charles Huang

const BG_IMG_KEY = 'bookClickBg';
const PAPER_NOTE_KEY = 'paperNote';
const BOOK0_KEY = 'Hamlet';
const BOOK1_KEY = 'Dracula';
const BOOK2_KEY = 'Escaping Castles 101, 5th Edition';
const BOOK3_KEY = 'Necronomicon';
const BOOK4_KEY = 'College Thesaurus, 2nd Edition';

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
    this.load.image(BG_IMG_KEY, '../assets/minigames/backgrounds/bgBookshelf.png');
    this.load.image(PAPER_NOTE_KEY, '../assets/minigames/items/paper.png');

    // ---------- Pre-load Book Images ---------- //
    this.load.image(BOOK0_KEY, '../../assets/minigames/items/book1.png');
    this.load.image(BOOK1_KEY, '../../assets/minigames/items/book2.png');
    this.load.image(BOOK2_KEY, '../../assets/minigames/items/book3.png');
    this.load.image(BOOK3_KEY, '../../assets/minigames/items/book4.png');
    this.load.image(BOOK4_KEY, '../../assets/minigames/items/book5.png');

    // ---------- Pre-load Audio ---------- //
    this.load.audio('no', '../../assets/audio/no.mp3');
    this.load.audio('yes', '../../assets/audio/yes.mp3');
    this.load.audio('ok', '../../assets/audio/ok.mp3');

    // ---------- Pre-load Video ---------- //
    this.load.video('bravo', '../../assets/video/bravowow.mp4');
  }

  create(data) {
    // Worked on by: Alexis
    // ---------- Background Image ---------- //
    this.addBackgroundImages(data);
    this.addBooks();
  }

  /**
   * Position the bookshelf and note paper images that are in the scene's background.
   * @param {JSON} data - contains the width and height information for the background.
   */
  addBackgroundImages(data) {
    // Worked on by: Alexis
    this.background = this.add.image(this.cameras.default.width / 2, this.cameras.default.height / 2, BG_IMG_KEY);
    this.background.displayWidth = data.width;
    this.background.displayHeight = data.height;

    // Get x,y coordinates for each corner of the background image.
    this.background.getBottomRight(this.bottomRightCoords);
    this.background.getCenter(this.centreCoords);
    this.background.getBottomCenter(this.bottomCentreCoords);

    // ---------- Paper Note ---------- //
    const paperNoteWidth = this.scene.scene.textures.get(PAPER_NOTE_KEY).getSourceImage().width * 3;
    const paperNoteHeight = this.scene.scene.textures.get(PAPER_NOTE_KEY).getSourceImage().height * 2;
    const paperNoteImg = this.add.image(this.bottomRightCoords.x, this.bottomRightCoords.y, PAPER_NOTE_KEY);
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
    const topShelfY = this.centreCoords.y - 80;
    const bottomShelfY = this.bottomCentreCoords.y - 20;

    let books = this.physics.add.group();

    // Books on Top Shelf:
    let book0 = this.add.image(200, topShelfY, bookKeyArray[0]);
    let book1 = this.add.image(252, topShelfY, bookKeyArray[1]);
    let book2 = this.add.image(this.centreCoords.x + bookWidth, topShelfY + bookWidth, bookKeyArray[2]);
    book2.setRotation(1.5708); // Rotate 90 degrees

    // Books on Bottom Shelf:
    let book3 = this.add.image(175, bottomShelfY, bookKeyArray[3]);
    book3.setOrigin(0, 1);
    let book4 = this.add.image(288, bottomShelfY, bookKeyArray[4]);
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
    let xPadding = 60;
    let yPadding = 50;
    let xPosition = this.paperNoteTopLeftCoords.x + xPadding;
    let yPosition = this.paperNoteTopLeftCoords.y + yPadding;
    const yDistance = 40;
    numArr.forEach((num) => {
      this.add.text(xPosition, yPosition, books.children.entries[num].getData('title'), {
        font: '14px Arial',
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
