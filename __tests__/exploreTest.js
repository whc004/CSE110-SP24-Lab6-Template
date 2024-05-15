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
  });

  it('Checking for editing new note (edited note is saved by clicking outside of the note, or pressing tab- a focused note cannot be deleted or saved)', async () => {
    console.log('Checking for editing it new note (edited note is saved by clicking outside of the note, or pressing tab- a focused note cannot be deleted or saved)');

  },);

  it('Checking to make sure edit existing note (edited note is saved by clicking outside of the note, or pressing tab- a focused note cannot be deleted or saved)', async () => {
    console.log('Checking to make sure edit existing note (edited note is saved by clicking outside of the note, or pressing tab- a focused note cannot be deleted or saved)');

  });

  it('Checking notes are saved locally (notes are still there after refreshing page)', async () => {
    console.log('Checking notes are saved locally (notes are still there after refreshing page)');

  });

  it('Checking for deleting note by double clicking on note', async () => {
    console.log('Checking for deleting note by double clicking on note');
  });

  it('Checking after deleting same as initial page', async () => {
    const noteCount = await page.$$eval('.note', elements => {
      return elements.length > 0 ? elements.length : 0;
    });
    expect(noteCount).toBe(0);
  });





  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    // TODO - Step 5
    // At this point he item 'cart' in localStorage should be 
    // '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is
    const storedCart = await page.evaluate(() => {
      return localStorage.getItem('cart');
    });
    expect(JSON.parse(storedCart)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 6
    // Go through and click "Remove from Cart" on every single <product-item>, just like above.
    // Once you have, check to make sure that #cart-count is now 0
    const prodItems = await page.$$('product-item');
    for (let i = 0; i < prodItems.length; i++) {
      await page.evaluate(item => {
        const shadowRoot = item.shadowRoot;
        const button = shadowRoot.querySelector('button')
        button.click()
      }, prodItems[i]);
    }
    const cartCount = await page.$eval('#cart-count', el => el.textContent);
    expect(cartCount).toBe('0');

  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 7
    // Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
    // is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
    // Also check to make sure that #cart-count is still 0
    await page.reload();
    const prodItems = await page.$$('product-item');
    for (let i = 0; i < prodItems.length; i++) {
      const text = await page.evaluate(item => {
        const shadowRoot = item.shadowRoot;
        const button = shadowRoot.querySelector('button')
        return button.innerText;
      }, prodItems[i]);
      expect(text).toBe('Add to Cart')
    }
    const cartCount = await page.$eval('#cart-count', el => el.textContent);
    expect(cartCount).toBe('0');
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    // TODO - Step 8
    // At this point he item 'cart' in localStorage should be '[]', check to make sure it is
    const storedCart = await page.evaluate(() => {
      return localStorage.getItem('cart');
    });
    expect(JSON.parse(storedCart)).toEqual([]);
  });
});
