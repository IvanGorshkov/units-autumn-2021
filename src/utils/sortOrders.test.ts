import { type } from 'os';
import {getSortFunction, sortByDate, sortByItemCount, sortTypes, sortOrders} from './sortOrders';
import {fakeOrders} from '../data/fakeOrders';

describe('Сортировка по числу', () => {
	it.each([
		{ 
			order1: { 
				items: fakeOrders[0].items
			},
			order2: { 
				items: fakeOrders[0].items
			},
			res: 0
		},
		{ 
			order1: { 
				items: fakeOrders[0].items
			}, 
			order2: {
				items: fakeOrders[1].items
			},
			res: -1
		},
		{ 
			order1: { 
				items: fakeOrders[1].items
			}, 
			order2: { 
				items: fakeOrders[0].items
			},
			res: 1
		}
	])('sortByItemCount function', (data) => {
		const result = sortByItemCount(data.order1, data.order2);
		expect(result).toBe(data.res);
	});

	it.each([
		{	
			order1: { }, 
			order2: { },
		},
		{	
			order1: { items: [] }, 
			order2: { items: [] },
		},
	])('Проверки для некорректных данных в sortByItemCount function', (data) => {
		const result = sortByItemCount(data.order1, data.order2);
		expect(result).toBe(0);
	});
});

describe('Выбор функции сортировки', () => {
	it.each(
		[
			{
				type: sortTypes.COUNT, 
				res: sortByItemCount
			},
			{
				type: sortTypes.DATE, 
				res: sortByDate
			},
		]
	)('getSortFunction function', (data) => {
		expect(data.res).toBe(getSortFunction(data.type));
	});
});

describe('Сортировка по дате', () => {	
	it.each([
		{ 
			order1: { 
				date: fakeOrders[0].date 
			}, 
			order2: { 
				date: fakeOrders[1].date 
			},
			res: -1
		},
		{ 
			order1: { 
				date: fakeOrders[1].date 
			}, 
			order2: { 
				date: fakeOrders[0].date 
			},
			res: 1
		},
		{ 
			order1: { 
				date: fakeOrders[0].date  
			}, 
			order2: { 
				date: fakeOrders[0].date 
			},
			res: 0
		},
	])('sortByDate function', (data) => {
		const result = sortByDate(data.order1, data.order2);
		expect(result).toBe(data.res);
	});
});

describe('sortOrders', () => {	
	it('sortOrders function - Вызов с пустыми order', () => {
		const func = jest.fn();
		const res = sortOrders([], func);
		expect(res).toBeUndefined();
	});

	it('sortOrders function - Вызов с пустой функцией', () => {
		const res = sortOrders([{}, {}], undefined);
		expect(res).toBeUndefined();
	});

	it('sortOrders function - Вызов функции сортировки', () => {
		const func = jest.fn();
		sortOrders([{}, {}], func);
		expect(func).toHaveBeenCalledTimes(1);
	});
});
