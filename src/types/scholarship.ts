export type Scholarship = {
  id: string;
  title: string;
  provider: string | null;
  description: string | null;
  benefits: string | null;
  eligibility_requirements: string | null;
  deadline: string | null;
  website_url: string | null;
  source_url: string;
  poster_url?: string; // Optional poster url, will use placeholder for now
  created_at: string;
  updated_at: string;
};
