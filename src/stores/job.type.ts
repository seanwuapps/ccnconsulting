import { Dayjs } from 'dayjs';

export interface Job {
  title: string;
  buyer: string;
  location: string;
  closingDateObj: Dayjs;
  closingDate: string;
  closingDateRelative: string;
  isClosed: boolean;
  blurb: string;
  description: string;
  slug: string;
  publishedDateObj: Dayjs;
  publishedDate: string;
}

export interface JobDetails extends Job {
  essentialCriteria: string;
  desirableCriteria: string;
  duration: string;
  extensionTerm: string;
  extensionCount: string;
  workingArrangements: string;
  clearance: string;
}
