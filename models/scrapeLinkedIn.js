const axios = require('axios');
const cheerio = require('cheerio');

// Function to scrape LinkedIn jobs for a specific skill
const scrapeLinkedInJobs = async (skill) => {
  try {
    const response = await axios.get(`https://www.linkedin.com/jobs/search/?keywords=${skill}`);
    const $ = cheerio.load(response.data);
    const jobs = [];

    // Debugging: Log the full HTML content
    console.log('Page HTML:', $.html());

    $('ul.jobs-search__results-list li').each((i, element) => {
      // Safely fetch values with fallbacks
      const jobTitle = $(element).find('.job-result-card__title').text().trim() || 'No Title';
      const company = $(element).find('.job-result-card__subtitle').text().trim() || 'No Company';
      const location = $(element).find('.job-result-card__location').text().trim() || 'No Location';
      const link = $(element).find('.job-result-card__link').attr('href') || '';

      // Correct undefined links
      const fullLink = link.startsWith('https://') ? link : `https://www.linkedin.com${link}`;

      jobs.push({
        title: jobTitle,
        company: company,
        location: location,
        link: fullLink,
      });
    });

    console.log('Scraped Jobs:', jobs); // Log jobs to verify data
    return jobs;
  } catch (error) {
    console.error('Error scraping LinkedIn:', error);
    return [];
  }
};

module.exports = scrapeLinkedInJobs;
