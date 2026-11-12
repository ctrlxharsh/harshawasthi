// Run in the browser console on the portfolio homepage when more projects exist.
(async () => {
  const section = document.querySelector('.projects-pinned');
  if (section) {
    const windowEl = section.querySelector('.projects-window');
    const track = section.querySelector('.projects-track');
    const next = section.querySelector('[aria-label="Next project"]');
    const distance = track.scrollWidth - windowEl.clientWidth;
    console.assert(Math.abs((section.offsetHeight - window.innerHeight) / distance - 1.3) < 0.02, 'Pinned scroll should move slower than the track');
    section.scrollIntoView();
    await new Promise((resolve) => setTimeout(resolve, 700));
    next.click();
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const alignment = track.children[1].getBoundingClientRect().left - windowEl.getBoundingClientRect().left;
    console.assert(Math.abs(alignment) < 10, 'Next project should align the next card');
  }
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
