import { dayOfYear, weekOfYear } from 'https://deno.land/std@0.152.0/datetime/mod.ts';

console.log(dayOfYear(new Date('2022-08-21')))
console.log(weekOfYear(new Date()))
