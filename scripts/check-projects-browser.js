// Run in the browser console on the portfolio homepage when more projects exist.
(async () => {
  const more = document.querySelector('.projects-more-panel button');
  console.assert(more, 'View more projects must be available');
  if (!more) return;
  more.click();
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.assert(document.querySelector('#all-projects .work-card'), 'Additional projects must be visible');
  const fewer = document.querySelector('.projects-archive-heading button');
  console.assert(fewer, 'Show fewer projects must be available');
  fewer?.click();
  await new Promise((resolve) => setTimeout(resolve, 100));
  console.assert(!document.querySelector('#all-projects'), 'Additional projects must be hidden');
  console.assert(document.activeElement === more, 'Focus must return to View more projects');
})();
