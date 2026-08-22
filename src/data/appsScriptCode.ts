export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * DAOS Cakes - Google Apps Script: Auto Schedule Calendars & Rich Event Confirmation Email
 * 
 * Features:
 * 1. Automatically extracts customer submission from Google Form / Google Sheet
 * 2. Schedules "Order Call" event on Calendar 1 (Cake Order Call)
 * 3. Schedules "Pickup" event on Calendar 2 (Cake Order Pickup)
 * 4. Sends a rich HTML confirmation email to the customer's email containing:
 *    - Official Google Calendar Event Card (Date/Time, Title, Location, Add to Calendar & Directions buttons)
 *    - Full order summary, cake flavor, size, customization, and verification phone numbers
 * 5. Syncs public cake details (redacted privacy info) to GitHub data.json for website display
 * 
 * Configured Calendar IDs:
 * - Calendar 1 (Order Call):   e101fd80b66ac7952e9245881316785a71f56314675841c30e86c43904bb1319@group.calendar.google.com
 * - Calendar 2 (Cake Pickup):  c563dce8ef185c112f233ff6559286c238f405be578198efb1c63fc69f15b871@group.calendar.google.com
 */

const CONFIG = {
  // Google Calendar IDs
  CALL_CALENDAR_ID: 'e101fd80b66ac7952e9245881316785a71f56314675841c30e86c43904bb1319@group.calendar.google.com',
  PICKUP_CALENDAR_ID: 'c563dce8ef185c112f233ff6559286c238f405be578198efb1c63fc69f15b871@group.calendar.google.com',

  // Bakery Details
  BAKERY_NAME: 'DAOS Cakes',
  PHONE_1: '(470) 676-1631',
  PHONE_2: '(678) 235-0482',
  PHONE_1_RAW: '4706761631',
  PHONE_2_RAW: '6782350482',
  WEBSITE_URL: 'https://daoscakes.pages.dev',

  // Pickup Location Addresses
  LOCATIONS: {
    '1': {
      name: "Truist Park (Children's Healthcare of Atlanta Park)",
      address: "755 Battery Ave SE, Atlanta, GA 30339"
    },
    '2': {
      name: "BP Gas Station (Cobb Pkwy & Herodian Way)",
      address: "2535 Cobb Pkwy SE, Smyrna, GA 30080"
    },
    '3': {
      name: "Public Storage (Herodian Way)",
      address: "2460 Herodian Way, Smyrna, GA 30080"
    }
  },

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
    
  Logger.log('✅ Success! Trigger installed for all functions (Calendar 1 Order Call, Calendar 2 Pickup, Rich Confirmation Email, GitHub Sync).');
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
    const icingIdx      = headers.findIndex(h => h.includes('icing')  || h.includes('frosting'));
    const occasionIdx   = headers.findIndex(h => h.includes('occasion') || h.includes('event type'));
    const colorsIdx     = headers.findIndex(h => h.includes('color'));
    const wordsIdx      = headers.findIndex(h => h.includes('word') || h.includes('inscription') || h.includes('writing') || h.includes('message'));

    // Extract values from latest response
    const responderEmail = emailIdx !== -1 ? String(latestRow[emailIdx] || '').trim() : '';
    const customerName   = nameIdx  !== -1 ? String(latestRow[nameIdx]  || '').trim() : 'Valued Customer';
    const phone          = phoneIdx !== -1 ? String(latestRow[phoneIdx] || '').trim() : '';
    
    const callDateVal   = callDateIdx   !== -1 ? latestRow[callDateIdx]   : null;
    const callTimeVal   = callTimeIdx   !== -1 ? latestRow[callTimeIdx]   : null;
    
    const pickupDateVal = pickupDateIdx !== -1 ? latestRow[pickupDateIdx] : null;
    const pickupTimeVal = pickupTimeIdx !== -1 ? latestRow[pickupTimeIdx] : null;
    const locationRaw   = locationIdx   !== -1 ? String(latestRow[locationIdx] || '').trim() : 'Truist Park';

    const flavor        = flavorIdx !== -1 ? String(latestRow[flavorIdx] || '').trim() : 'Custom Cake';
    const design        = designIdx !== -1 ? String(latestRow[designIdx] || '').trim() : 'Custom Artisanal Design';
    const size          = sizeIdx   !== -1 ? String(latestRow[sizeIdx]   || '').trim() : 'Standard 8 INCH';
    const icing         = icingIdx  !== -1 ? String(latestRow[icingIdx]  || '').trim() : 'American Buttercream';
    const occasion      = occasionIdx !== -1 ? String(latestRow[occasionIdx] || '').trim() : 'Celebration';
    const colors        = colorsIdx !== -1 ? String(latestRow[colorsIdx] || '').trim() : 'Custom Palette';
    const wordsOnCake   = wordsIdx  !== -1 ? String(latestRow[wordsIdx]  || '').trim() : 'Happy Celebration!';

    // Resolve location address
    const locationInfo  = resolveLocationInfo(locationRaw);

    // Parse Event Date & Time objects
    const callStartTime   = parseDateTime(callDateVal, callTimeVal, 11, 0);
    const pickupStartTime = parseDateTime(pickupDateVal, pickupTimeVal, 14, 0);

    // 1. Schedule "Order Call" on Calendar 1 (Cake Order Call)
    if (callStartTime) {
      scheduleCalendarEvent(
        CONFIG.CALL_CALENDAR_ID,
        'DAOS Cakes - Order Call (' + customerName + ')',
        callStartTime,
        30, // 30 minute consultation window
        'Cake Consultation Call with DAOS Cakes\\n\\n' +
        'Customer: ' + customerName + '\\n' +
        'Phone: ' + phone + '\\n' +
        'Email: ' + responderEmail + '\\n' +
        'Flavor: ' + flavor + '\\n' +
        'Size: ' + size + '\\n' +
        'Occasion: ' + occasion + '\\n' +
        'Colors: ' + colors + '\\n' +
        'Inscription: ' + wordsOnCake,
        'Phone Call: ' + phone,
        responderEmail
      );
    }

    // 2. Schedule "Pickup" on Calendar 2 (Cake Order Pickup)
    if (pickupStartTime) {
      scheduleCalendarEvent(
        CONFIG.PICKUP_CALENDAR_ID,
        'DAOS Cakes - Cake Pickup (' + customerName + ')',
        pickupStartTime,
        45, // 45 minute pickup window
        'Cake Pickup for ' + customerName + '\\n\\n' +
        'Location: ' + locationInfo.name + ' - ' + locationInfo.address + '\\n' +
        'Cake: ' + size + ' (' + flavor + ', ' + icing + ')\\n' +
        'Design Notes: ' + design + '\\n' +
        'Inscription: ' + wordsOnCake + '\\n' +
        'Payment: Cash on Pickup\\n\\n' +
        'Bakery Contact: ' + CONFIG.PHONE_1 + ' or ' + CONFIG.PHONE_2,
        locationInfo.address,
        responderEmail
      );
    }

    // 3. Send Rich Google Calendar Style Confirmation Email to Responder
    if (responderEmail && responderEmail.includes('@')) {
      sendRichEventConfirmationEmail({
        email: responderEmail,
        name: customerName,
        phone: phone,
        callStartTime: callStartTime,
        pickupStartTime: pickupStartTime,
        locationInfo: locationInfo,
        flavor: flavor,
        size: size,
        icing: icing,
        occasion: occasion,
        colors: colors,
        wordsOnCake: wordsOnCake,
        designNotes: design
      });
    }

    // 4. Sync public order timeline to GitHub repo data.json for website display
    syncPublicOrdersToGitHub(data, headers, flavorIdx, designIdx, pickupDateIdx, sizeIdx);

  } catch (err) {
    Logger.log('Error in onFormSubmit: ' + err.toString());
  }
}

