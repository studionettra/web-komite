const fs = require('fs');
const path = require('path');

const files = [
    'resources/js/pages/public/AcademicCalendar.tsx',
    'resources/js/pages/public/AcademicCalendarGate.tsx',
    'resources/js/pages/public/Finance.tsx',
    'resources/js/pages/public/FinanceGate.tsx',
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Find <Head ... /> or <Head>...</Head> and insert noindex.
        // The easiest way is to replace `<Head title="..."/>` with `<Head title="..."><meta name="robots" content="noindex, nofollow" /></Head>`
        // Or if it's `<Head title="..."></Head>`, etc.
        
        // Let's just find the Head component block.
        if (!content.includes('name="robots" content="noindex, nofollow"')) {
            content = content.replace(/<Head\s+title="([^"]+)"\s*\/>/g, '<Head title="$1">\n                <meta name="robots" content="noindex, nofollow" />\n            </Head>');
            content = content.replace(/<Head\s+title=\{([^}]+)\}\s*\/>/g, '<Head title={$1}>\n                <meta name="robots" content="noindex, nofollow" />\n            </Head>');
            
            // Also if there's a standalone <Head> tag without self closing:
            content = content.replace(/<Head>\s*<title>([^<]+)<\/title>/g, '<Head>\n                <title>$1</title>\n                <meta name="robots" content="noindex, nofollow" />');
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Added noindex to ' + file);
        }
    }
});
