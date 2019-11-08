import fs from 'fs';
import os from 'os';
declare var jestPuppeteer: any;
describe('Slider', () => {
  //const browser = page.browser();

  beforeEach(async () => {
    await jestPuppeteer.resetPage();
    await page.goto('http://localhost:3456/iframe.html?id=slider--fluent-slider');
  });

  it('should move slider', async () => {
    const sliderThumb = await page.mainFrame().waitForSelector('[role="slider"]');

    await sliderThumb.hover();
    await page.mouse.down();
    await page.mouse.move(14, 28);
    await page.mouse.up();

    const boundingBox = (await sliderThumb.boundingBox())!;

    expect(boundingBox).not.toBeNull();
    expect(boundingBox.x).toBe(14);
  });

  it('should move slider 2', async () => {
    const sliderThumb = await page.mainFrame().waitForSelector('[role="slider"]');

    await sliderThumb.hover();
    await page.mouse.down();
    await page.mouse.move(14, 28);
    await page.mouse.up();

    const boundingBox = (await sliderThumb.boundingBox())!;

    expect(boundingBox).not.toBeNull();
    expect(boundingBox.x).toBe(14);
  });
});
