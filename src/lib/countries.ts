/**
 * Country picker list (form selects).
 * English names matching the world-atlas geography source.
 */
export const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina",
  "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
  "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominican Republic", "DR Congo", "Ecuador", "Egypt",
  "El Salvador", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji",
  "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
  "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
  "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
  "Kenya", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
  "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
  "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia",
  "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal",
  "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
  "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palestine",
  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia",
  "Senegal", "Serbia", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
  "Somalia", "South Africa", "South Korea", "South Sudan", "Spain",
  "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
  "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda",
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
  "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zambia",
  "Zimbabwe",
];

/**
 * Map plotting metadata for visited countries.
 * Keyed by canonical English name. `aliases` covers all DB variants
 * (English + Spanish) that should resolve to the same pin.
 */
export type CountryMeta = {
  iso: number;
  coords: [number, number];
  label: string;
  aliases: string[];
};

export const COUNTRY_META: Record<string, CountryMeta> = {
  Argentina:     { iso:  32, coords: [-63.6167, -38.4161], label: "Argentina",   aliases: ["Argentina"] },
  Chile:         { iso: 152, coords: [-71.5430, -35.6751], label: "Chile",       aliases: ["Chile"] },
  Ecuador:       { iso: 218, coords: [-78.4678,  -1.8312], label: "Ecuador",     aliases: ["Ecuador"] },
  Peru:          { iso: 604, coords: [-75.0152,  -9.1900], label: "Perú",        aliases: ["Perú", "Peru"] },
  "United States": { iso: 840, coords: [-95.7129, 37.0902], label: "USA",        aliases: ["USA", "United States", "Estados Unidos"] },
  "Costa Rica":  { iso: 188, coords: [-83.7534,   9.7489], label: "Costa Rica",  aliases: ["Costa Rica"] },
  Colombia:      { iso: 170, coords: [-74.2973,   4.5709], label: "Colombia",    aliases: ["Colombia"] },
  Bolivia:       { iso:  68, coords: [-64.9631, -16.2902], label: "Bolivia",     aliases: ["Bolivia"] },
  Venezuela:     { iso: 862, coords: [-66.5897,   6.4238], label: "Venezuela",   aliases: ["Venezuela"] },
  Brazil:        { iso:  76, coords: [-51.9253, -14.2350], label: "Brasil",      aliases: ["Brasil", "Brazil"] },
  Mexico:        { iso: 484, coords: [-102.5528, 23.6345], label: "México",      aliases: ["México", "Mexico"] },
  Spain:         { iso: 724, coords: [ -3.7492,  40.4637], label: "España",      aliases: ["España", "Spain"] },
  France:        { iso: 250, coords: [  2.3522,  48.8566], label: "Francia",     aliases: ["Francia", "France"] },
  Italy:         { iso: 380, coords: [ 12.5674,  41.8719], label: "Italia",      aliases: ["Italia", "Italy"] },
  Germany:       { iso: 276, coords: [ 10.4515,  51.1657], label: "Alemania",    aliases: ["Alemania", "Germany"] },
  Canada:        { iso: 124, coords: [-96.8165,  56.1304], label: "Canadá",      aliases: ["Canadá", "Canada"] },
  Nepal:         { iso: 524, coords: [ 84.1240,  28.3949], label: "Nepal",       aliases: ["Nepal"] },
  Tanzania:      { iso: 834, coords: [ 34.8888,  -6.3690], label: "Tanzania",    aliases: ["Tanzania"] },
  Kenya:         { iso: 404, coords: [ 37.9062,  -0.0236], label: "Kenia",       aliases: ["Kenia", "Kenya"] },
  Japan:         { iso: 392, coords: [138.2529,  36.2048], label: "Japón",       aliases: ["Japón", "Japan"] },
  Australia:     { iso:  36, coords: [133.7751, -25.2744], label: "Australia",   aliases: ["Australia"] },
  Switzerland:   { iso: 756, coords: [  8.2275,  46.8182], label: "Suiza",       aliases: ["Suiza", "Switzerland"] },
  Norway:        { iso: 578, coords: [  8.4689,  60.4720], label: "Noruega",     aliases: ["Noruega", "Norway"] },
};

const ALIAS_TO_KEY: Map<string, string> = (() => {
  const m = new Map<string, string>();
  for (const [key, meta] of Object.entries(COUNTRY_META)) {
    for (const alias of meta.aliases) m.set(alias, key);
  }
  return m;
})();

export function getCountryMeta(name: string | null | undefined): CountryMeta | null {
  if (!name) return null;
  const key = ALIAS_TO_KEY.get(name);
  return key ? COUNTRY_META[key] : null;
}
