export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * DAOS Cakes - Google Apps Script: Auto Schedule Calendars & Email Confirmations
 * 
 * Features:
 * 1. Schedules "Order Call" event on Calendar 1: Cake Order Call
 * 2. Schedules "Pickup" event on Calendar 2: Cake Order Pickup
 * 3. Emails full event schedule details to the responder (customer)
 * 4. Syncs public cake details (redacted privacy info) to GitHub data.json for website display
 * 
 * Calendar IDs Configured:
 * - Calendar 1 (Cake Order Call): e101fd80b66ac7952e9245881316785a71f56314675841c30e86c43904bb1319@group.calendar.google.com
 * - Calendar 2 (Cake Order Pickup): c563dce8ef185c112f233ff6559286c238f405be578198efb1c63fc69f15b871@group.calendar.google.com
 */

const CONFIG = {
  // Google Calendar IDs
  CALL_CALENDAR_ID: 'e101fd80b66ac7952e9245881316785a71f56314675841c30e86c43904bb1319@group.calendar.google.com',
  PICKUP_CALENDAR_ID: 'c563dce8ef185c112f233ff6559286c238f405be578198efb1c63fc69f15b871@group.calendar.google.com',

  // GitHub Sync (Optional - for public website calendar updates)
  GITHUB_PAT: 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN', // e.g. ghp_xxxxxxxxxxxx
  REPO_OWNER: 'YOUR_GITHUB_USERNAME',            // e.g. daoscakes
  REPO_NAME: 'YOUR_REPOSITORY_NAME',             // e.g. daos-cakes-website
  FILE_PATH: 'public/data.json',                 // Path to data.json
  BRANCH: 'main'
};

/**
 * Run setupAllTriggers() ONCE in Apps Script toolbar to activate all functions on form submit.
 */
function setupAllTriggers() {
  // Clear any existing triggers to prevent duplicate executions
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    const fnName = triggers[i].getHandlerFunction();
    if (fnName === 'onFormSubmit' || fnName === 'setupTrigger') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // Attach Spreadsheet Form Submit trigger to onFormSubmit
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();
    
  Logger.log('✅ Success! Trigger installed for all functions (Calendar 1 Order Call, Calendar 2 Pickup, Confirmation Email, GitHub Sync).');
}

/**
 * Alias function: setupTrigger() calls setupAllTriggers()
 */
function setupTrigger() {
  setupAllTriggers();
}

/**
 * Run testAllFunctions() in toolbar to manually trigger and test all functions on the latest submission row!
 */
function testAllFunctions() {
  Logger.log('🧪 Testing all functions on latest submission...');
  onFormSubmit();
}

/**
 * Triggered automatically every time a customer submits the Google Form.
 */
