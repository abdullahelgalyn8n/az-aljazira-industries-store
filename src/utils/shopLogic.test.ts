import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../data/catalog';
import {
  DEFAULT_FILTERS,
  filterAndSortProducts,
  findProductByIdentifier,
  calculateCartTotals,
  getRelatedProducts,
} from './shopLogic';

test('catalog contains at least 20 products across all 3 categories', () => {
  assert.ok(PRODUCTS.length >= 20, `Expected >= 20 products, got ${PRODUCTS.length}`);
  const categories = new Set(PRODUCTS.map((p) => p.category));
  assert.equal(categories.has('العجانات الكهربائية'), true);
  assert.equal(categories.has('الأفران الصناعية'), true);
  assert.equal(categories.has('قطع الغيار'), true);
});

test('filterAndSortProducts filters by category and price range accurately', () => {
  const spareParts = filterAndSortProducts(PRODUCTS, {
    ...DEFAULT_FILTERS,
    category: 'قطع الغيار',
  });
  assert.ok(spareParts.length >= 9);
  assert.ok(spareParts.every((p) => p.category === 'قطع الغيار'));

  const budgetParts = filterAndSortProducts(PRODUCTS, {
    ...DEFAULT_FILTERS,
    category: 'قطع الغيار',
    minPrice: 100,
    maxPrice: 500,
    sortBy: 'price-asc',
  });
  assert.ok(budgetParts.length >= 3);
  for (let i = 1; i < budgetParts.length; i++) {
    assert.ok(budgetParts[i].price >= budgetParts[i - 1].price);
  }
});

test('findProductByIdentifier resolves by slug, UUID id, or SKU', () => {
  const bySlug = findProductByIdentifier(PRODUCTS, 'pull-button');
  const byUuid = findProductByIdentifier(
    PRODUCTS,
    'a78459cd-a724-4fe8-a5d6-0f894d00ddf6'
  );
  const bySku = findProductByIdentifier(PRODUCTS, 'jz-sp-400');

  assert.ok(bySlug);
  assert.equal(bySlug?.name, 'زرار سحب (مقبض تعشيق عجانة أصلي)');
  assert.equal(byUuid?.id, bySlug?.id);
  assert.equal(bySku?.id, bySlug?.id);
});

test('calculateCartTotals applies free shipping threshold at 500 EGP', () => {
  const cable = findProductByIdentifier(PRODUCTS, 'heavy-duty-power-cable')!;
  const mixer = findProductByIdentifier(PRODUCTS, 'aljazira-electric-mixer-25kg')!;

  const smallCart = calculateCartTotals([{ product: cable, quantity: 2 }]); // 350 EGP
  assert.equal(smallCart.subtotal, 350);
  assert.equal(smallCart.freeShippingApplied, false);
  assert.equal(smallCart.shipping, 75);
  assert.equal(smallCart.total, 425);

  const freeShippingCart = calculateCartTotals([{ product: mixer, quantity: 1 }]); // 7500 EGP
  assert.equal(freeShippingCart.subtotal, 7500);
  assert.equal(freeShippingCart.freeShippingApplied, true);
  assert.equal(freeShippingCart.shipping, 0);
  assert.equal(freeShippingCart.total, 7500);
});

test('getRelatedProducts returns distinct products prioritizing same category', () => {
  const target = findProductByIdentifier(PRODUCTS, 'pull-button')!;
  const related = getRelatedProducts(PRODUCTS, target, 4);
  assert.equal(related.length, 4);
  assert.ok(related.every((p) => p.id !== target.id));
  assert.ok(related.every((p) => p.category === 'قطع الغيار'));
});
