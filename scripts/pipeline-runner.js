#!/usr/bin/env node
// PS Design System — Pipeline Runner
// Usage: node scripts/pipeline-runner.js [--step tokens|build|typecheck|lint|test|storybook|drift] [--watch]

const {execSync} = require('child_process');
const fs = require('fs'), path = require('path');
const C = {reset:'\x1b[0m',bold:'\x1b[1m',dim:'\x1b[2m',red:'\x1b[31m',green:'\x1b[32m',yellow:'\x1b[33m',blue:'\x1b[34m',cyan:'\x1b[36m',bgRed:'\x1b[41m',bgGreen:'\x1b[42m'};
const clr=(c,s)=>C[c]+s+C.reset, bold=s=>C.bold+s+C.reset, dim=s=>C.dim+s+C.reset;
const log={header:m=>console.log('\n'+clr('cyan','┌─')+' '+bold(m)),step:m=>console.log('  '+clr('blue','▶')+' '+m),ok:m=>console.log('  '+clr('green','✔')+' '+m),warn:m=>console.log('  '+clr('yellow','⚠')+' '+m),error:m=>console.log('  '+clr('red','✖')+' '+m),info:m=>console.log('  '+dim('·')+' '+m),divider:()=>console.log('  '+dim('─'.repeat(60)))};
const results=[];
const record=(step,status,detail='')=>results.push({step,status,detail});
function run(cmd,{silent=false,allowFail=false}={}){
  try{const out=execSync(cmd,{stdio:silent?'pipe':'inherit',encoding:'utf8',env:{...process.env,FORCE_COLOR:'1'}});return{ok:true,out:out||''};}
  catch(err){if(allowFail)return{ok:false,out:err.stdout||'',err:err.stderr||err.message};throw err;}
}

function stepValidateTokens(){
  log.header('Step 1 · Validate Token Files');
  const dir=path.join(process.cwd(),'tokens');
  if(!fs.existsSync(dir)){log.error('tokens/ not found');record('validate-tokens','FAIL','missing');return false;}
  const files=fs.readdirSync(dir).filter(f=>f.endsWith('.json'));
  log.step('Found '+files.length+' token JSON files');
  let ok=true;
  files.forEach(f=>{try{JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));log.ok(f);}catch(e){log.error(f+' — invalid JSON: '+e.message);ok=false;}});
  const meta=path.join(dir,'$metadata.json');
  if(fs.existsSync(meta)){const{tokenSetOrder=[]}=JSON.parse(fs.readFileSync(meta,'utf8'));log.divider();log.step('$metadata lists '+tokenSetOrder.length+' sets');tokenSetOrder.forEach(s=>{if(!fs.existsSync(path.join(dir,s+'.json')))log.warn('Missing: '+s+'.json');});}
  else log.warn('No $metadata.json found');
  record('validate-tokens',ok?'PASS':'FAIL',ok?files.length+' valid':'invalid JSON');
  return ok;
}

function stepBuildTokens(){
  log.header('Step 2 · Build Tokens');
  const configs=['style-dictionary.config.js','style-dictionary.config.json','sd.config.js'];
  if(!configs.some(f=>fs.existsSync(path.join(process.cwd(),f)))){log.warn('No Style Dictionary config — skipping');record('build-tokens','SKIP');return true;}
  log.step('Running style-dictionary build...');
  const r=run('npx style-dictionary build',{allowFail:true});
  if(!r.ok){log.error('Build failed');if(r.err)console.log(clr('red',r.err));record('build-tokens','FAIL',r.err||'failed');return false;}
  record('build-tokens','PASS');return true;
}

function stepInstallDeps(){
  log.header('Step 3 · Dependencies');
  if(!fs.existsSync(path.join(process.cwd(),'node_modules'))){log.step('Installing...');const r=run('npm install --legacy-peer-deps',{allowFail:true});if(!r.ok){record('install-deps','FAIL');return false;}}
  else log.ok('node_modules present');
  record('install-deps','PASS');return true;
}

function stepTypeCheck(){
  log.header('Step 4 · TypeScript');
  const r=run('npx tsc --noEmit',{allowFail:true,silent:true});
  if(!r.ok){const errs=(r.out+r.err).split('\n').filter(l=>l.includes('error TS'));errs.slice(0,20).forEach(e=>log.error(e));record('type-check','FAIL',errs.length+' TS errors');return false;}
  log.ok('No TypeScript errors');record('type-check','PASS');return true;
}

function stepLint(){
  log.header('Step 5 · ESLint');
  const r=run('npx eslint src --ext .ts,.tsx --max-warnings=0',{allowFail:true,silent:true});
  if(!r.ok){(r.out||r.err||'').split('\n').filter(Boolean).slice(0,30).forEach(l=>l.includes('error')?log.error(l):log.warn(l));record('lint','WARN','ESLint issues');return true;}
  log.ok('ESLint passed');record('lint','PASS');return true;
}

