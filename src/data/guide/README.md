# Solar Guide Data Verification Workflow

This directory stores verified facts for the UrjaSaathi Customer Solar Guide.

## Strict Rules on Facts
1. **Never invent or extrapolate data:** No subsidy amounts, portal URLs, DISCOM names, or regulations may be entered unless directly retrieved from an official Government portal, State Nodal Agency (SNA) circular, or State Electricity Regulatory Commission (SERC) tariff order.
2. **Every fact must carry two fields:**
   - `source_url`: Permanent link to official gazette notification, PIB release, or state portal.
   - `verified_on`: The date in `YYYY-MM-DD` format when you personally verified that this policy is actively in force.
3. **Draft Status:** If either field is missing, keep the state status as `"not_verified"` and properties as `null`.

---

## How to Verify and Fill a State in `states.json`

When you research a state (e.g., `rajasthan`, `gujarat`, `delhi`):
1. **Find the State Nodal Agency (SNA):**
   - e.g., RRECL for Rajasthan, GEDA for Gujarat, KREDL for Karnataka, MEDA for Maharashtra.
   - Set `nodal_agency`: `"Rajasthan Renewable Energy Corporation Limited (RRECL)"`.
   - Set `state_portal_url`: `"https://..."`.
2. **Find the Operational DISCOMs:**
   - Add objects to the `discoms` array:
     ```json
     [
       { "name": "JVVNL (Jaipur Vidyut Vitran Nigam)", "website": "https://energy.rajasthan.gov.in/jvvnl" },
       { "name": "AVVNL (Ajmer Vidyut Vitran Nigam)", "website": "https://energy.rajasthan.gov.in/avvnl" },
       { "name": "JdVVNL (Jodhpur Vidyut Vitran Nigam)", "website": "https://energy.rajasthan.gov.in/jdvvnl" }
     ]
     ```
3. **Verify State Top-Up Subsidy (if any):**
   - Check if the state provides an additional top-up on top of the Central PM Surya Ghar subsidy.
   - If YES:
     ```json
     "state_top_up": {
       "status": "available",
       "amount_text": "Rs. X,XXX per kW under state scheme Y",
       "source_url": "https://official-govt-link...",
       "verified_on": "2026-11-23"
     }
     ```
   - If the state officially confirmed NO extra subsidy exists:
     ```json
     "state_top_up": {
       "status": "none",
       "amount_text": "No additional state top-up. Central subsidy applies.",
       "source_url": "https://official-govt-link...",
       "verified_on": "2026-11-23"
     }
     ```
4. **Link Net Metering Regulation:**
   - Add the SERC rooftop net-metering regulation order link to `net_metering_regulation_url`.
5. **Change Status:**
   - Change `"status": "not_verified"` to `"status": "verified"`.
   - Set `"last_verified": "YYYY-MM-DD"`.

---

## Verifying Central Guide Data in `central.json`
- Once you personally verify the PIB release `https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/feb/doc2025212499601.pdf`:
  1. Replace `"verified_on": "TO_BE_FILLED_BY_FOUNDER"` with today's date (e.g. `"2026-11-23"`).
  2. Set `"verify_before_launch": false`.
