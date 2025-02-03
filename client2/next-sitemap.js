module.exports = {
    siteUrl: process.env.SITE_URL || 'http://localhost:3000', 
    generateRobotsTxt: true,
    changefreq: 'daily', 
    priority: 0.7, 
    sitemapSize: 5000, 
    transform: async (config, path) => {
      return {
        loc: path, 
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(), 
      };
    },
  };
  