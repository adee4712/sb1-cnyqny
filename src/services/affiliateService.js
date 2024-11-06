export const generateAffiliateLinks = (searchTerm) => {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  
  return {
    amazon: {
      url: `https://www.amazon.com/s?k=${encodedSearchTerm}&tag=dillustration-20`
    },
    ebay: {
      url: `https://www.ebay.com/sch/i.html?_nkw=${encodedSearchTerm}&campid=YOUR_EBAY_CAMPAIGN_ID`
    },
    walmart: {
      url: `https://www.walmart.com/search?q=${encodedSearchTerm}&affid=YOUR_WALMART_AFFILIATE_ID`
    }
  };
};