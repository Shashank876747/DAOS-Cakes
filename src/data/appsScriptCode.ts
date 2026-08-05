export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * DAOS Cakes - Google Apps Script: On Form Submit -> GitHub data.json Sync
 * 
 * Purpose:
 * Automatically triggers when a customer submits a Google Form.
 * Reads the response from your private Google Sheet, redacts sensitive customer
 * info (phones, emails, names), and securely pushes only public cake details 
 * (Flavor, Design, Pickup Date, Size) to your GitHub repo's data.json file.
 * 
 * Setup Steps:
 * 1. Open your private Google Sheet connected to your Google Form.
 * 2. Click Extensions > Apps Script.
 * 3. Delete existing placeholder code and paste this entire script.
 * 4. Update CONFIG values (GITHUB_PAT, REPO_OWNER, REPO_NAME, FILE_PATH).
 * 5. Run 'setupTrigger()' once from the toolbar to activate the trigger!
 */

const CONFIG = {
  GITHUB_PAT: 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN', // GitHub token with repo/contents permissions
  REPO_OWNER: 'YOUR_GITHUB_USERNAME',            // e.g. "daoscakes"
  REPO_NAME: 'YOUR_REPOSITORY_NAME',             // e.g. "daos-cakes-website"
  FILE_PATH: 'public/data.json',                 // Path to data.json in repo (or "data.json")
  BRANCH: 'main'                                 // Target branch
};

/**
 * Run this function ONCE manually in Apps Script editor to create the On Form Submit trigger.
 */
function setupTrigger() {
  // Remove existing triggers to avoid duplicates
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'onFormSubmit') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  
  // Create trigger attached to spreadsheet form submissions
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();
    
  Logger.log('Trigger successfully created for onFormSubmit!');
}

/**
 * Triggered automatically every time a customer submits the Google Form.
 */
function onFormSubmit(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) return; // Only headers present

    const headers = data[0].map(h => String(h).trim().toLowerCase());

    // Dynamically match column headers
    const flavorIdx = headers.findIndex(h => h.includes('flavor') || h.includes('cake type'));
    const designIdx = headers.findIndex(h => h.includes('design') || h.includes('note') || h.includes('theme') || h.includes('details'));
    const dateIdx   = headers.findIndex(h => h.includes('date')   || h.includes('pickup')    || h.includes('event'));
    const sizeIdx   = headers.findIndex(h => h.includes('size')   || h.includes('servings')  || h.includes('tier'));

    // Extract ONLY non-sensitive public details from sheet rows
    const publicOrders = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Parse pickup date safely (YYYY-MM-DD)
      const rawDate = dateIdx !== -1 ? row[dateIdx] : null;
      let formattedDate = '';
      if (rawDate) {
        const d = new Date(rawDate);
        if (!isNaN(d.getTime())) {
          // Format as YYYY-MM-DD
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          formattedDate = \`\${yyyy}-\${mm}-\${dd}\`;
        } else {
          formattedDate = String(rawDate).trim();
        }
      }

      const flavor = flavorIdx !== -1 ? String(row[flavorIdx] || '').trim() : 'Custom Baker Choice';
      const design = designIdx !== -1 ? String(row[designIdx] || '').trim() : 'Custom Celebration Theme';
      const size   = sizeIdx !== -1   ? String(row[sizeIdx] || '').trim()   : 'Standard Tier';

      // Skip empty date rows
      if (!formattedDate) continue;

      // Note: Phone numbers, emails, customer names, and addresses are intentionally EXCLUDED here for privacy!
      publicOrders.push({
        id: 'CAKE-' + String(1000 + i),
        flavor: flavor || 'Custom Flavor',
        design: design || 'Custom Design',
        size: size || 'Standard',
        pickupDate: formattedDate,
        status: 'Scheduled'
      });
    }

    // Sort upcoming orders by pickup date (ascending)
    publicOrders.sort((a, b) => new Date(a.pickupDate).getTime() - new Date(b.pickupDate).getTime());

    // Push the clean public array to GitHub repo data.json
    pushToGitHub(publicOrders);

  } catch (error) {
    Logger.log('Error in onFormSubmit: ' + error.toString());
  }
}

/**
 * Helper to update or create data.json in GitHub repository using GitHub REST API.
 */
function pushToGitHub(ordersArray) {
  const url = \`https://api.github.com/repos/\${CONFIG.REPO_OWNER}/\${CONFIG.REPO_NAME}/contents/\${CONFIG.FILE_PATH}\`;
  const jsonContent = JSON.stringify(ordersArray, null, 2);
  const encodedContent = Utilities.base64Encode(jsonContent, Utilities.Charset.UTF_8);

  // Check if file already exists to get current commit SHA
  let sha = null;
  const getOptions = {
    method: 'get',
    headers: {
      'Authorization': 'token ' + CONFIG.GITHUB_PAT,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'GoogleAppsScript'
    },
    muteHttpExceptions: true
  };

  const getResponse = UrlFetchApp.fetch(url, getOptions);
  if (getResponse.getResponseCode() === 200) {
    const fileInfo = JSON.parse(getResponse.getContentText());
    sha = fileInfo.sha;
  }

  // Construct GitHub API payload
  const payload = {
    message: 'Automated update: Public cake orders synced from Google Form submission',
    content: encodedContent,
    branch: CONFIG.BRANCH
  };

  if (sha) {
    payload.sha = sha;
  }

  const putOptions = {
    method: 'put',
    headers: {
      'Authorization': 'token ' + CONFIG.GITHUB_PAT,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'GoogleAppsScript'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const putResponse = UrlFetchApp.fetch(url, putOptions);
  const statusCode = putResponse.getResponseCode();

  if (statusCode === 200 || statusCode === 201) {
    Logger.log('Successfully updated data.json in GitHub repo!');
  } else {
    Logger.log('GitHub API Error (' + statusCode + '): ' + putResponse.getContentText());
  }
}
`;

export const SETUP_INSTRUCTIONS = [
  {
    step: 1,
    title: 'Open Google Apps Script from your Private Google Sheet',
    details: 'In your Google Sheet (where responses from your public Google Form arrive), click Extensions > Apps Script in the top menu bar.'
  },
  {
    step: 2,
    title: 'Paste the Script Code',
    details: 'Delete any existing code in Code.gs and paste the provided Google Apps Script code.'
  },
  {
    step: 3,
    title: 'Set GitHub Configuration Variables',
    details: 'Replace YOUR_GITHUB_PERSONAL_ACCESS_TOKEN with your GitHub PAT (repo scope), YOUR_GITHUB_USERNAME with your GitHub account, and YOUR_REPOSITORY_NAME with your website repo.'
  },
  {
    step: 4,
    title: 'Run setupTrigger() ONCE',
    details: 'Select setupTrigger from the function dropdown at the top of Apps Script editor and click Run. Grant permissions when prompted. This activates automatic execution whenever a form is submitted!'
  }
];