/**
 * Creates an event on a Google Calendar ID with invitations.
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
 * Resolves location strings into structured name and street address.
 */
function resolveLocationInfo(rawLoc) {
  const str = String(rawLoc || '').toLowerCase();
  if (str.includes('truist') || str.includes('children') || str.includes('battery') || str.includes('1')) {
    return CONFIG.LOCATIONS['1'];
  } else if (str.includes('bp') || str.includes('cobb') || str.includes('gas') || str.includes('2')) {
    return CONFIG.LOCATIONS['2'];
  } else if (str.includes('storage') || str.includes('herodian') || str.includes('3')) {
    return CONFIG.LOCATIONS['3'];
  }
  return {
    name: rawLoc || 'Selected Pickup Location',
    address: '755 Battery Ave SE, Atlanta, GA 30339'
  };
}

/**
 * Sends a high-contrast, modern HTML email featuring the Google Calendar Event Preview Card.
 */
function sendRichEventConfirmationEmail(order) {
  try {
    const subject = '🎂 DAOS Cakes - Event Schedule & Order Confirmation (' + order.name + ')';

    // Format Dates for display
    const callDateLine   = order.callStartTime   ? formatEventDateRange(order.callStartTime, 30)   : 'Date Pending';
    const pickupDateLine = order.pickupStartTime ? formatEventDateRange(order.pickupStartTime, 45) : 'Date Pending';

    // Create 1-click Google Calendar & Google Maps URLs
    const callCalLink = order.callStartTime ? buildGoogleCalendarUrl(
      'DAOS Cakes - Order Consultation Call',
      order.callStartTime,
      30,
      'Consultation call for custom cake order with DAOS Cakes.\\nCustomer: ' + order.name + '\\nBakery Phone: ' + CONFIG.PHONE_1 + '\\nFlavor: ' + order.flavor,
      'Phone Call'
    ) : '#';

    const pickupCalLink = order.pickupStartTime ? buildGoogleCalendarUrl(
      'DAOS Cakes - Cake Pickup (' + order.flavor + ')',
      order.pickupStartTime,
      45,
      'Cake order pickup at ' + order.locationInfo.name + '.\\nAddress: ' + order.locationInfo.address + '\\nPayment: Cash on pickup.\\nBakery Phone: ' + CONFIG.PHONE_1,
      order.locationInfo.address
    ) : '#';

    const pickupMapsLink = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(order.locationInfo.address);

    // HTML Email template with Google Calendar Event Card design
    const htmlBody = \`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DAOS Cakes Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f1f1f; line-height: 1.5;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f6; padding: 24px 12px;">
    <tr>
      <td align="center">
        
        <!-- Main Email Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e5e7eb;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #1c1917; padding: 28px 24px; text-align: center;">
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 26px; color: #fef3c7; font-weight: bold; letter-spacing: 0.5px;">
                DAOS Cakes
              </h1>
              <p style="margin: 6px 0 0 0; color: #d6d3d1; font-size: 13px;">
                Custom Handcrafted Cakes & Artisanal Baking
              </p>
            </td>
          </tr>

          <!-- Intro Message -->
          <tr>
            <td style="padding: 24px 24px 12px 24px;">
              <h2 style="margin: 0 0 8px 0; font-size: 20px; color: #1c1917; font-weight: 700;">
                Thank you for your order, \${escapeHtml(order.name)}!
              </h2>
              <p style="margin: 0; font-size: 14px; color: #52525b; line-height: 1.6;">
                We have received your custom cake order submission and scheduled your upcoming events. You can view the details and add them directly to your calendar below:
              </p>
            </td>
          </tr>

          <!-- ======================================================== -->
          <!-- EVENT 1: CAKE PICKUP EVENT CARD (GOOGLE CALENDAR STYLE) -->
          <!-- ======================================================== -->
          <tr>
            <td style="padding: 12px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f0f4f9; border: 1px solid #d3e3fd; border-radius: 18px; padding: 20px; box-sizing: border-box;">
                
                <!-- Date/Time & Calendar Icon Row -->
                <tr>
                  <td valign="top" style="padding-bottom: 8px;">
                    <div style="font-size: 12px; font-weight: 700; color: #041e49; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
                      \${pickupDateLine}
                    </div>
                    <div style="font-size: 19px; font-weight: 800; color: #041e49; line-height: 1.3;">
                      DAOS Cakes - Cake Pickup
                    </div>
                  </td>
                  <td width="48" align="right" valign="top">
                    <!-- Google Calendar Badge Icon -->
                    <table cellpadding="0" cellspacing="0" border="0" style="width: 42px; height: 42px; background-color: #ffffff; border-radius: 10px; border: 1px solid #c2e7ff; text-align: center;">
                      <tr>
                        <td align="center" valign="middle">
                          <img src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_27_2x.png" width="32" height="32" alt="Google Calendar" style="display: block; border: 0;" />
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Location Line -->
                <tr>
                  <td colspan="2" style="padding: 6px 0 14px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td valign="middle" style="padding-right: 8px; font-size: 16px;">📍</td>
                        <td valign="middle" style="font-size: 13px; color: #444746; font-weight: 500;">
                          <strong>\${escapeHtml(order.locationInfo.name)}</strong><br />
                          \${escapeHtml(order.locationInfo.address)}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Action Buttons: Add to Calendar & Directions -->
                <tr>
                  <td colspan="2" style="padding-top: 6px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right: 10px;">
                          <a href="\${pickupCalLink}" target="_blank" style="display: inline-block; background-color: #00639b; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 700; padding: 9px 20px; border-radius: 24px; text-align: center;">
                            Add to Calendar
                          </a>
                        </td>
                        <td>
                          <a href="\${pickupMapsLink}" target="_blank" style="display: inline-block; background-color: #c2e7ff; color: #001d35; text-decoration: none; font-size: 13px; font-weight: 700; padding: 9px 20px; border-radius: 24px; text-align: center;">
                            Directions
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- ======================================================== -->
          <!-- EVENT 2: ORDER CONSULTATION CALL (GOOGLE CALENDAR STYLE) -->
          <!-- ======================================================== -->
          <tr>
            <td style="padding: 8px 24px 16px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 18px; padding: 20px; box-sizing: border-box;">
                
                <!-- Date/Time & Icon -->
                <tr>
                  <td valign="top" style="padding-bottom: 8px;">
                    <div style="font-size: 12px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
                      \${callDateLine}
                    </div>
                    <div style="font-size: 18px; font-weight: 800; color: #0f172a; line-height: 1.3;">
                      DAOS Cakes - Order Consultation Call
                    </div>
                  </td>
                  <td width="48" align="right" valign="top">
                    <span style="font-size: 26px;">📞</span>
                  </td>
                </tr>

                <!-- Call Details -->
                <tr>
                  <td colspan="2" style="padding: 4px 0 14px 0;">
                    <div style="font-size: 13px; color: #475569;">
                      Our bakers will call you at <strong>\${escapeHtml(order.phone || 'your phone number')}</strong> to finalize design details and answer any questions.
                    </div>
                  </td>
                </tr>

                <!-- Action Button: Add to Calendar -->
                <tr>
                  <td colspan="2">
                    <a href="\${callCalLink}" target="_blank" style="display: inline-block; background-color: #334155; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 700; padding: 9px 20px; border-radius: 24px; text-align: center;">
                      Add Call to Calendar
                    </a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- ======================================================== -->
          <!-- ORDER SPECIFICATIONS SUMMARY -->
          <!-- ======================================================== -->
          <tr>
            <td style="padding: 8px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fafaf9; border: 1px solid #e7e5e4; border-radius: 16px; padding: 20px;">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 1px solid #e7e5e4;">
                    <h3 style="margin: 0; font-family: Georgia, serif; font-size: 16px; color: #1c1917; font-weight: bold;">
                      🎂 Cake Order Summary
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 14px;">
                    <table width="100%" cellpadding="4" cellspacing="0" border="0" style="font-size: 13px; color: #292524;">
                      <tr>
                        <td width="35%" style="color: #78716c; font-weight: 500;">Cake Flavor:</td>
                        <td style="font-weight: 700;">\${escapeHtml(order.flavor)}</td>
                      </tr>
                      <tr>
                        <td style="color: #78716c; font-weight: 500;">Size / Servings:</td>
                        <td style="font-weight: 700;">\${escapeHtml(order.size)}</td>
                      </tr>
                      <tr>
                        <td style="color: #78716c; font-weight: 500;">Icing Finish:</td>
                        <td>\${escapeHtml(order.icing)}</td>
                      </tr>
                      <tr>
                        <td style="color: #78716c; font-weight: 500;">Occasion:</td>
                        <td>\${escapeHtml(order.occasion)}</td>
                      </tr>
                      <tr>
                        <td style="color: #78716c; font-weight: 500;">Palette / Colors:</td>
                        <td>\${escapeHtml(order.colors)}</td>
                      </tr>
                      <tr>
                        <td style="color: #78716c; font-weight: 500;">Cake Inscription:</td>
                        <td style="font-style: italic; font-weight: 600; color: #854d0e;">"\${escapeHtml(order.wordsOnCake)}"</td>
                      </tr>
                      <tr>
                        <td style="color: #78716c; font-weight: 500;">Payment Terms:</td>
                        <td style="font-weight: 700; color: #15803d;">Cash on Pickup (In-Person • Cash Only)</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact & Support Info -->
          <tr>
            <td style="padding: 20px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 14px; padding: 16px;">
                <tr>
                  <td style="font-size: 13px; color: #78350f;">
                    <strong>Questions or custom requests?</strong><br />
                    Call or text us directly at <a href="tel:\${CONFIG.PHONE_1_RAW}" style="color: #92400e; font-weight: 700; text-decoration: underline;">\${CONFIG.PHONE_1}</a> or <a href="tel:\${CONFIG.PHONE_2_RAW}" style="color: #92400e; font-weight: 700; text-decoration: underline;">\${CONFIG.PHONE_2}</a>.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f5f4; padding: 20px 24px; text-align: center; border-top: 1px solid #e7e5e4;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #78716c;">
                DAOS Cakes • Freshly Baked with Passion in Florida & Atlanta
              </p>
              <p style="margin: 0; font-size: 11px; color: #a8a29e;">
                This email was sent automatically to confirm your cake order request.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
\`;

    // Plain text fallback
    const plainBody = 
      'Hi ' + (order.name || 'Valued Customer') + ',\\n\\n' +
      'Thank you for submitting your cake order with DAOS Cakes!\\n\\n' +
      '=========================================\\n' +
      '🍰 CAKE PICKUP EVENT\\n' +
      'Date & Time: ' + pickupDateLine + '\\n' +
      'Location: ' + order.locationInfo.name + ' (' + order.locationInfo.address + ')\\n' +
      'Directions: ' + pickupMapsLink + '\\n' +
      'Add to Calendar: ' + pickupCalLink + '\\n' +
      '=========================================\\n\\n' +
      '📞 ORDER CONSULTATION CALL\\n' +
      'Date & Time: ' + callDateLine + '\\n' +
      'We will call you at: ' + order.phone + '\\n' +
      'Add Call to Calendar: ' + callCalLink + '\\n\\n' +
      'ORDER SUMMARY:\\n' +
      '- Cake Flavor: ' + order.flavor + '\\n' +
      '- Size: ' + order.size + '\\n' +
      '- Icing: ' + order.icing + '\\n' +
      '- Colors: ' + order.colors + '\\n' +
      '- Inscription: "' + order.wordsOnCake + '"\\n' +
      '- Payment: Cash on Pickup\\n\\n' +
      'Call us directly at ' + CONFIG.PHONE_1 + ' or ' + CONFIG.PHONE_2 + ' for questions!\\n\\n' +
      'Warm regards,\\n' +
      'DAOS Cakes Team';

    MailApp.sendEmail({
      to: order.email,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody
    });

    Logger.log('✅ Rich event confirmation email successfully sent to ' + order.email);
  } catch (err) {
    Logger.log('Error sending rich confirmation email: ' + err.toString());
  }
}

/**
 * Builds a direct Google Calendar 1-Click "Add to Calendar" link.
 */
function buildGoogleCalendarUrl(title, startDate, durationMins, details, location) {
  if (!startDate || isNaN(startDate.getTime())) return '#';
  const endDate = new Date(startDate.getTime() + durationMins * 60 * 1000);
  
  const fmt = function(d) {
    return d.toISOString().replace(/-|:|\\.\\d+/g, '');
  };

  const datesParam = fmt(startDate) + '/' + fmt(endDate);
  
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' + encodeURIComponent(title) +
    '&dates=' + datesParam +
    '&details=' + encodeURIComponent(details) +
    '&location=' + encodeURIComponent(location);
}

/**
 * Formats a Date range like: "Thu, Aug 27 • 7:30 AM – 8:20 AM"
 */
function formatEventDateRange(startDate, durationMins) {
  if (!startDate || isNaN(startDate.getTime())) return 'Not Scheduled';
  
  const endDate = new Date(startDate.getTime() + durationMins * 60 * 1000);
  
  const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
  
  const dateStr  = startDate.toLocaleDateString('en-US', dateOptions);
  const startStr = startDate.toLocaleTimeString('en-US', timeOptions);
  const endStr   = endDate.toLocaleTimeString('en-US', timeOptions);
  
  return dateStr + ' • ' + startStr + ' – ' + endStr;
}

/**
 * Parses date & time input into a JavaScript Date object.
 */
function parseDateTime(dateVal, timeVal, defaultHour, defaultMinute) {
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

  let hours = defaultHour || 10;
  let minutes = defaultMinute || 0;

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

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
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
    title: 'Paste the Updated Code.gs',
    details: 'Replace all contents in Code.gs with this updated script. It automatically generates the Google Calendar Event Preview Cards with "Add to Calendar" and "Directions" buttons in every email.'
  },
  {
    step: 3,
    title: 'Run setupAllTriggers() ONCE',
    details: 'Select setupAllTriggers from the function dropdown at the top and click Run. Grant permissions for Google Calendar, Gmail, and Spreadsheet. This activates the form submit trigger.'
  },
  {
    step: 4,
    title: 'Submit a Test Cake Order',
    details: 'Fill out your Google Form with your email address. Check your inbox to see the rich Google Calendar event card with instant "Add to Calendar" and "Directions" buttons!'
  }
];

