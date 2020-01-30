const fs = require('fs');
const anki = require('./anki');

const json = fs.readFileSync(__dirname + '/../vocab/n5.json', 'utf8');
const vocab = JSON.parse(json);

let Front = [];
let Back = [];

vocab.forEach(({ kana, kanji, type, definition }) => {
  if (kanji) {
    Front.push(kanji);
    Back.push(`${kana} - ${definition} - ${type}`);
  } else {
    Front.push(kana);
    Back.push(`${definition} - ${type}`);
  }
});

const notes = anki.addNotes('N5 Vocab', 'Basic', Front, Back, []);

anki.ankiConnect(notes).then(res => console.log(res));
