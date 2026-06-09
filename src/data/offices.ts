import type { Office } from "./types";

export const offices: Office[] = [
  {
    id: "o1",
    city: "San Francisco",
    address: "880 Market Street, Suite 400, San Francisco, CA 94102",
    phone: "+1 (415) 555-0100",
    email: "sf@primenest.com",
    hours: "Mon–Fri 9am–6pm · Sat 10am–4pm",
  },
  {
    id: "o2",
    city: "Palo Alto",
    address: "215 University Avenue, Palo Alto, CA 94301",
    phone: "+1 (650) 555-0120",
    email: "paloalto@primenest.com",
    hours: "Mon–Fri 9am–6pm · Sat by appointment",
  },
  {
    id: "o3",
    city: "Oakland",
    address: "1700 Broadway, Suite 12, Oakland, CA 94612",
    phone: "+1 (510) 555-0140",
    email: "oakland@primenest.com",
    hours: "Mon–Fri 9am–6pm",
  },
];

export const COMPANY = {
  name: "PrimeNest Realty",
  tagline: "Find a place you'll love to call home",
  phone: "+1 (415) 555-0100",
  email: "hello@primenest.com",
  address: "880 Market Street, Suite 400, San Francisco, CA 94102",
};
