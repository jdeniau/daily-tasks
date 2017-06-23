import moment from 'moment';
import Task, { compareNextExecutionDate } from './Task';

it('compare dates', () => {
  const lastWeek = new Task({});
  const yesterday = new Task({});
  const tomorrow = new Task({});
  const nextWeek = new Task({});

  lastWeek.getNextExecutionDate = () => moment().subtract(1, 'week');
  yesterday.getNextExecutionDate = () => moment().subtract(1, 'day');
  tomorrow.getNextExecutionDate = () => moment().add(1, 'day');
  nextWeek.getNextExecutionDate = () => moment().add(1, 'week');


  expect(compareNextExecutionDate(lastWeek, yesterday)).toEqual(-1);
  expect(compareNextExecutionDate(yesterday, lastWeek)).toEqual(1);

  expect(compareNextExecutionDate(yesterday, tomorrow)).toEqual(-1);
  expect(compareNextExecutionDate(tomorrow, yesterday)).toEqual(1);

  expect(compareNextExecutionDate(tomorrow, tomorrow)).toEqual(0);
  expect(compareNextExecutionDate(yesterday, yesterday)).toEqual(0);

});

it('compare dates with no next dates', () => {
  const yesterday = new Task({});
  const tomorrow = new Task({});

  yesterday.getNextExecutionDate = () => moment().subtract(1, 'day');
  tomorrow.getNextExecutionDate = () => moment().add(1, 'day');

  const noNextDate = new Task({});

  expect(compareNextExecutionDate(tomorrow, noNextDate)).toEqual(1);
  expect(compareNextExecutionDate(noNextDate, tomorrow)).toEqual(-1);

  expect(compareNextExecutionDate(yesterday, noNextDate)).toEqual(-1);
  expect(compareNextExecutionDate(noNextDate, yesterday)).toEqual(1);
});
