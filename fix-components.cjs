const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'resources/js/components/dashboard');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'SuperadminDashboard.tsx'); // Skip superadmin as I just manually perfected it

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // HD Layout Shrinking
    // Icons:
    content = content.replace(/h-12 w-12/g, 'h-10 w-10');
    content = content.replace(/rounded-\[1\.25rem\]/g, 'rounded-lg');
    content = content.replace(/className="h-6 w-6"/g, 'className="h-5 w-5"');
    content = content.replace(/className="h-5 w-5"/g, 'className="h-4 w-4"'); // some inner icons
    
    // Cards:
    content = content.replace(/rounded-2xl/g, 'rounded-xl');
    content = content.replace(/sm:p-6/g, ''); // just use p-5 which is already there, or change p-5 to p-4
    // Wait, previously it was `p-5 sm:p-6`. If I remove sm:p-6 it's just `p-5`.
    
    // Typography:
    content = content.replace(/text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl/g, 'text-2xl font-bold tracking-tight text-slate-900');
    content = content.replace(/text-sm font-bold text-slate-500/g, 'text-xs font-semibold text-slate-500 uppercase tracking-wide');
    
    // Headings:
    content = content.replace(/text-xl font-semibold tracking-tight text-slate-800 sm:text-2xl/g, 'text-lg font-bold tracking-tight text-slate-900');
    content = content.replace(/text-2xl font-semibold tracking-tight text-slate-800/g, 'text-lg font-bold tracking-tight text-slate-900');
    content = content.replace(/text-base font-semibold text-slate-100/g, 'text-sm font-semibold text-slate-100'); // aksi cepat
    
    // Sub-headings (Program Berjalan etc)
    content = content.replace(/text-base font-semibold text-slate-800 sm:text-lg/g, 'text-sm font-semibold text-slate-900');
    content = content.replace(/text-lg font-semibold text-slate-800/g, 'text-sm font-semibold text-slate-900');
    content = content.replace(/text-slate-800/g, 'text-slate-900');
    
    // Padding in lists:
    content = content.replace(/p-4 sm:p-5/g, 'p-4');
    
    // Links "Aksi Cepat" padding
    content = content.replace(/px-4 py-3 text-sm font-bold text-white/g, 'px-3 py-2 text-xs font-semibold text-white');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated HD components: ${file}`);
});
