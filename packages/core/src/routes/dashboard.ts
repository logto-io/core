import { dateRegex } from '@logto/shared';
import dayjs, { Dayjs } from 'dayjs';
import { object, string } from 'zod';

import koaGuard from '@/middleware/koa-guard';
import {
  countActiveUsersByTimeInterval,
  getDailyActiveUserCountsByTimeInterval,
  getDailyNewUserCountsByTimeInterval,
} from '@/queries/log';
import { countUsers } from '@/queries/user';

import { AuthedRouter } from './types';

const getDateString = (day: Dayjs) => day.format('YYYY-MM-DD');

const lastTimestampOfDay = (day: Dayjs) => day.endOf('day').valueOf();

const indicesFrom0To6 = [...Array.from({ length: 7 }).keys()];

export default function dashboardRoutes<T extends AuthedRouter>(router: T) {
  router.get('/dashboard/users/total', async (ctx, next) => {
    const { count: totalUserCount } = await countUsers();
    ctx.body = { totalUserCount };

    return next();
  });

  router.get('/dashboard/users/new', async (ctx, next) => {
    const today = dayjs();
    const fourteenDaysAgo = today.subtract(14, 'day');
    const dailyNewUserCounts = await getDailyNewUserCountsByTimeInterval(
      // (14 days ago 23:59:59.999, today 23:59:59.999]
      lastTimestampOfDay(fourteenDaysAgo),
      lastTimestampOfDay(today)
    );

    const last14DaysNewUserCounts = new Map(
      dailyNewUserCounts.map(({ date, count }) => [date, count])
    );

    const todayNewUserCount = last14DaysNewUserCounts.get(getDateString(today)) ?? 0;
    const yesterday = today.subtract(1, 'day');
    const yesterdayNewUserCount = last14DaysNewUserCounts.get(getDateString(yesterday)) ?? 0;
    const todayDelta = todayNewUserCount - yesterdayNewUserCount;

    const last7DaysNewUserCount = indicesFrom0To6
      .map((index) => getDateString(today.subtract(index, 'day')))
      .reduce((sum, date) => sum + (last14DaysNewUserCounts.get(date) ?? 0), 0);
    const newUserCountFrom13DaysAgoTo7DaysAgo = indicesFrom0To6
      .map((index) => getDateString(today.subtract(7 + index, 'day')))
      .reduce((sum, date) => sum + (last14DaysNewUserCounts.get(date) ?? 0), 0);
    const last7DaysDelta = last7DaysNewUserCount - newUserCountFrom13DaysAgoTo7DaysAgo;

    ctx.body = {
      today: {
        count: todayNewUserCount,
        delta: todayDelta,
      },
      last7Days: {
        count: last7DaysNewUserCount,
        delta: last7DaysDelta,
      },
    };

    return next();
  });

  router.get(
    '/dashboard/users/active',
    koaGuard({
      query: object({ date: string().regex(dateRegex).optional() }),
    }),
    async (ctx, next) => {
      const {
        query: { date },
      } = ctx.guard;

      const targetDay = date ? dayjs(date) : dayjs(); // Defaults to today
      const sevenDaysAgo = targetDay.subtract(7, 'day');
      const fourteenDaysAgo = targetDay.subtract(14, 'day');
      const thirtyDaysAgo = targetDay.subtract(30, 'day');
      const sixtyDaysAgo = targetDay.subtract(60, 'day');

      const [
        // DAU: Daily Active User
        last30DauCounts,
        // WAU: Weekly Active User
        { count: previousWAU },
        { count: wau },
        // MAU: Monthly Active User
        { count: previousMAU },
        { count: mau },
      ] = await Promise.all([
        getDailyActiveUserCountsByTimeInterval(
          // (30 days ago 23:59:59.999, target day 23:59:59.999]
          lastTimestampOfDay(thirtyDaysAgo),
          lastTimestampOfDay(targetDay)
        ),
        countActiveUsersByTimeInterval(
          // (14 days ago 23:59:59.999, 7 days ago 23:59:59.999]
          lastTimestampOfDay(fourteenDaysAgo),
          lastTimestampOfDay(sevenDaysAgo)
        ),
        countActiveUsersByTimeInterval(
          // (7 days ago 23:59:59.999, target day 23:59:59.999]
          lastTimestampOfDay(sevenDaysAgo),
          lastTimestampOfDay(targetDay)
        ),
        countActiveUsersByTimeInterval(
          // (60 days ago 23:59:59.999, 30 days ago 23:59:59.999]
          lastTimestampOfDay(sixtyDaysAgo),
          lastTimestampOfDay(thirtyDaysAgo)
        ),
        countActiveUsersByTimeInterval(
          // (30 days ago 23:59:59.999, target day 23:59:59.999]
          lastTimestampOfDay(thirtyDaysAgo),
          lastTimestampOfDay(targetDay)
        ),
      ]);

      const previousDate = getDateString(targetDay.subtract(1, 'day'));
      const previousDAU = last30DauCounts.find(({ date }) => date === previousDate)?.count ?? 0;
      const targetDate = getDateString(targetDay);
      const dau = last30DauCounts.find(({ date }) => date === targetDate)?.count ?? 0;

      const dauDelta = dau - previousDAU;
      const wauDelta = wau - previousWAU;
      const mauDelta = mau - previousMAU;

      ctx.body = {
        dauCurve: last30DauCounts,
        dau: {
          count: dau,
          delta: dauDelta,
        },
        wau: {
          count: wau,
          delta: wauDelta,
        },
        mau: {
          count: mau,
          delta: mauDelta,
        },
      };

      return next();
    }
  );
}
