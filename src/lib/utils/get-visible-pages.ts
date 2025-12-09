/**
 * Generates a strict fixed-length pagination array with ellipses if needed.
 *
 * The total returned array length is always <= maxSlots.
 * First and last pages are always included.
 * Ellipses (`'ellipsis'`) count as slots.
 * Ellipses are only used if there are at least 2 pages skipped.
 *
 * Example with maxSlots = 6:
 * - currentPage = 1, lastPage = 10 → [1, 2, 3, 'ellipsis', 10]
 * - currentPage = 5, lastPage = 10 → [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]
 * - currentPage = 10, lastPage = 10 → [1, 'ellipsis', 8, 9, 10]
 *
 * @param currentPage Current active page (1-based)
 * @param lastPage Total number of pages
 * @param maxSlots Maximum number of visible slots including first, last, and ellipses
 */
export function getVisiblePages(
  currentPage: number,
  lastPage: number,
  maxSlots: number
): (number | 'ellipsis')[] {
  if (maxSlots < 5) throw new Error('maxSlots must be at least 5');
  if (currentPage < 1) currentPage = 1;
  if (currentPage > lastPage) currentPage = lastPage;

  // If all pages fit, no ellipses needed
  if (lastPage <= maxSlots) {
    return Array.from({ length: lastPage }, (_, i) => i + 1);
  }

  const first = 1;
  const last = lastPage;

  // Try largest possible middle window and shrink until result fits maxSlots
  // middleWindow is the count of numeric page slots between first and last
  for (let middleWindow = maxSlots - 2; middleWindow >= 1; middleWindow--) {
    const half = Math.floor(middleWindow / 2);

    let start = currentPage - half;
    let end = start + middleWindow - 1;

    // Clamp to valid numeric page range (2 .. last-1)
    if (start < 2) {
      start = 2;
      end = start + middleWindow - 1;
    }
    if (end > last - 1) {
      end = last - 1;
      start = end - middleWindow + 1;
      if (start < 2) start = 2;
    }

    const pages: (number | 'ellipsis')[] = [];
    pages.push(first);

    // Left gap between first and start
    const leftGap = start - first - 1; // number of pages between first and start
    if (leftGap === 1) {
      // exactly one page skipped -> show it
      pages.push(first + 1);
    } else if (leftGap > 1) {
      pages.push('ellipsis');
    }
    // Middle numeric pages
    for (let p = start; p <= end; p++) pages.push(p);

    // Right gap between end and last
    const rightGap = last - end - 1; // number of pages between end and last
    if (rightGap === 1) {
      pages.push(last - 1);
    } else if (rightGap > 1) {
      pages.push('ellipsis');
    }

    pages.push(last);

    if (pages.length <= maxSlots) {
      return pages;
    }
    // otherwise shrink middleWindow and retry
  }

  // Fallback (shouldn't normally happen): minimal pagination [1, 'ellipsis', last]
  return [1, 'ellipsis', last];
}
