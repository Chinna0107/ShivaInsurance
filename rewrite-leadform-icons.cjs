const fs = require('fs');

let content = fs.readFileSync('src/components/LeadForm.tsx', 'utf8');

// 1. Ensure lucide-react imports
if (!content.includes('User,')) {
  content = content.replace(
    "import { Shield, Heart, Car } from 'lucide-react';",
    "import { Shield, Heart, Car, User, Mail, Phone, Calendar, Hash, Factory, CarFront, FileText, MapPin, CheckCircle, PlusCircle, UserCircle, Briefcase, IndianRupee, GraduationCap } from 'lucide-react';"
  );
}

// 2. Add required to labels
content = content.replace(/<label>Proposer Name<\/label>/g, '<label className="required">Proposer Name</label>');
content = content.replace(/<label>Email Address<\/label>/g, '<label className="required">Email Address</label>');
content = content.replace(/<label>Mobile Number<\/label>/g, '<label className="required">Mobile Number</label>');
content = content.replace(/<label>Age \/ Family Members Ages<\/label>/g, '<label className="required">Age / Family Members Ages</label>');
content = content.replace(/<label>Age<\/label>/g, '<label className="required">Age</label>');
content = content.replace(/<label>Vehicle Number<\/label>/g, '<label className="required">Vehicle Number</label>');
content = content.replace(/<label>Vehicle Type<\/label>/g, '<label className="required">Vehicle Type</label>');
content = content.replace(/<label>Manufacturer<\/label>/g, '<label className="required">Manufacturer</label>');
content = content.replace(/<label>Model<\/label>/g, '<label className="required">Model</label>');
content = content.replace(/<label>Registration Date<\/label>/g, '<label className="required">Registration Date</label>');
content = content.replace(/<label>Education<\/label>/g, '<label className="required">Education</label>');
content = content.replace(/<label>Employment<\/label>/g, '<label className="required">Employment</label>');
// PIN Code is optional? User might want it optional or required. Let's make it optional visually.

// 3. Inject Input Wrappers with Icons
const replaceInput = (label, iconComp, regex) => {
  content = content.replace(regex, (match) => {
    return `<div className="input-with-icon">\n                  ${iconComp}\n                  ${match}\n                </div>`;
  });
};

replaceInput('Name', '<User size={18} className="input-icon" />', /<input type="text" placeholder="Enter \/ Select" value=\{name\}.*\/>/g);
replaceInput('Email', '<Mail size={18} className="input-icon" />', /<input type="email" placeholder="Enter \/ Select" value=\{email\}.*\/>/g);
replaceInput('Mobile', '<Phone size={18} className="input-icon" />', /<input type="tel" placeholder="Enter \/ Select" value=\{mobile\}.*\/>/g);
replaceInput('AgeHealth', '<Calendar size={18} className="input-icon" />', /<input type="text" placeholder="Husband, Wife, Children, Father, Mother".*\/>/g);
replaceInput('AgeLife', '<Calendar size={18} className="input-icon" />', /<input type="text" placeholder="Enter \/ Select" value=\{lifeAge\}.*\/>/g);

replaceInput('VehicleNumber', '<Hash size={18} className="input-icon" />', /<input type="text" placeholder="MH 01 AB 1234".*\/>/g);
replaceInput('VehicleType', '<CarFront size={18} className="input-icon" />', /<select value=\{vehicleType\}.*>[\s\S]*?<\/select>/g);
replaceInput('Manufacturer', '<Factory size={18} className="input-icon" />', /<input type="text" placeholder="e.g. Honda, Maruti".*\/>/g);
replaceInput('Model', '<Car size={18} className="input-icon" />', /<input type="text" placeholder="e.g. City, Swift".*\/>/g);
replaceInput('FuelType', '<FileText size={18} className="input-icon" />', /<select value=\{fuelType\}.*>[\s\S]*?<\/select>/g);
replaceInput('RegDate', '<Calendar size={18} className="input-icon" />', /<input type="date" value=\{registrationDate\}.*\/>/g);
replaceInput('PIN', '<MapPin size={18} className="input-icon" />', /<input type="text" placeholder="Enter PIN".*\/>/g);

replaceInput('Education', '<GraduationCap size={18} className="input-icon" />', /<select value=\{education\}.*>[\s\S]*?<\/select>/g);
replaceInput('Employment', '<Briefcase size={18} className="input-icon" />', /<select value=\{employment\}.*>[\s\S]*?<\/select>/g);


fs.writeFileSync('src/components/LeadForm.tsx', content, 'utf8');
console.log('Icons and required labels injected.');
