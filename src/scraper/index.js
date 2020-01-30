const puppeteer = require('puppeteer');
const fs = require('fs');

const url = 'https://jlptstudy.net/N5/?vocab-list';

const scrape = async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  // go to page
  await page.goto(url, { waitUntil: 'networkidle2' });
  const vocab = await page.evaluate(() => {
    const rows = document.querySelectorAll('tr');

    return Array.from(rows).map(row => {
      const kana = row.children[1].innerText;
      const kanji = row.children[2].innerText;
      const type = row.children[3].innerText;
      const definition = row.children[4].innerText;

      return { kana, kanji, type, definition };
    });
  });

  await browser.close();

  const json = JSON.stringify(vocab);

  fs.writeFileSync(__dirname + '/../../vocab/n5.json', json, 'utf8');
};

scrape();