function onFormSubmit(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) return;

    const headers = data[0].map(h => String(h).trim().toLowerCase());
    const latestRow = data[data.length - 1]; // Latest submission

    // Match column indexes dynamically
    const emailIdx      = headers.findIndex(h => h.includes('email') || h.includes('username'));
    const nameIdx       = headers.findIndex(h => h.includes('name') && !h.includes('event'));
    const phoneIdx      = headers.findIndex(h => h.includes('phone') || h.includes('contact'));
    
    // Call Section
    const callDateIdx   = headers.findIndex(h => h.includes('call date') || (h.includes('call') && h.includes('date')));
    const callTimeIdx   = headers.findIndex(h => h.includes('call time') || (h.includes('call') && h.includes('time')));
    
    // Pickup Section
    const pickupDateIdx = headers.findIndex(h => h.includes('pickup date') || (h.includes('pickup') && h.includes('date')) || h.includes('event date'));
    const pickupTimeIdx = headers.findIndex(h => h.includes('pickup time') || (h.includes('pickup') && h.includes('time')));
    const locationIdx   = headers.findIndex(h => h.includes('location'));

    // Cake Order Info
    const flavorIdx     = headers.findIndex(h => h.includes('flavor') || h.includes('cake type'));
    const designIdx     = headers.findIndex(h => h.includes('design') || h.includes('note') || h.includes('theme') || h.includes('details'));
    const sizeIdx       = headers.findIndex(h => h.includes('size')   || h.includes('servings')  || h.includes('tier'));

    // Extract values from latest response
    const responderEmail = emailIdx !== -1 ? String(latestRow[emailIdx] || '').trim() : '';
    const customerName   = nameIdx  !== -1 ? String(latestRow[nameIdx]  || '').trim() : 'Customer';
    const phone          = phoneIdx !== -1 ? String(latestRow[phoneIdx] || '').trim() : '';
    
    const callDateVal   = callDateIdx   !== -1 ? latestRow[callDateIdx]   : null;
    const callTimeVal   = callTimeIdx   !== -1 ? latestRow[callTimeIdx]   : null;
    
    const pickupDateVal = pickupDateIdx !== -1 ? latestRow[pickupDateIdx] : null;
    const pickupTimeVal = pickupTimeIdx !== -1 ? latestRow[pickupTimeIdx] : null;
    const locationVal   = locationIdx   !== -1 ? String(latestRow[locationIdx] || '').trim() : 'Selected Pickup Location';

    const flavor        = flavorIdx !== -1 ? String(latestRow[flavorIdx] || '').trim() : 'Custom Cake';
    const design        = designIdx !== -1 ? String(latestRow[designIdx] || '').trim() : 'Custom Artisanal Theme';
    const size          = sizeIdx   !== -1 ? String(latestRow[sizeIdx]   || '').trim() : 'Standard Tier';

    // Parse Event Date & Time objects
    const callStartTime   = parseDateTime(callDateVal, callTimeVal);
    const pickupStartTime = parseDateTime(pickupDateVal, pickupTimeVal);

    let callFormattedStr   = 'Not Scheduled';
    let pickupFormattedStr = 'Not Scheduled';

    // 1. Schedule "Order Call" on Calendar 1
    if (callStartTime) {
      callFormattedStr = formatDateForEmail(callStartTime);
      scheduleCalendarEvent(
        CONFIG.CALL_CALENDAR_ID,
        'Order Call - ' + customerName,
        callStartTime,
        30, // 30 minute call duration
        'Order consultation call for DAOS Cakes.\\nCustomer: ' + customerName + '\\nPhone: ' + phone + '\\nEmail: ' + responderEmail + '\\nFlavor: ' + flavor + '\\nSize: ' + size,
        '',
        responderEmail
      );
    }

    // 2. Schedule "Pickup" on Calendar 2
    if (pickupStartTime) {
      pickupFormattedStr = formatDateForEmail(pickupStartTime);
      scheduleCalendarEvent(
        CONFIG.PICKUP_CALENDAR_ID,
        'Pickup - ' + customerName,
        pickupStartTime,
        30, // 30 minute pickup window
        'Cake order pickup.\\nCustomer: ' + customerName + '\\nPhone: ' + phone + '\\nEmail: ' + responderEmail + '\\nFlavor: ' + flavor + '\\nSize: ' + size + '\\nDesign Notes: ' + design,
        locationVal,
        responderEmail
      );
    }

    // 3. Send event schedule confirmation email to responder
    if (responderEmail && responderEmail.includes('@')) {
      sendConfirmationEmail(
        responderEmail,
        customerName,
        callFormattedStr,
        pickupFormattedStr,
        locationVal,
        flavor,
        size
      );
    }

    // 4. Sync public order timeline to GitHub repo data.json for public site display
    syncPublicOrdersToGitHub(data, headers, flavorIdx, designIdx, pickupDateIdx, sizeIdx);

  } catch (err) {
    Logger.log('Error in onFormSubmit: ' + err.toString());
  }
}

/**
 * Creates an event on a Google Calendar ID.
 */
