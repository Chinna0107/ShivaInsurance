const fs = require('fs');

let adminLayout = fs.readFileSync('src/components/admin/AdminLayout.tsx', 'utf8');
if (!adminLayout.includes('to="/admin/dashboard/claims"')) {
    adminLayout = adminLayout.replace(
        /(<Link\s+to="\/admin\/dashboard\/claim-ratios"[^>]*>[\s\S]*?<\/Link>)/,
        '$1\n          <Link to="/admin/dashboard/claims" className={`sidebar-link ${location.pathname === \'/admin/dashboard/claims\' ? \'active\' : \'\'}`}>Claim Requests</Link>'
    );
    fs.writeFileSync('src/components/admin/AdminLayout.tsx', adminLayout, 'utf8');
}

let empLayout = fs.readFileSync('src/components/employee/EmployeeLayout.tsx', 'utf8');
if (!empLayout.includes('to="/employee/dashboard/claims"')) {
    empLayout = empLayout.replace(
        /(<Link\s+to="\/employee\/dashboard\/call-requests"[^>]*>[\s\S]*?<\/Link>)/,
        '$1\n          <Link to="/employee/dashboard/claims" className={`sidebar-link ${location.pathname === \'/employee/dashboard/claims\' ? \'active\' : \'\'}`}>Claim Requests</Link>'
    );
    fs.writeFileSync('src/components/employee/EmployeeLayout.tsx', empLayout, 'utf8');
}
console.log('Nav fixed');
