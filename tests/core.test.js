const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

global.localStorage = { getItem(){ return null; }, setItem(){} };
vm.runInThisContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), { filename: 'app.js' });
const core = global.SignalOpsCore;
const fy = new Date().getMonth() === 0 ? new Date().getFullYear() : new Date().getFullYear() + 1;

const base = {
  'Account Name':'Acme Manufacturing', 'Opportunity Owner':'Alex Rivera', 'Opportunity Name':'Acme renewal',
  'Opportunity Record Type':'Subscription Renewals', 'Deal Type':'Renewal', 'Stage':'2 Open Renewal',
  'Won /Lost ':'Open', 'Close FY':fy, 'Renewal ARR':100000, 'New Committed ARR':0,
  'Health':'At-Risk', 'Sold Licenses':100, 'Utilization - 1 Month Ago':0.20,
  'CSM Health Note':'Procurement is challenging price and budget.',
  'Latest Gong Call Highlight':'Customer asked whether unused licenses can be reduced.',
  'At Risk/Churn/Downsell Reason':'No Longer has Budget', 'Forecast Category':'Pipeline', 'FY26 Segment':'ENT'
};

let out = core.analyze([base]);
assert.equal(out.blockers.length,0,'valid schema should run');
assert.equal(out.accounts.length,1,'one current open renewal should be queued');
assert.equal(out.accounts[0].tier,'Critical','compound risk should be Critical');
assert(out.accounts[0].evidence.some(e=>e.label.includes('Low utilization')),'structured utilization evidence should trigger');
assert(out.accounts[0].evidence.some(e=>e.label.includes('Budget')),'text budget evidence should trigger');

out = core.analyze([{ 'Account Name':'Missing schema' }]);
assert(out.blockers.length>=3,'missing load-bearing fields should stop the run');
assert.equal(out.accounts.length,0,'blocked runs should not produce a queue');

out = core.analyze([{...base,'Account Name':'Growth Account','Health':'Healthy','Utilization - 1 Month Ago':1.25,'CSM Health Note':'Second site rollout is approved.','Latest Gong Call Highlight':'Leadership is bought in.','At Risk/Churn/Downsell Reason':null,'Forecast Category':'Best Case'}]);
assert.equal(out.accounts[0].tier,'Expansion','structured and text expansion evidence should create an Expansion tier');

out = core.analyze([{...base,'Won /Lost ':'Won'}]);
assert.equal(out.accounts.length,0,'closed renewals should not enter the current action queue');

console.log('SignalOps core tests passed.');