function scheduleCalendarEvent(calendarId, title, startTime, durationMins, description, location, guestEmail) {
  try {
    const cal = CalendarApp.getCalendarById(calendarId);
    if (!cal) {
      Logger.log('Calendar not found for ID: ' + calendarId);
      return;
    }

    const endTime = new Date(startTime.getTime() + durationMins * 60 * 1000);
    const options = {
      description: description,
      location: location || ''
    };

    if (guestEmail && guestEmail.includes('@')) {
      options.guests = guestEmail;
      options.sendInvites = true;
    }

    cal.createEvent(title, startTime, endTime, options);
    Logger.log('Successfully scheduled event: ' + title + ' at ' + startTime);
  } catch (err) {
    Logger.log('Error creating calendar event: ' + err.toString());
  }
}

/**
 * Emails the responder with their full event schedules & pickup details.
 */
function sendConfirmationEmail(email, name, callSchedule, pickupSchedule, location, flavor, size) {
  try {
    const subject = '🎂 DAOS Cakes - Order Call & Pickup Schedule Confirmation';
    const body = 
      'Hi ' + (name || 'Valued Customer') + ',\\n\\n' +
      'Thank you for submitting your cake order with DAOS Cakes!\\n' +
      'We have received your submission and scheduled your events as requested:\\n\\n' +
      '--------------------------------------------------\\n' +
      '📞 ORDER CALL SCHEDULE:\\n' +
      '   Date & Time: ' + callSchedule + '\\n\\n' +
      '🍰 CAKE PICKUP SCHEDULE:\\n' +
      '   Date & Time: ' + pickupSchedule + '\\n' +
      '   Location: ' + (location || 'Selected Location') + '\\n' +
      '--------------------------------------------------\\n\\n' +
      'ORDER SUMMARY:\\n' +
      '- Cake Flavor: ' + flavor + '\\n' +
      '- Cake Size: ' + size + '\\n\\n' +
      '📍 PICKUP LOCATIONS & ADDRESSES:\\n' +
      '1. Children\'s Healthcare of Atlanta Park: 755 Battery Ave SE, Atlanta, GA 30339\\n' +
      '2. BP Gas Station: 2535 Cobb Pkwy SE, Smyrna, GA 30080\\n' +
      '3. Public Storage: 2490 Herodian Way, Smyrna, GA 30080\\n\\n' +
      '📞 CALL US TO VERIFY YOUR ORDER:\\n' +
      '   Phone: (470) 476-1631 or (678) 235-8462\\n\\n' +
      '💳 PAYMENT METHODS:\\n' +
      '   CashApp, PayPal, Venmo, Zelle\\n\\n' +
      'We look forward to speaking with you and making your cake!\\n\\n' +
      'Warm regards,\\n' +
      'DAOS Cakes Team';

    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: body
    });
    Logger.log('Confirmation email successfully sent to ' + email);
  } catch (err) {
    Logger.log('Error sending confirmation email: ' + err.toString());
  }
}

/**
 * Parses date & time input into a JavaScript Date object.
 */
function parseDateTime(dateVal, timeVal) {
  if (!dateVal) return null;

  let year, month, day;
  if (dateVal instanceof Date) {
    year = dateVal.getFullYear();
    month = dateVal.getMonth();
    day = dateVal.getDate();
  } else {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return null;
    year = d.getFullYear();
    month = d.getMonth();
    day = d.getDate();
  }

  let hours = 10;
  let minutes = 0;

  if (timeVal) {
    if (timeVal instanceof Date) {
      hours = timeVal.getHours();
      minutes = timeVal.getMinutes();
    } else {
      const timeStr = String(timeVal).trim();
      const match12 = timeStr.match(/(\\d{1,2}):(\\d{2})\\s*(AM|PM|am|pm)?/i);
      if (match12) {
        let h = parseInt(match12[1], 10);
        const m = parseInt(match12[2], 10);
        const ampm = match12[3];
        if (ampm) {
          if (ampm.toUpperCase() === 'PM' && h < 12) h += 12;
          if (ampm.toUpperCase() === 'AM' && h === 12) h = 0;
        }
        hours = h;
        minutes = m;
      }
    }
  }

  return new Date(year, month, day, hours, minutes, 0);
}

