describe('Basic user flow for Website', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/index.html');
  });
  it('Checking empty initial page', async () => {
    const numOfnotes = await page.$$eval('.note', elements => {
      return elements.length;
    });
    expect(numOfnotes).toBe(0);

  });

  it('Checking for adding new note', async () => {
    console.log('Checking for adding new note');
    const button = await page.$('button');
    await button.click();
    const note_count = await page.$$eval('.note', element => element.length);
    expect(note_count).toBe(1);

  });

  it('Checking for editing new note (edited note is saved by clicking outside of the note, or pressing tab- a focused note cannot be deleted or saved)', async () => {
    console.log('Checking for editing it new note (edited note is saved by clicking outside of the note, or pressing tab- a focused note cannot be deleted or saved)');
    await page.click('.note');
    await page.type('.note', 'editing new note');
    await page.keyboard.press('Tab');
    const note_content = await page.$eval('.note', element => element.value);
    expect(note_content).toBe('editing new note');

  });
  it('Checking to make sure edit existing note (edited note is saved by clicking outside of the note, or pressing tab- a focused note cannot be deleted or saved)', async () => {
    console.log('Checking to make sure edit existing note (edited note is saved by clicking outside of the note, or pressing tab- a focused note cannot be deleted or saved)');
    await page.click('.note');
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.type('.note', 'edit existing note');
    await page.keyboard.press('Tab');
    const note_content = await page.$eval('.note', element => element.value);
    expect(note_content).toBe('edit existing note');

  });

  it('Checking notes are saved locally (notes are still there after refreshing page)', async () => {
    console.log('Checking notes are saved locally (notes are still there after refreshing page)');
    await page.reload();
    const note_content = await page.$eval('.note', element => element.value);
    expect(note_content).toBe('edit existing note');

  });

  it('Checking for deleting note by double clicking on note', async () => {
    console.log('Checking for deleting note by double clicking on note');
    await page.click('.note', { clickCount: 2 });
    const numOfnotes = await page.$$eval('.note', elements => {
      return elements.length;
    });
    expect(numOfnotes).toBe(0);
  });
});
