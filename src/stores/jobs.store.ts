import { defineStore } from 'pinia';
import Airtable, { Records, FieldSet } from 'airtable';
import { AIRTABLE_KEY } from '../const';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { Job, JobDetails } from './job.type';
import Fuse from 'fuse.js';

dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);

const jobsBase = new Airtable({ apiKey: AIRTABLE_KEY }).base('appjb01Lr9hMbTruv')('Jobs');

const DATE_DISPLAY_FORMAT = 'DD MMM YYYY';
const DATETIME_DISPLAY_FORMAT = 'DD MMM YYYY';

const formatJobCard = (record: any) => {
  const title = record.get('Title');
  const buyer = record.get('Buyer');
  const location = record.get('Location');
  const closingDateString = record.get('Closing date');
  const closingDateObj = dayjs(closingDateString);
  const description = record.get('Description');
  const blurb = description?.substring(0, 100) + '...';
  const slug = record.get('Slug');
  const isClosed = dayjs().isAfter(closingDateObj);
  const publishedDateObj = dayjs(record.get('Published date'));
  return {
    title,
    buyer,
    location,
    closingDateObj,
    closingDate: closingDateObj.format(DATETIME_DISPLAY_FORMAT),
    closingDateRelative: closingDateObj.fromNow(),
    isClosed,
    blurb,
    description,
    slug,
    publishedDateObj,
    publishedDate: publishedDateObj.format(DATE_DISPLAY_FORMAT),
  };
};

const formatJobDetails = (record: any) => {
  return {
    ...formatJobCard(record),
    essentialCriteria: record.get('Essential criteria'),
    desirableCriteria: record.get('Desirable criteria'),
    duration: record.get('Initial contract duration'),
    extensionTerm: record.get('Extension term'),
    extensionCount: record.get('Number of extensions'),
    workingArrangements: record.get('Working arrangements'),
    clearance: record.get('Security clearance'),
  };
};

export async function fetchJobs(options?: any): Promise<Records<FieldSet> | undefined> {
  return new Promise((resolve, reject) => {
    jobsBase
      .select({
        view: 'Grid view',
        sort: [
          {
            field: 'Published date',
            direction: 'desc',
          },
        ],
        ...options,
      })
      .firstPage((error, records) => {
        if (error) {
          reject(error);
        }
        resolve(records);
      });
  });
}

export const useJobsStore = defineStore('jobs', {
  state: () => {
    return {
      latest: [] as Job[],
      currentJob: null as JobDetails | null,
      fetchingDetails: false,
      list: [] as Job[],
      fetchingList: false,
      listFilters: {
        query: '',
        showClosed: false,
      },
    };
  },
  getters: {
    filteredList(state) {
      let result = state.list;
      if (state.listFilters.query.length > 0) {
        // const options = {
        //   keys: ['title', 'buyer', 'location', 'blurb', 'description'],
        // };
        // const fuse = new Fuse(result, options);
        // const searchResult = fuse.search(state.listFilters.query);
        // console.log(searchResult);
        // result = searchResult.map(({ item }) => item);

        const keys = ['title', 'buyer', 'location', 'blurb', 'description'] as const;
        result = result.filter((item) => {
          return keys.some((key) => {
            const value = item[key];
            return value.toLowerCase().includes(state.listFilters.query.toLowerCase());
          });
        });
      } else {
        result = state.list;
      }

      if (!state.listFilters.showClosed) {
        result = result.filter((job) => !job.isClosed);
      }
      return result;
    },
  },
  actions: {
    async fetchListing() {
      this.fetchingList = true;
      try {
        const records = await fetchJobs();
        if (records) {
          this.list = records.map(formatJobCard);
        }
      } finally {
        this.fetchingList = false;
      }
    },
    async fetchLatest(n = 3) {
      const records = await fetchJobs({
        // Selecting the first 3 records in Grid view:
        maxRecords: n,
      });
      if (records) {
        this.latest = records.map(formatJobCard);
      }
    },
    async fetchJob(slug: string) {
      this.fetchingDetails = true;
      try {
        const records = await fetchJobs({
          maxRecords: 1,
          filterByFormula: `{Slug} = '${slug}'`,
        });
        if (records && records.length > 0) {
          this.currentJob = formatJobDetails(records[0]);
        }
      } finally {
        this.fetchingDetails = false;
      }
    },
    async search(query: string) {
      this.listFilters.query = query;
    },
  },
});
