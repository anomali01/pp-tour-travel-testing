const { PDFParse } = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

async function main() {
  const files = [
    'Laporan_Hasil_Pengujian (Unit dan Integration).pdf',
    'Laporan_Hasil_Pengujian (System).pdf',
  ];
  for (const f of files) {
    const buf = fs.readFileSync(path.join(ROOT, 'Dokumen_test', f));
    const parser = new PDFParse();
    const data = await parser.parse(buf);
    console.log(`\n====== ${f} ======`);
    console.log('Pages:', data.numpages);
    console.log('--- TEXT (first 8000 chars) ---');
    const text = data.text || (data.pages && data.pages.map(p => p.text || '').join('\n'));
    console.log(typeof text === 'string' ? text.slice(0, 8000) : JSON.stringify(data).slice(0, 3000));
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
