const fs = require('fs');
const path = require('path');

const targetDirs = [
    path.join(__dirname, 'resources/js/components'),
    path.join(__dirname, 'resources/js/pages/Dashboard.tsx') // And also shrink the hero section in Dashboard.tsx itself
];

const standardButtonClasses = "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95";
const standardFullWidthButtonClasses = "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-95";

function processFile(filePath) {
    if (filePath.includes('public')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. HD Container adjustments
    content = content.replace(/rounded-\[2\.5rem\]/g, 'rounded-2xl');
    content = content.replace(/rounded-\[2rem\]/g, 'rounded-2xl');
    content = content.replace(/rounded-3xl/g, 'rounded-2xl');
    content = content.replace(/shadow-\[0_8px_30px_rgba\(0,0,0,0\.04\)\]/g, 'shadow-sm');
    content = content.replace(/shadow-\[0_8px_20px_rgba\([^)]+\)\]/g, 'shadow-sm');
    content = content.replace(/shadow-\[0_12px_25px_rgba\([^)]+\)\]/g, 'shadow-md');
    
    // Decrease paddings
    content = content.replace(/p-8/g, 'p-5');
    content = content.replace(/sm:p-12/g, 'sm:p-8');
    content = content.replace(/min-h-\[300px\]/g, 'min-h-[220px]'); // Shrink hero dashboard
    
    content = content.replace(/px-6 py-5/g, 'px-4 py-3');
    content = content.replace(/px-6 py-4/g, 'px-4 py-3');
    content = content.replace(/px-8 py-5/g, 'px-4 py-3');
    content = content.replace(/px-5 py-3\.5/g, 'px-3 py-2'); // Form inputs
    content = content.replace(/px-5 py-4/g, 'px-3 py-2'); // Form inputs

    // 2. HD Typography
    content = content.replace(/text-3xl font-extrabold/g, 'text-2xl font-bold');
    content = content.replace(/text-3xl font-bold/g, 'text-2xl font-bold');
    
    // Specifically target the Dashboard welcome text which is too large
    content = content.replace(/text-2xl font-bold tracking-tight text-slate-800 drop-shadow-sm sm:text-4xl md:text-5xl/g, 'text-2xl font-bold tracking-tight text-slate-800 drop-shadow-sm sm:text-3xl');

    content = content.replace(/font-extrabold/g, 'font-semibold');

    // 3. Action Buttons Standardization
    content = content.replace(/className=(["'])([^"']*?(?:bg-blue-600|bg-slate-900)[^"']*?text-white[^"']*?)\1/g, (match, quote, classStr) => {
        if (classStr.includes('w-full')) {
            const mtMatch = classStr.match(/mt-\d+/);
            const mbMatch = classStr.match(/mb-\d+/);
            const smWAuto = classStr.match(/sm:w-auto/);
            
            let extra = '';
            if (mtMatch) extra += mtMatch[0] + ' ';
            if (mbMatch) extra += mbMatch[0] + ' ';
            if (smWAuto) extra += smWAuto[0] + ' ';
            
            return `className=${quote}${extra}${standardFullWidthButtonClasses}${quote}`;
        } else {
            return `className=${quote}${standardButtonClasses}${quote}`;
        }
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function traversePath(targetPath) {
    if (fs.statSync(targetPath).isDirectory()) {
        const files = fs.readdirSync(targetPath);
        files.forEach(file => {
            const fullPath = path.join(targetPath, file);
            if (fs.statSync(fullPath).isDirectory()) {
                traversePath(fullPath);
            } else if (fullPath.endsWith('.tsx')) {
                processFile(fullPath);
            }
        });
    } else if (targetPath.endsWith('.tsx')) {
        processFile(targetPath);
    }
}

targetDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        traversePath(dir);
    }
});
console.log('UI Standardization Complete for components!');
