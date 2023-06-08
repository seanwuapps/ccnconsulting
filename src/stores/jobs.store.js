import { defineStore } from 'pinia';
import Airtable from 'airtable';
import { AIRTABLE_KEY } from '../const';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);

const jobsBase = new Airtable({ apiKey: AIRTABLE_KEY }).base('appjb01Lr9hMbTruv')('Jobs');

const DATE_DISPLAY_FORMAT = 'DD MMM YYYY';
const DATETIME_DISPLAY_FORMAT = 'DD MMM YYYY';

const formatJobCard = (record) => {
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

const formatJobDetails = (record) => {
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

export async function fetchJobs(options) {
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
      latest: [],
      currentJob: null,
      fetchingDetails: false,
      list: [],
      fetchingList: false,
      listFilters: {
        showClosed: false,
      },
    };
  },
  getters: {
    filteredList(state) {
      let result = state.list;
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
        this.list = records.map(formatJobCard);
      } finally {
        this.fetchingList = false;
      }
    },
    async fetchLatest(n = 3) {
      const records = await fetchJobs({
        // Selecting the first 3 records in Grid view:
        maxRecords: n,
      });
      this.latest = records.map(formatJobCard);
    },
    async fetchJob(slug) {
      this.fetchingDetails = true;
      try {
        const records = await fetchJobs({
          maxRecords: 1,
          filterByFormula: `{Slug} = '${slug}'`,
        });
        this.currentJob = formatJobDetails(records[0]);
      } finally {
        this.fetchingDetails = false;
      }
    },
  },
});
