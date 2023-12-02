const puppeteer = require('puppeteer');

const getText = async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: false
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await Promise.all([
    page.goto('https://globalhome.solarmanpv.com/login'),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);

  // Type into search box
  await page.type('#email', 'grzegorz.szewczyk04@gmail.com', { delay: 10 });
  await page.type('#password', 'admin123#', { delay: 10 });

  await Promise.all([
    page.click('#xmzd-login-btn'),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);

  await Promise.all([
    page.goto('https://globalhome.solarmanpv.com/plant/infos/component-layout'),
    page.waitForNavigation({ waitUntil: 'networkidle0' })
  ]);

  //await page.waitForTimeout(2000)

  const elementHandle = await page.$('.panel iframe');
  const frame = await elementHandle.contentFrame();

  const element = await frame.$(".b");
  const text = await (await element.getProperty('textContent')).jsonValue();

  await browser.close();

  return text;
};

// Call the function and log the result
getText().then(result => {
  console.log(result);
});
