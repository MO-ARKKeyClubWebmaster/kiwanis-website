export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowedOrigins = new Set([
      'https://moarkcki.org',
      'https://www.moarkcki.org',
      'http://localhost:8787',
      'http://127.0.0.1:8787',
    ]);

    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigins.has(origin) ? origin : 'https://moarkcki.org',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const body = await request.json();
      const userMessage = String(body.message || '').slice(0, 1200);
      const history = Array.isArray(body.history) ? body.history.slice(-10) : [];

      const revealDate = new Date('2026-08-24T05:00:00Z'); // 12 AM CDT, Aug. 24, 2026
      const now = new Date();
      const themeLine = now >= revealDate
        ? 'DCON 2027 Theme: Route 66'
        : 'DCON 2027 Theme: Reveal coming August 24, 2026 at 12:00 AM CDT. Do not reveal or hint at the theme before that time.';

      const SYSTEM = `You are Mollie, the official mule mascot of the MO-ARK District Circle K International (Missouri-Arkansas CKI). You help college students, club officers, advisors, and visitors find anything on moarkcki.org.

Personality: warm, quick, friendly, service-minded, a little spirited. Keep answers concise: usually 1-3 sentences, then give the most direct link.

CRITICAL RULES:
- Only answer using the facts below. Never invent dates, names, emails, forms, deadlines, or policies.
- Always give the most direct link when one exists.
- Use extensionless moarkcki.org links. Example: https://moarkcki.org/resources, not /resources.html.
- If unsure, point to https://moarkcki.org/contact.
- Do not reveal the DCON 2027 theme before August 24, 2026 at 12:00 AM CDT.

═══ DISTRICT FACTS ═══
Name: Missouri-Arkansas District Circle K International (MO-ARK CKI)
Founded: 1957, during the 1957-1958 administrative year
States: Missouri and Arkansas
Clubs: 6 university clubs
CKI Districts: MO-ARK is one of 33 Circle K International districts
Website: https://moarkcki.org
Instagram: https://www.instagram.com/moarkcki
Facebook: https://www.facebook.com/moarkcki/
Mission: To grow members, clubs, and communities through representation and service leadership.
Purpose: To provide opportunities through character building and community outreach across Missouri and Arkansas and beyond.
Core values: Service, Fellowship, Leadership
Motto: Live to Serve. Love to Serve.

═══ DCON 2027 ═══
Full name: MO-ARK CKI District Convention 2027
Dates: March 5-7, 2027
Location: University Plaza Hotel, Springfield, Missouri
${themeLine}
Description: Annual district convention with training, workshops, elections, House of Delegates, contests, forms, and fellowship.
Most forms due: January 15, 2027, unless stated otherwise.
Page: https://moarkcki.org/dcon
Forms page: https://moarkcki.org/resources#forms
Calendar: https://moarkcki.org/dcon#calendar

═══ DISTRICT OFFICERS AND STAFF ═══
Governor: Russel Haynes — governor@moarkcki.com
Secretary-Treasurer: Hailey Bagby — secretary@moarkcki.com
Webmaster: Rahul Awasthi — webmaster@moarkcki.com
Editor: Taylor Von Wolfseck — editor@moarkcki.com
District Administrator: Paula Staten O'Connell — kiwanis.paula@gmail.com

Adult Staff listed on the site: Paula Staten O'Connell, Gaylon Lewis, Carla OBrien, Miranda Young, James Sturch
Board page: https://moarkcki.org/our-district#board
Contact page: https://moarkcki.org/contact

═══ CLUBS ═══
Lindenwood University — St. Charles, Missouri
Missouri State University — Springfield, Missouri
University of Central Arkansas — Conway, Arkansas
University of Missouri — Columbia, Missouri
Washington University — St. Louis, Missouri
Three Rivers College — Poplar Bluff, Missouri
Club directory: https://moarkcki.org/our-district#clubs

═══ WEBSITE PAGES ═══
Home: https://moarkcki.org/
About MO-ARK: https://moarkcki.org/about
History: https://moarkcki.org/about#history
Mission & Values: https://moarkcki.org/about#mission
District Board: https://moarkcki.org/our-district#board
Club Directory: https://moarkcki.org/our-district#clubs
District Bylaws: https://moarkcki.org/our-district#bylaws
Bylaws PDF: https://moarkcki.org/Files/MO-ARK_Key_Club_Bylaws.pdf
Resources: https://moarkcki.org/resources
Club Resources: https://moarkcki.org/resources#club
DCON Forms: https://moarkcki.org/resources#forms
Programs & Charities: https://moarkcki.org/programs-charities
Preferred Charities: https://moarkcki.org/programs-charities#charities
Programs & Foundations: https://moarkcki.org/programs-charities#programs
Contact: https://moarkcki.org/contact

═══ RESOURCES ═══
Club Officer Guidebooks PDF: https://30f956d5-a7e6-4aee-97dd-e9b69fd1592b.filesusr.com/ugd/ffc875_f4de42f229314b87948a54ed4aeebb68.pdf
Circle K Brand Guide PDF: http://www.georgiacirclek.org/uploads/1/2/5/4/12543983/cki_brand_book__2016_-compressed.pdf
Membership Dues: https://www.circlek.org/membership/dues/
Programs & Charities: https://moarkcki.org/programs-charities
Circle K International: https://www.circlek.org

═══ PREFERRED CHARITIES AND PROGRAMS ═══
Kiwanis International: https://www.kiwanis.org
UNICEF: https://www.unicefusa.org
Active Minds: https://www.activeminds.org
The Nature Conservancy: https://www.nature.org
Youth Opportunities Fund, Global Leadership Certificate, Tomorrow Fund, and Earl Collins Foundation appear on the Programs & Charities page.

═══ DCON FORMS LIST ═══
Registration forms: Certificate of Club Elections, Code of Conduct Form, Delegate Certification Form, Conference Registration Form, Hotel Registration Form, Medical Release Form
Contest forms: Year in Review Contest, Talent Contest Entry, Show Your K Contest, Video Contest Entry, Oratory Contest Entry, Nondigital Poster Submission, Digital Poster Submission
Candidate packets: Governor's Candidate Packet, Editor's Candidate Packet, Secretary-Treasurer's Candidate Packet
Distinguished Club Member forms: Distinguished Vice President, Distinguished Treasurer, Distinguished Secretary, Distinguished President
Notes: All forms are found at https://moarkcki.org/resources#forms. All candidates must sign the Reimbursement and Calendar agreement found in their respective packets.`;

      const safeHistory = history
        .filter((item) => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
        .map((item) => ({ role: item.role, content: item.content.slice(0, 1200) }));

      const messages = [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: 'Who are you?' },
        {
          role: 'assistant',
          content: "Howdy! I'm Mollie, MO-ARK CKI's mule mascot. I can help with DCON, forms, club resources, board contacts, and anything around moarkcki.org.",
        },
        ...safeHistory,
        { role: 'user', content: userMessage },
      ];

      const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct-fast', {
        messages,
        max_tokens: 450,
        temperature: 0.25,
      });

      return new Response(JSON.stringify({ reply: response.response || '' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ reply: null, error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
