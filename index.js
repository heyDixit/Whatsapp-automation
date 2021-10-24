const puppeteer = require("puppeteer");

(async function main() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });
    const page = await browser.newPage();

    await page.goto("https://web.whatsapp.com/");
    const navigationPromise = page.waitForNavigation({
      waitUntil: "domcontentloaded",
    });

    await navigationPromise;
    await page.waitForSelector("._13NKt");
    await delay(4000);

    const contactName = "Bishal";
    await page.click(`span[title='${contactName}']`);
    await navigationPromise;
    await page.waitForSelector("._3q9s6");

    const editor = await page.$("div[data-tab='9']");
    await editor.focus();
    const amountOfMessages = 5000;

    for (var i = 0; i < amountOfMessages; i++) {
      await page.evaluate(() => {
        const message = "hey";
        document.execCommand("insertText", false, message);
      });
      await page.click("span[data-testid='send']");
      await delay(500);
    }
  } catch (error) {
    console.log(error);
  }
})();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
