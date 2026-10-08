const fs = require('fs');

let lf = fs.readFileSync('src/components/LeadForm.tsx', 'utf8');

// Insert validation functions
const validationFuncs = `
  const handleNextStep1 = () => {
    if (!name.trim()) return toast.error('Please enter Proposer Name');
    if (!email.trim() || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) return toast.error('Please enter a valid email address');
    if (!mobile.trim() || !/^[0-9]{10}$/.test(mobile)) return toast.error('Please enter a valid 10-digit mobile number');
    if (!ages.trim()) return toast.error('Please enter Ages');
    setHealthStep(2);
  };

  const handleNextStep2 = () => {
    if (medicalConditions.length === 0) return toast.error('Please select at least one medical condition');
    if (medicalConditions.includes('Other Diseases') && !otherDiseaseName.trim()) {
      return toast.error('Please enter the disease name');
    }
    setHealthStep(3);
  };

  const handleNextStep3 = () => {
    if (!healthCover) return toast.error('Please select a cover amount');
    setHealthStep(4);
  };

  const handleNextStep4 = () => {
    if (!smoker) return toast.error('Please select an option');
    setHealthStep(5);
  };
`;

lf = lf.replace("const handleSubmit = async () => {", validationFuncs + "\n  const handleSubmit = async () => {");

// Replace onClick handlers
lf = lf.replace(/onClick=\{\(\) => setHealthStep\(2\)\}>NEXT - MEDICAL DETAILS/g, "onClick={handleNextStep1}>NEXT - MEDICAL DETAILS");
lf = lf.replace(/onClick=\{\(\) => setHealthStep\(3\)\}>NEXT - COVER AMOUNT/g, "onClick={handleNextStep2}>NEXT - COVER AMOUNT");
lf = lf.replace(/onClick=\{\(\) => setHealthStep\(4\)\}>NEXT</g, "onClick={handleNextStep3}>NEXT<");
lf = lf.replace(/onClick=\{\(\) => setHealthStep\(5\)\}>REVIEW & CONFIRM/g, "onClick={handleNextStep4}>REVIEW & CONFIRM");

fs.writeFileSync('src/components/LeadForm.tsx', lf, 'utf8');
console.log('Validation added');
