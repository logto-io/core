import dayjs from 'dayjs';

import dashboardRoutes from '@/routes/dashboard';
import { createRequester } from '@/utils/test-utils';

const totalUserCount = 1000;
const countUsers = jest.fn(async () => ({ count: totalUserCount }));

jest.mock('@/queries/user', () => ({
  countUsers: async () => countUsers(),
}));

const mockDailyNewUserCounts = [
  { date: '2022-05-01', count: 1 },
  { date: '2022-05-02', count: 2 },
  { date: '2022-05-03', count: 3 },
  { date: '2022-05-06', count: 6 },
  { date: '2022-05-07', count: 7 },
  { date: '2022-05-08', count: 8 },
  { date: '2022-05-09', count: 9 },
  { date: '2022-05-10', count: 10 },
  { date: '2022-05-13', count: 13 },
  { date: '2022-05-14', count: 14 },
];

const getDailyNewUserCountsByTimeInterval = jest.fn(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (startTimeExclusive: number, endTimeInclusive: number) => mockDailyNewUserCounts
);

jest.mock('@/queries/log', () => ({
  getDailyNewUserCountsByTimeInterval: async (
    startTimeExclusive: number,
    endTimeInclusive: number
  ) => getDailyNewUserCountsByTimeInterval(startTimeExclusive, endTimeInclusive),
}));

describe('dashboardRoutes', () => {
  const logRequest = createRequester({ authedRoutes: dashboardRoutes });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /dashboard/users/total', () => {
    it('should call countUsers with no parameters', async () => {
      await logRequest.get('/dashboard/users/total');
      expect(countUsers).toHaveBeenCalledWith();
    });

    it('/dashboard/users/total should return correct response', async () => {
      const response = await logRequest.get('/dashboard/users/total');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ totalUserCount });
    });
  });

  describe('GET /dashboard/users/new', () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(new Date('2022-05-14'));
    });

    it('should call getDailyNewUserCountsByTimeInterval with the time interval (14 days ago 23:59:59.999, today 23:59:59.999]', async () => {
      await logRequest.get('/dashboard/users/new');
      expect(getDailyNewUserCountsByTimeInterval).toHaveBeenCalledWith(
        dayjs().endOf('day').subtract(14, 'day').valueOf(),
        dayjs().endOf('day').valueOf()
      );
    });

    it('should return correct response', async () => {
      const response = await logRequest.get('/dashboard/users/new');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        today: {
          count: 14,
          delta: 1,
        },
        last7Days: {
          count: 54,
          delta: 35,
        },
      });
    });
  });
});
