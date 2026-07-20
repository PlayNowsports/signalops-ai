const fs = require('fs');
const vm = require('vm');
let XLSX;
try { XLSX = require('xlsx'); }
catch { XLSX = require('../vendor/xlsx.full.min.js'); }

global.localStorage = { getItem(){ return null; }, setItem(){} };
vm.runInThisContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), { filename: 'app.js' });

const input = process.argv[2];
if (!input) throw new Error('Usage: node tests/run-fixture.js path/to/input.xlsx');
const workbook = XLSX.read(fs.readFileSync(input), { type: 'buffer', cellDates: true });
const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: null, raw: true });
const result = global.SignalOpsCore.analyze(rows);
const tiers = result.accounts.reduce((o,a)=>(o[a.tier]=(o[a.tier]||0)+1,o),{});
const arr = result.accounts.reduce((o,a)=>(o[a.tier]=(o[a.tier]||0)+a.renewalArr,o),{});
const top = result.accounts.slice(0,10).map(a=>({account:a.name,tier:a.tier,renewalArr:a.renewalArr,risk:a.risk,expansion:a.expansion,evidence:a.evidence.map(e=>e.label)}));
console.log(JSON.stringify({rows:rows.length,headers:result.headers.length,blockers:result.blockers.length,quality:result.quality,accounts:result.accounts.length,tiers,arr,top},null,2));
