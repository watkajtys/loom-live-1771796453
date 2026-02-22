import { test, expect } from '@playwright/test';

test('verify subscription stacker functionality', async ({ page }) => {
  // Navigate to the app
  await page.goto('http://localhost:5173/');

  // Check if the title is present
  await expect(page.getByRole('heading', { name: /Subscription Weight Stacker/i })).toBeVisible({ timeout: 5000 });

  // Add a new subscription
  await page.getByPlaceholder('Name (e.g. Netflix)').fill('Test Sub');
  await page.getByPlaceholder('0.00').fill('100');
  // Wait for button to be clickable
  const addButton = page.getByRole('button', { name: 'Add to Stack' });
  await addButton.click();

  // Verify the new subscription appears in the stack
  const testSubBlock = page.getByText('Test Sub');
  await expect(testSubBlock).toBeVisible();
  // Check the cost text inside the block or nearby
  await expect(page.getByText('$100.00/mo')).toBeVisible();

  // Verify the total monthly cost updated (Initial 135.96 + 100 = 235.96)
  await expect(page.getByText('$235.96 / month')).toBeVisible();

  // Wait for animation to settle
  await page.waitForTimeout(1000);

  // Drag the subscription to the inactive zone
  const blockBox = await testSubBlock.boundingBox();
  const dropZone = page.getByText('Drag Here to Deactivate');
  const dropZoneBox = await dropZone.boundingBox();

  if (blockBox && dropZoneBox) {
    // Perform drag and drop
    await page.mouse.move(blockBox.x + blockBox.width / 2, blockBox.y + blockBox.height / 2);
    await page.mouse.down();
    // Move to drop zone
    await page.mouse.move(dropZoneBox.x + dropZoneBox.width / 2, dropZoneBox.y + dropZoneBox.height / 2, { steps: 20 });
    // Wait a bit to simulate hover over drop zone
    await page.waitForTimeout(500);
    await page.mouse.up();
  }

  // Wait for removal animation
  await page.waitForTimeout(1000);

  // Verify the subscription is removed
  await expect(testSubBlock).not.toBeVisible();

  // Take screenshot
  await page.screenshot({ path: 'evidence.png' });
});
