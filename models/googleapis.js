const { google } = require('googleapis');

const fetchGoogleJobs = async (skill) => {
  const customSearch = google.customsearch('v1');
  const res = await customSearch.cse.list({
    cx: '4549f16c15de74a8c', // Custom Search Engine ID
    q: `${skill} job`,
    auth: 'AIzaSyBo0UdcqG2PJGoPQRa7s4Iv_PPRk5sojpI',
  });

  const jobs = res.data.items.map(item => ({
    title: item.title,
    link: item.link,
    snippet: item.snippet,
  }));

  return jobs;
};

module.exports = fetchGoogleJobs;