function formatDateForEmail(d) {
  if (!d || isNaN(d.getTime())) return 'Not Scheduled';
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  return d.toLocaleString('en-US', options);
}

function syncPublicOrdersToGitHub(data, headers, flavorIdx, designIdx, dateIdx, sizeIdx) {
  if (!CONFIG.GITHUB_PAT || CONFIG.GITHUB_PAT.includes('YOUR_GITHUB')) return;

  const publicOrders = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const rawDate = dateIdx !== -1 ? row[dateIdx] : null;
    let formattedDate = '';
    if (rawDate) {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        formattedDate = yyyy + '-' + mm + '-' + dd;
      } else {
        formattedDate = String(rawDate).trim();
      }
    }

    if (!formattedDate) continue;

    const flavor = flavorIdx !== -1 ? String(row[flavorIdx] || '').trim() : 'Custom Flavor';
    const design = designIdx !== -1 ? String(row[designIdx] || '').trim() : 'Custom Design';
    const size   = sizeIdx   !== -1 ? String(row[sizeIdx]   || '').trim() : 'Standard';

    publicOrders.push({
      id: 'CAKE-' + String(1000 + i),
      flavor: flavor || 'Custom Flavor',
      design: design || 'Custom Design',
      size: size || 'Standard',
      pickupDate: formattedDate,
      status: 'Scheduled'
    });
  }

  publicOrders.sort((a, b) => new Date(a.pickupDate).getTime() - new Date(b.pickupDate).getTime());

  const url = 'https://api.github.com/repos/' + CONFIG.REPO_OWNER + '/' + CONFIG.REPO_NAME + '/contents/' + CONFIG.FILE_PATH;
  const jsonContent = JSON.stringify(publicOrders, null, 2);
  const encodedContent = Utilities.base64Encode(jsonContent, Utilities.Charset.UTF_8);

  let sha = null;
  const getResponse = UrlFetchApp.fetch(url, {
    method: 'get',
    headers: {
      'Authorization': 'token ' + CONFIG.GITHUB_PAT,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'GoogleAppsScript'
    },
    muteHttpExceptions: true
  });

  if (getResponse.getResponseCode() === 200) {
    sha = JSON.parse(getResponse.getContentText()).sha;
  }

  const payload = {
    message: 'Automated update: Public cake orders synced',
    content: encodedContent,
    branch: CONFIG.BRANCH
  };
  if (sha) payload.sha = sha;

  UrlFetchApp.fetch(url, {
    method: 'put',
    headers: {
      'Authorization': 'token ' + CONFIG.GITHUB_PAT,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'GoogleAppsScript'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}
`;

export const SETUP_INSTRUCTIONS = [
  {
    step: 1,
    title: 'Open Google Apps Script from your Google Sheet',
    details: 'In the Google Sheet connected to your Google Form, click Extensions > Apps Script in the top menu.'
  },
  {
    step: 2,
    title: 'Paste the Automation Script',
    details: 'Clear Code.gs and paste the provided Google Apps Script code. It already includes your two Google Calendar IDs!'
  },
  {
    step: 3,
    title: 'Run setupAllTriggers() ONCE',
    details: 'Select setupAllTriggers (or setupTrigger) from the function dropdown at the top of the Google Apps Script editor and click Run. Grant permissions for Google Calendar, Gmail, and Spreadsheet when prompted. This activates all functions automatically on form submit!'
  },
  {
    step: 4,
    title: 'Test Form Submission',
    details: 'Submit a test response on your Google Form. The script will create "Order Call" on Calendar 1, "Pickup" on Calendar 2, and email the responder automatically!'
  }
];

