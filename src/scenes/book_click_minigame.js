class book_click_minigame extends Phaser.Scene {
    constructor() {
        super("book_click_minigame");
    }

    init() {
        // initialize and prepare data 
        // constants, configurations, etc.
    }

    preload() {
        this.load.image('haachama', '../../assets/haachamachama112.png');
        this.load.image('bigBrainPeanut', '../../assets/bigBrainPeanut.png');
        this.load.image('ghastVillager', '../../assets/ghastVillager.jpg');
        this.load.image('hellYaBrother', '../../assets/hellYaBrother.jpg');
        this.load.image('nicolasCage', '../../assets/nicolasCage.jpg');
        this.load.audio('no', '../../assets/no.mp3');
        this.load.audio('yes', '../../assets/yes.mp3');
    }
    
    create() {
        let no = this.sound.add('no');
        no.setVolume(0.4);

        let yes = this.sound.add('yes');
        yes.setVolume(0.4);

        const booksNeeded = 2;
        let numArr = [];

        let books = this.physics.add.group();
        let book0 = this.add.image(100, 300, "haachama");
        let book1 = this.add.image(250, 300, "bigBrainPeanut");
        let book2 = this.add.image(400, 300, "ghastVillager");
        let book3 = this.add.image(550, 300, "hellYaBrother");
        let book4 = this.add.image(700, 300, "nicolasCage");

        book0.setData({id: 0, title: "Haachama"});
        book1.setData({id: 1, title: "Big Brain Peanut"});
        book2.setData({id: 2, title: "Ghast Villager"});
        book3.setData({id: 3, title: "Hell Ya Brother"});
        book4.setData({id: 4, title: "Nicolas Cage"});

        books.add(book0);
        books.add(book1);
        books.add(book2);
        books.add(book3);
        books.add(book4);

        books.children.iterate((book) => {
            book.displayWidth = 100;
            book.displayHeight = 400;
            
            book.setInteractive();
            book.on("pointerdown", function(){
                if(numArr.includes(book.getData("id"))){
                    book.disableInteractive();
                    console.log(numArr);
                    let idx = numArr.findIndex((num) => {
                        return num == book.getData("id");
                    });
                    numArr.splice(idx, 1);
                    if(numArr.length == 0){
                        no.stop();
                        yes.play();
                    }
                } else {
                    if(numArr.length != 0){
                        no.play();
                    }
                }
            });
        });

        while(numArr.length != booksNeeded){
            let randNum = Math.floor(Math.random() * books.children.size);
            if (!numArr.includes(randNum)){
                numArr.push(randNum);
            }
        }

        let distance = 20;
        numArr.forEach((num) => {
            this.add.text(distance, 20, books.children.entries[num].getData("title"), {font: "25px Arial", fill: "yellow"});
            distance += 200;
        });
        
        
    }

    update() {
        // loop that runs constantly 
        // -- game logic mainly in this area
    }
}