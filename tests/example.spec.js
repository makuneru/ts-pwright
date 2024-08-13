// @ts-check
const { test, expect, request } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test.only('get activities', async ({ request }) => {
  const response = await request.get(`https://fakerestapi.azurewebsites.net/api/v1/Activities`);
  const activities = await response.json();

  // Basic response checks
  console.log(activities);
  console.log(response.headers());
  console.log(response.status());
  console.log(response.statusText());
  console.log(response.url());
  expect(response.ok()).toBeTruthy();

  // Schema validation
  activities.forEach((activity) => {
    // Check that all required fields exist
    expect(activity).toHaveProperty('id');
    expect(activity).toHaveProperty('title');
    expect(activity).toHaveProperty('dueDate');
    expect(activity).toHaveProperty('completed');

    // Check that fields are of the expected types
    expect(typeof activity.id).toBe('number');
    expect(typeof activity.title).toBe('string');
    expect(typeof activity.dueDate).toBe('string');
    expect(typeof activity.completed).toBe('boolean');

    // You can also add checks for specific values if needed
    // For example, ensure 'dueDate' follows a certain format
    expect(new Date(activity.dueDate).toString()).not.toBe('Invalid Date');
  });

  // Additional assertion: Check that the number of activities is greater than 0
  expect(activities.length).toBeGreaterThan(0);
});
