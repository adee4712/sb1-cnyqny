import { generateAffiliateLinks } from './affiliateService.js';

export const searchProducts = async (query) => {
  try {
    const affiliateLinks = generateAffiliateLinks(query);
    
    // Simulate API response with mock data
    const results = [
      {
        id: 1,
        title: `${query} - Premium Edition`,
        price: 199.99,
        platform: 'Amazon',
        affiliateLink: affiliateLinks.amazon.url
      },
      {
        id: 2,
        title: `${query} - Standard Version`,
        price: 149.99,
        platform: 'eBay',
        affiliateLink: affiliateLinks.ebay.url
      },
      {
        id: 3,
        title: `${query} - Basic Model`,
        price: 99.99,
        platform: 'Walmart',
        affiliateLink: affiliateLinks.walmart.url
      }
    ].sort((a, b) => a.price - b.price);

    return { results };
  } catch (error) {
    console.error('Search service error:', error);
    throw new Error('Failed to search products');
  }
};