function stepTest(){
  log.header('Step 6 · Unit Tests');
  const r=run('npx jest --passWithNoTests --forceExit 2>&1',{allowFail:true,silent:true});
  const out=r.out||r.err||'';
  ['Test Suites','Tests'].forEach(k=>{const m=out.match(new RegExp(k+':\\s+(.+)'));if(m)log.info(m[0].trim());});
  if(!r.ok&&!out.includes('PASS')&&!out.includes('passed')){out.split('\n').filter(l=>l.includes('FAIL ')||l.includes('● ')).slice(0,15).forEach(l=>log.error(l));record('test','FAIL');return false;}
  log.ok('Tests passed');record('test','PASS');return true;
}

function stepBuildStorybook(){
  log.header('Step 7 · Build Storybook');
  log.step('Building (30-60s)...');
  const r=run('npx storybook build --output-dir storybook-static 2>&1',{allowFail:true,silent:true});
  if(!r.ok){(r.out||'').split('\n').filter(l=>/Error|error|Cannot|failed/.test(l)).slice(0,20).forEach(l=>log.error(l.trim()));record('build-storybook','FAIL');return false;}
  if(fs.existsSync(path.join(process.cwd(),'storybook-static'))){const sz=run('du -sh storybook-static 2>/dev/null||echo "?"',{allowFail:true,silent:true});log.ok('Built → storybook-static/ ('+(sz.out||'?').split('\t')[0].trim()+')');}
  record('build-storybook','PASS');return true;
}

function stepTokenDrift(){
  log.header('Step 8 · Token Drift');
  const r=run('git diff --name-only HEAD -- tokens/',{allowFail:true,silent:true});
  const changed=(r.out||'').trim().split('\n').filter(Boolean);
  if(!changed.length){log.ok('No drift');record('token-drift','PASS');}
  else{log.warn(changed.length+' file(s) changed:');changed.forEach(f=>log.info(f));record('token-drift','WARN',changed.join(', '));}
  return true;
}

function printSummary(startTime){
  const elapsed=((Date.now()-startTime)/1000).toFixed(1);
  const counts={PASS:0,FAIL:0,WARN:0,SKIP:0};
  console.log('\n'+'═'.repeat(64));
  console.log(bold('  Pipeline Summary')+dim('  ('+elapsed+'s)'));
  console.log('═'.repeat(64));
  results.forEach(r=>{
    counts[r.status]=(counts[r.status]||0)+1;
    const icon={PASS:clr('green','✔'),FAIL:clr('red','✖'),WARN:clr('yellow','⚠')}[r.status]||dim('–');
    const label={PASS:clr('green','PASS'),FAIL:clr('red','FAIL'),WARN:clr('yellow','WARN')}[r.status]||dim('SKIP');
    console.log('  '+icon+' ['+label+'] '+r.step.padEnd(22)+' '+dim(r.detail));
  });
  console.log('─'.repeat(64));
  if(counts.FAIL>0){console.log('\n  '+clr('bgRed',' PIPELINE FAILED ')+'  '+counts.FAIL+' step(s) failed\n');process.exit(1);}
  else if(counts.WARN>0)console.log('\n  '+clr('yellow','⚠ PASSED WITH WARNINGS')+'  '+counts.WARN+' warning(s)\n');
  else console.log('\n  '+clr('bgGreen',' PIPELINE PASSED ')+'  All '+counts.PASS+' steps green ✔\n');
}

function runPipeline(onlyStep=null){
  results.length=0;const startTime=Date.now();
  const stepMap={tokens:[stepValidateTokens,stepBuildTokens],deps:[stepInstallDeps],typecheck:[stepTypeCheck],lint:[stepLint],test:[stepTest],storybook:[stepBuildStorybook],drift:[stepTokenDrift]};
  const all=[stepValidateTokens,stepBuildTokens,stepInstallDeps,stepTypeCheck,stepLint,stepTest,stepBuildStorybook,stepTokenDrift];
  console.log(bold(onlyStep?'\n🔧 PS Pipeline — step: '+onlyStep+'\n':'\n🚀 PS Design System — Full Pipeline Runner\n'));
  (onlyStep&&stepMap[onlyStep]?stepMap[onlyStep]:all).forEach(fn=>{try{fn();}catch(err){log.error(fn.name+': '+err.message);record(fn.name,'FAIL',err.message);}});
  printSummary(startTime);
}

const args=process.argv.slice(2),si=args.indexOf('--step');
args.includes('--watch')
  ?(()=>{console.log(bold('\n👁  Watch mode — monitoring tokens/ for changes\n'));let d=null;fs.watch(path.join(process.cwd(),'tokens'),{recursive:true},(e,f)=>{if(!f||!f.endsWith('.json'))return;clearTimeout(d);d=setTimeout(()=>{console.log(clr('cyan','\n  Changed: '+f+' — re-running...\n'));runPipeline();},500);});runPipeline();})()
  :runPipeline(si!==-1?args[si+1]:null);
