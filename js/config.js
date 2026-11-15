/* ------------------------------------------------------------------
 * SITE CONFIG — the only file you need to edit to add personal links.
 * Leave a value as "" and the matching link/section is hidden
 * automatically, so the site never ships a broken or placeholder link.
 * ------------------------------------------------------------------ */
window.SITE = {
  email: "shahzaibbajwa293@gmail.com",
  github: "ShahzaibBajwa-804",           
  linkedin: "https://www.linkedin.com/in/shahzaib-bajwa-8a9234379/",         
  whatsapp: "", 
  // Where the contact form POSTs JSON {name,email,message}.
  // "/api/contact" = bundled Node server. For static hosting use a form
  // service URL (for example Formspree).
  contactEndpoint: "/api/contact",
  // Project links (add when repos/demos are public). Keys match data-project ids.
  projects: {
    noozaib:   { live: "", repo: "" },
    shoeadda:  { live: "", repo: "" },
    goldai:    { live: "", repo: "" },
    youtube:   { live: "", repo: "" }
  }
};
