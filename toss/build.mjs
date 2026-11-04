// 건들북 토스 빌드: 저장소 루트의 웹판(index.html + assets/)을 dist/로 옮기고 앱인토스 SDK를 넣는다.
// 웹과 토스는 같은 index.html을 쓴다. 토스에서만 window.AIT가 생겨 토스 전용 동작이 켜진다.
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
const ROOT = '..', OUT = 'dist';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(`${OUT}/vendor`, { recursive: true });
fs.mkdirSync(`${OUT}/assets`, { recursive: true });
await build({ entryPoints: ['src/ait-entry.js'], bundle: true, minify: true, format: 'iife', target: ['es2020'], outfile: `${OUT}/vendor/ait.js`, logLevel: 'warning' });
// 토스에 필요 없는 것(미리보기 그림 등)은 빼고 글꼴·로고만
const KEEP = /\.(woff2|png)$/;
for (const f of fs.readdirSync(`${ROOT}/assets`)) if (KEEP.test(f) && f !== 'og.png') fs.copyFileSync(path.join(ROOT, 'assets', f), path.join(OUT, 'assets', f));
let html = fs.readFileSync(`${ROOT}/index.html`, 'utf8');
const appName = /appName:\s*"([^"]+)"/.exec(fs.readFileSync('apps-in-toss.config.ts', 'utf8'))[1];
if (!html.includes("APP_NAME='gundle-book'")) throw new Error('APP_NAME not found in index.html');
html = html.replace("APP_NAME='gundle-book'", `APP_NAME='${appName}'`);
// SDK는 앱 코드보다 먼저
const i = html.indexOf('<script>');
if (i < 0) throw new Error('<script> not found');
html = html.slice(0, i) + '<script src="vendor/ait.js"></script>\n' + html.slice(i);
// 웹 전용 태그(미리보기·canonical)는 토스에선 의미 없음
html = html.replace(/<meta property="og:[^>]*>\n?/g, '').replace(/<meta name="twitter:[^>]*>\n?/g, '').replace(/<link rel="canonical"[^>]*>\n?/g, '');
html = html.replace('<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">', '<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">\n<meta name="format-detection" content="telephone=no">');
fs.writeFileSync(`${OUT}/index.html`, html);
const sz = d => fs.readdirSync(d, { recursive: true }).map(f => path.join(d, f)).filter(f => fs.statSync(f).isFile()).reduce((a, f) => a + fs.statSync(f).size, 0);
console.log('dist', (sz(OUT) / 1e6).toFixed(2), 'MB');
