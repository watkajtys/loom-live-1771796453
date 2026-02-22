import { test, expect } from '@playwright/test';

test('verify LofiLoom functionality', async ({ page }) => {
  // Navigate to the app
  await page.goto('http://localhost:5173/');

  // 1. Verify "LofiLoom" brand is visible
  await expect(page.getByText('LofiLoom')).toBeVisible();

  // 2. Verify initial timer state (25:00) and Focus Mode
  await expect(page.getByText('25:00')).toBeVisible();
  await expect(page.getByText('focus Mode')).toBeVisible();

  // 3. Verify Audio Stems are present
  const stems = ['Rain', 'Cafe', 'Fire', 'Vinyl', 'Nature'];
  for (const stem of stems) {
    await expect(page.getByText(stem, { exact: true })).toBeVisible();
  }

  // 4. Test Play/Pause functionality
  // Initially, it should show 'play_arrow' icon
  const playButtonIcon = page.getByText('play_arrow');
  await expect(playButtonIcon).toBeVisible();

  // Click Play
  await playButtonIcon.click();

  // Verify it changes to 'pause'
  await expect(page.getByText('pause')).toBeVisible();

  // Wait for 2 seconds to check timer countdown
  // Note: The timer updates every second.
  await page.waitForTimeout(2000);

  // The timer should be less than 25:00. 
  // 25:00 is 1500 seconds. After 2s, it should be around 1498s -> 24:58.
  // We can check that '25:00' is NO LONGER visible.
  await expect(page.getByText('25:00')).not.toBeVisible();

  // Click Pause
  await page.getByText('pause').click();
  await expect(page.getByText('play_arrow')).toBeVisible();

  // 5. Test Session Switching
  // Switch to Short Break
  await page.getByRole('button', { name: 'short' }).click();
  
  // Timer should reset to 05:00
  await expect(page.getByText('05:00')).toBeVisible();
  await expect(page.getByText('short Mode')).toBeVisible();

  // Switch to Long Break
  await page.getByRole('button', { name: 'long' }).click();
  
  // Timer should reset to 15:00
  await expect(page.getByText('15:00')).toBeVisible();
  await expect(page.getByText('long Mode')).toBeVisible();

  // Switch back to Focus
  await page.getByRole('button', { name: 'focus' }).click();
  await expect(page.getByText('25:00')).toBeVisible();

  // 6. Test Reset Button (Replay icon)
  // Start timer again
  await page.getByText('play_arrow').click();
  await page.waitForTimeout(2000);
  await expect(page.getByText('25:00')).not.toBeVisible();

  // Click Reset (replay icon)
  await page.getByText('replay').click();
  
  // Should be back to 25:00 and paused (default reset behavior usually pauses or keeps state, check store)
  // In FocusEngine.tsx: onClick={resetTimer}
  // In lofiStore.ts: resetTimer: () => set((state) => ({ timer: state.initialTimer, isPlaying: false }))
  // So it pauses and resets.
  await expect(page.getByText('25:00')).toBeVisible();
  await expect(page.getByText('play_arrow')).toBeVisible();

  // Take screenshot
  await page.screenshot({ path: 'evidence.png' });
});
