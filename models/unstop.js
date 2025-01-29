const puppeteer = require('puppeteer');

// Function to scrape Unstop jobs for a specific skill
const fetchUnstopJobs = async (skill) => {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(`https://unstop.com/jobs?keywords=${skill}`);
  
      // Wait for the first page to load
      await page.waitForSelector('div.job-listing', { timeout: 60000 });
  
      let jobs = [];
      let nextPageExists = true;
  
      while (nextPageExists) {
        const pageJobs = await page.evaluate(() => {
          const jobList = [];
          const jobElements = document.querySelectorAll('div.job-listing');
  
          jobElements.forEach((jobElement) => {
            const title = jobElement.querySelector('h4') ? jobElement.querySelector('h4').textContent : '';
            const company = jobElement.querySelector('.job-company') ? jobElement.querySelector('.job-company').textContent : '';
            const location = jobElement.querySelector('.job-location') ? jobElement.querySelector('.job-location').textContent : '';
            const link = jobElement.querySelector('a') ? jobElement.querySelector('a').getAttribute('href') : '';
  
            jobList.push({
              title: title,
              company: company,
              location: location,
              link: link ? `https://unstop.com${link}` : '',
            });
          });
  
          return jobList;
        });
  
        jobs = [...jobs, ...pageJobs];
  
        // Check if there's a next page
        const nextPageButton = await page.$('a.next'); // Adjust the selector for the next page button
        if (nextPageButton) {
          // Click next page and wait for the new page to load
          await nextPageButton.click();
          await page.waitForSelector('div.job-listing', { timeout: 60000 });
        } else {
          nextPageExists = false; // No next page, exit the loop
        }
      }
  
      await browser.close();
      return jobs;
    } catch (error) {
      console.error('Error fetching Unstop jobs:', error);
      return [];
    }
  };
  

module.exports = fetchUnstopJobs;
