import React, { useState } from 'react';
import { Copy, FileText, Briefcase, Mail, User, Building, Lightbulb, Clock, Award, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  jobTitle: string;
  companyName: string;
  skills: string;
  experience: string;
  customMessage: string;
  category: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    jobTitle: '',
    companyName: '',
    skills: '',
    experience: '',
    customMessage: '',
    category: 'technology'
  });

  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const jobCategories = [
    { value: 'technology', label: 'Information Technology' },
    { value: 'marketing', label: 'Marketing & Sales' },
    { value: 'finance', label: 'Finance & Accounting' },
    { value: 'healthcare', label: 'Healthcare & Medical' },
    { value: 'education', label: 'Education & Training' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'creative', label: 'Creative & Design' },
    { value: 'administrative', label: 'Administrative' },
    { value: 'customer-service', label: 'Customer Service' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateCoverLetter = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const letter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${formData.jobTitle} position at ${formData.companyName}. With my background in ${formData.category.replace('-', ' ')} and ${formData.experience} of experience, I am confident that I would be a valuable addition to your team.

In my previous roles, I have developed expertise in ${formData.skills}, which directly aligns with the requirements for this position. My experience has taught me the importance of ${getCategorySpecificSkills(formData.category)}, and I am excited about the opportunity to bring these skills to ${formData.companyName}.

${formData.customMessage ? formData.customMessage + '\n\n' : ''}What particularly draws me to ${formData.companyName} is your commitment to ${getCategorySpecificValues(formData.category)}. I am eager to contribute to your team's success and help drive your organization's continued growth and innovation.

I would welcome the opportunity to discuss how my background and enthusiasm can contribute to your team. Thank you for considering my application. I look forward to hearing from you soon.

Sincerely,
${formData.name}
${formData.email}`;

      setGeneratedLetter(letter);
      setIsGenerating(false);
    }, 2000);
  };

  const getCategorySpecificSkills = (category: string): string => {
    const skills = {
      'technology': 'innovation, problem-solving, and staying current with emerging technologies',
      'marketing': 'creative thinking, data analysis, and customer engagement',
      'finance': 'attention to detail, analytical thinking, and regulatory compliance',
      'healthcare': 'patient care, attention to detail, and continuous learning',
      'education': 'communication, patience, and adaptability',
      'engineering': 'precision, technical expertise, and project management',
      'creative': 'innovation, visual communication, and brand development',
      'administrative': 'organization, multitasking, and process improvement',
      'customer-service': 'communication, empathy, and problem resolution',
      'other': 'adaptability, teamwork, and continuous improvement'
    };
    return skills[category as keyof typeof skills] || skills.other;
  };

  const getCategorySpecificValues = (category: string): string => {
    const values = {
      'technology': 'technological innovation and digital transformation',
      'marketing': 'brand excellence and customer satisfaction',
      'finance': 'financial integrity and strategic growth',
      'healthcare': 'patient care and medical excellence',
      'education': 'learning and development',
      'engineering': 'technical excellence and sustainable solutions',
      'creative': 'creativity and brand innovation',
      'administrative': 'operational excellence and efficiency',
      'customer-service': 'customer satisfaction and service excellence',
      'other': 'excellence and innovation'
    };
    return values[category as keyof typeof values] || values.other;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLetter);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const isFormValid = formData.name && formData.email && formData.jobTitle && formData.companyName;

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ backgroundColor: '#1e40af' }}>
        <div className="container">
          <a className="navbar-brand fw-bold d-flex align-items-center" href="#" style={{ fontSize: '1.5rem' }}>
            <FileText className="me-2" size={28} />
            Cover Letter Generator
          </a>
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link px-3 py-2 rounded-pill mx-1 transition-all" href="#tool" style={{ transition: 'all 0.3s ease' }}>Generator</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3 py-2 rounded-pill mx-1 transition-all" href="#guide" style={{ transition: 'all 0.3s ease' }}>Guide</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3 py-2 rounded-pill mx-1 transition-all" href="#faq" style={{ transition: 'all 0.3s ease' }}>FAQ</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-3 py-2 rounded-pill mx-1 transition-all" href="#about" style={{ transition: 'all 0.3s ease' }}>About</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-white py-5" style={{ 
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
        minHeight: '60vh'
      }}>
        <div className="container">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4 lh-1" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                Free Online Cover Letter Generator
              </h1>
              <p className="lead mb-4 fs-5" style={{ lineHeight: '1.6', opacity: '0.95' }}>
                Create professional, ATS-friendly cover letters in minutes. Our AI-powered tool helps you craft compelling job applications that get noticed by employers.
              </p>
              <div className="d-flex flex-wrap gap-4 mb-4">
                <div className="d-flex align-items-center bg-white bg-opacity-10 rounded-pill px-3 py-2">
                  <Clock className="me-2" size={20} />
                  <span className="fw-medium">Generate in 2 minutes</span>
                </div>
                <div className="d-flex align-items-center bg-white bg-opacity-10 rounded-pill px-3 py-2">
                  <Award className="me-2" size={20} />
                  <span className="fw-medium">ATS-Optimized</span>
                </div>
                <div className="d-flex align-items-center bg-white bg-opacity-10 rounded-pill px-3 py-2">
                  <FileText className="me-2" size={20} />
                  <span className="fw-medium">Professional Templates</span>
                </div>
              </div>
              <a href="#tool" className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-semibold shadow-lg" style={{ 
                transition: 'all 0.3s ease',
                fontSize: '1.1rem'
              }}>
                Start Creating Now
              </a>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="text-center">
                <div className="bg-white rounded-4 shadow-lg p-5 d-inline-block" style={{ 
                  transform: 'rotate(-2deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  <FileText size={120} style={{ color: '#1e40af' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Tool Section */}
      <main className="py-5" id="tool" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 h-100" style={{ borderRadius: '1rem' }}>
                <div className="card-header text-white border-0 py-4" style={{ 
                  backgroundColor: '#1e40af',
                  borderRadius: '1rem 1rem 0 0'
                }}>
                  <h2 className="card-title mb-0 h4 d-flex align-items-center fw-semibold">
                    <User className="me-3" size={24} />
                    Enter Your Information
                  </h2>
                </div>
                <div className="card-body p-4">
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label fw-semibold text-dark mb-2">
                          <User size={16} className="me-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg border-2 rounded-3"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                          style={{ 
                            fontSize: '1rem',
                            padding: '0.75rem 1rem',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label fw-semibold text-dark mb-2">
                          <Mail size={16} className="me-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-lg border-2 rounded-3"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john.doe@email.com"
                          required
                          style={{ 
                            fontSize: '1rem',
                            padding: '0.75rem 1rem',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="row g-3 mt-2">
                      <div className="col-md-6">
                        <label htmlFor="jobTitle" className="form-label fw-semibold text-dark mb-2">
                          <Briefcase size={16} className="me-2" />
                          Job Title *
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg border-2 rounded-3"
                          id="jobTitle"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleInputChange}
                          placeholder="Software Developer"
                          required
                          style={{ 
                            fontSize: '1rem',
                            padding: '0.75rem 1rem',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="companyName" className="form-label fw-semibold text-dark mb-2">
                          <Building size={16} className="me-2" />
                          Company Name *
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg border-2 rounded-3"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="Tech Corp Inc."
                          required
                          style={{ 
                            fontSize: '1rem',
                            padding: '0.75rem 1rem',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="category" className="form-label fw-semibold text-dark mb-2">
                        <Lightbulb size={16} className="me-2" />
                        Job Category
                      </label>
                      <select
                        className="form-select form-select-lg border-2 rounded-3"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        style={{ 
                          fontSize: '1rem',
                          padding: '0.75rem 1rem',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {jobCategories.map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="skills" className="form-label fw-semibold text-dark mb-2">
                        Relevant Skills
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg border-2 rounded-3"
                        id="skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        placeholder="JavaScript, React, Node.js, Problem Solving"
                        style={{ 
                          fontSize: '1rem',
                          padding: '0.75rem 1rem',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    </div>

                    <div className="mt-4">
                      <label htmlFor="experience" className="form-label fw-semibold text-dark mb-2">
                        Years of Experience
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg border-2 rounded-3"
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="3 years"
                        style={{ 
                          fontSize: '1rem',
                          padding: '0.75rem 1rem',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    </div>

                    <div className="mt-4">
                      <label htmlFor="customMessage" className="form-label fw-semibold text-dark mb-2">
                        Additional Message (Optional)
                      </label>
                      <textarea
                        className="form-control border-2 rounded-3"
                        id="customMessage"
                        name="customMessage"
                        rows={4}
                        value={formData.customMessage}
                        onChange={handleInputChange}
                        placeholder="Add any specific achievements or additional information..."
                        style={{ 
                          fontSize: '1rem',
                          padding: '0.75rem 1rem',
                          transition: 'all 0.3s ease',
                          resize: 'vertical'
                        }}
                      ></textarea>
                    </div>

                    <button
                      type="button"
                      className="btn btn-lg w-100 mt-4 py-3 rounded-3 fw-semibold"
                      onClick={generateCoverLetter}
                      disabled={!isFormValid || isGenerating}
                      style={{ 
                        backgroundColor: isFormValid && !isGenerating ? '#1e40af' : '#6b7280',
                        color: 'white',
                        border: 'none',
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {isGenerating ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-3" role="status"></span>
                          Generating Your Cover Letter...
                        </>
                      ) : (
                        <>
                          <FileText className="me-3" size={20} />
                          Generate Cover Letter
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card shadow-sm border-0 h-100" style={{ borderRadius: '1rem' }}>
                <div className="card-header text-white border-0 py-4 d-flex justify-content-between align-items-center" style={{ 
                  backgroundColor: '#059669',
                  borderRadius: '1rem 1rem 0 0'
                }}>
                  <h3 className="card-title mb-0 h4 d-flex align-items-center fw-semibold">
                    <FileText className="me-3" size={24} />
                    Generated Cover Letter
                  </h3>
                  {generatedLetter && (
                    <button
                      className="btn btn-light btn-sm rounded-pill px-3 py-2 fw-medium"
                      onClick={copyToClipboard}
                      title="Copy to clipboard"
                      style={{ transition: 'all 0.3s ease' }}
                    >
                      {copySuccess ? (
                        <>
                          <CheckCircle size={16} className="me-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} className="me-2" />
                          Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
                <div className="card-body p-4">
                  {generatedLetter ? (
                    <div className="border-0 rounded-3 p-4" style={{ 
                      backgroundColor: '#f8fafc',
                      minHeight: '500px',
                      border: '2px solid #e2e8f0'
                    }}>
                      <pre className="mb-0" style={{ 
                        whiteSpace: 'pre-wrap', 
                        fontFamily: "'Inter', sans-serif", 
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        color: '#374151'
                      }}>
                        {generatedLetter}
                      </pre>
                    </div>
                  ) : (
                    <div className="text-center text-muted py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '500px' }}>
                      <FileText size={80} className="mb-4" style={{ opacity: '0.3' }} />
                      <h5 className="mb-2 fw-semibold">Your cover letter will appear here</h5>
                      <p className="mb-0 text-muted">Fill out the form and click "Generate Cover Letter" to get started</p>
                    </div>
                  )}
                  
                  {/* AdSense Placeholder */}
                  <div className="mt-4 p-4 rounded-3 text-center" style={{ backgroundColor: '#f1f5f9', border: '2px dashed #cbd5e1' }}>
                    <small className="text-muted fw-medium">Advertisement</small>
                    <div style={{ height: '100px' }} className="d-flex align-items-center justify-content-center">
                      <span className="text-muted">[AdSense Ad Space - 320x100]</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AdSense Placeholder - Content Area */}
      <section className="py-4" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="text-center">
            <div className="p-4 rounded-3 bg-white shadow-sm" style={{ border: '2px dashed #cbd5e1' }}>
              <small className="text-muted fw-medium">Advertisement</small>
              <div style={{ height: '90px' }} className="d-flex align-items-center justify-content-center">
                <span className="text-muted">[AdSense Ad Space - Leaderboard 728x90]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="py-5 bg-white" id="guide">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-4" style={{ color: '#1e293b' }}>
                  Complete Guide to Writing Professional Cover Letters
                </h2>
                <p className="lead text-muted fs-5">
                  Master the art of cover letter writing with our comprehensive guide
                </p>
              </div>
              
              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <div className="text-center p-4 rounded-4 h-100" style={{ backgroundColor: '#f8fafc' }}>
                    <div className="rounded-circle p-4 d-inline-block mb-4" style={{ backgroundColor: '#1e40af' }}>
                      <FileText size={32} className="text-white" />
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: '#1e293b' }}>What is a Cover Letter?</h4>
                    <p className="text-muted lh-lg">A cover letter is a one-page document that accompanies your resume when applying for jobs. It introduces you to potential employers and explains why you're the perfect candidate for the position.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-4 rounded-4 h-100" style={{ backgroundColor: '#f0fdf4' }}>
                    <div className="rounded-circle p-4 d-inline-block mb-4" style={{ backgroundColor: '#059669' }}>
                      <Award size={32} className="text-white" />
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: '#1e293b' }}>Why Cover Letters Matter</h4>
                    <p className="text-muted lh-lg">Cover letters help you stand out from other applicants by showcasing your personality, demonstrating your communication skills, and explaining how your experience aligns with the job requirements.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-4 rounded-4 h-100" style={{ backgroundColor: '#fef3c7' }}>
                    <div className="rounded-circle p-4 d-inline-block mb-4" style={{ backgroundColor: '#d97706' }}>
                      <Lightbulb size={32} className="text-white" />
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: '#1e293b' }}>How Our Tool Helps</h4>
                    <p className="text-muted lh-lg">Our AI-powered generator creates personalized, professional cover letters in minutes. Simply enter your information, and we'll craft a compelling letter tailored to your industry and experience level.</p>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg mx-auto" style={{ maxWidth: '800px' }}>
                <h3 className="fw-bold mb-4 mt-5" style={{ color: '#1e293b', fontSize: '1.75rem' }}>
                  The Importance of a Well-Written Cover Letter for Job Applications
                </h3>
                
                <p className="lead mb-4" style={{ fontSize: '1.2rem', lineHeight: '1.7', color: '#4b5563' }}>
                  In today's competitive job market, a well-crafted cover letter can be the difference between landing an interview and having your application overlooked. While many job seekers focus primarily on their resume, the cover letter serves as your personal introduction and first impression with potential employers.
                </p>

                <h4 className="fw-semibold mb-3 mt-5" style={{ color: '#1e293b', fontSize: '1.5rem' }}>
                  Why Every Job Seeker Needs a Strong Cover Letter
                </h4>
                
                <p className="mb-4" style={{ lineHeight: '1.7', color: '#4b5563' }}>
                  A professional cover letter serves multiple critical purposes in your job application process. First and foremost, it provides context for your resume by explaining the specific role you're applying for and why you're interested in the position. Unlike a resume, which presents a structured overview of your qualifications, a cover letter allows you to tell your professional story in a more personal and engaging way.
                </p>

                <p className="mb-4" style={{ lineHeight: '1.7', color: '#4b5563' }}>
                  Research consistently shows that hiring managers spend an average of 6-10 seconds initially reviewing a resume. However, a compelling cover letter can capture their attention and encourage them to spend more time reviewing your qualifications. This additional attention can significantly increase your chances of advancing to the interview stage.
                </p>

                <h4 className="fw-semibold mb-3 mt-5" style={{ color: '#1e293b', fontSize: '1.5rem' }}>
                  Key Elements of an Effective Cover Letter
                </h4>

                <p className="mb-4" style={{ lineHeight: '1.7', color: '#4b5563' }}>
                  The most successful cover letters share several common characteristics that make them effective tools for job seekers. Understanding these elements will help you create letters that consistently generate positive responses from employers.
                </p>

                <p className="mb-4" style={{ lineHeight: '1.7', color: '#4b5563' }}>
                  <strong style={{ color: '#1e293b' }}>Personalization and Research:</strong> Generic cover letters are easily spotted by hiring managers and typically result in immediate rejection. Effective cover letters demonstrate that you've researched the company and understand their needs. This means addressing the letter to a specific person when possible, mentioning the company by name, and referencing specific aspects of the organization that appeal to you.
                </p>

                <p className="mb-4" style={{ lineHeight: '1.7', color: '#4b5563' }}>
                  <strong style={{ color: '#1e293b' }}>Clear Value Proposition:</strong> Your cover letter should clearly articulate what value you bring to the organization. This goes beyond simply restating your resume qualifications. Instead, focus on specific achievements and experiences that directly relate to the job requirements. Use concrete examples and quantifiable results whenever possible to demonstrate your impact in previous roles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5" id="faq" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-4" style={{ color: '#1e293b' }}>
                  Frequently Asked Questions
                </h2>
                <p className="lead text-muted">
                  Get answers to common questions about cover letters
                </p>
              </div>
              
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item border-0 mb-3 rounded-3 shadow-sm">
                  <h3 className="accordion-header" id="faq1">
                    <button className="accordion-button fw-semibold rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" style={{ 
                      fontSize: '1.1rem',
                      backgroundColor: '#ffffff',
                      color: '#1e293b'
                    }}>
                      How do I write a professional cover letter?
                    </button>
                  </h3>
                  <div id="collapse1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body" style={{ lineHeight: '1.7', color: '#4b5563' }}>
                      A professional cover letter should include your contact information, the employer's details, a compelling opening paragraph, 2-3 body paragraphs highlighting relevant skills and experience, and a strong closing with a call to action. Always customize it for each specific job application and company.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 mb-3 rounded-3 shadow-sm">
                  <h3 className="accordion-header" id="faq2">
                    <button className="accordion-button collapsed fw-semibold rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" style={{ 
                      fontSize: '1.1rem',
                      backgroundColor: '#ffffff',
                      color: '#1e293b'
                    }}>
                      What should I include in my cover letter?
                    </button>
                  </h3>
                  <div id="collapse2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body" style={{ lineHeight: '1.7', color: '#4b5563' }}>
                      Include your name, contact information, the specific job title you're applying for, relevant skills and experience that match the job requirements, specific examples of your achievements, and why you're interested in the company. Avoid repeating everything from your resume.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 mb-3 rounded-3 shadow-sm">
                  <h3 className="accordion-header" id="faq3">
                    <button className="accordion-button collapsed fw-semibold rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" style={{ 
                      fontSize: '1.1rem',
                      backgroundColor: '#ffffff',
                      color: '#1e293b'
                    }}>
                      How long should a cover letter be?
                    </button>
                  </h3>
                  <div id="collapse3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body" style={{ lineHeight: '1.7', color: '#4b5563' }}>
                      A cover letter should typically be one page long, consisting of 3-4 paragraphs and around 250-400 words. It should be concise while effectively communicating your qualifications and interest in the position.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 mb-3 rounded-3 shadow-sm">
                  <h3 className="accordion-header" id="faq4">
                    <button className="accordion-button collapsed fw-semibold rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" style={{ 
                      fontSize: '1.1rem',
                      backgroundColor: '#ffffff',
                      color: '#1e293b'
                    }}>
                      Do I need a cover letter for every job application?
                    </button>
                  </h3>
                  <div id="collapse4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body" style={{ lineHeight: '1.7', color: '#4b5563' }}>
                      While not every job posting explicitly requires a cover letter, including one shows initiative and provides an opportunity to differentiate yourself from other candidates. It's generally recommended to include a cover letter unless specifically instructed not to.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 mb-3 rounded-3 shadow-sm">
                  <h3 className="accordion-header" id="faq5">
                    <button className="accordion-button collapsed fw-semibold rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" style={{ 
                      fontSize: '1.1rem',
                      backgroundColor: '#ffffff',
                      color: '#1e293b'
                    }}>
                      How can I make my cover letter stand out?
                    </button>
                  </h3>
                  <div id="collapse5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body" style={{ lineHeight: '1.7', color: '#4b5563' }}>
                      Make your cover letter stand out by researching the company thoroughly, using specific examples of your achievements with quantifiable results, addressing the hiring manager by name when possible, and showing genuine enthusiasm for the role and company.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-5 bg-white" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 fw-bold mb-4" style={{ color: '#1e293b' }}>
                About Our Cover Letter Generator
              </h2>
              <p className="lead mb-5" style={{ fontSize: '1.2rem', lineHeight: '1.7', color: '#4b5563' }}>
                Our free online cover letter generator helps job seekers create professional, compelling cover letters that get results. Using advanced AI technology, we craft personalized letters tailored to your industry and experience level.
              </p>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="p-4 rounded-4 h-100" style={{ backgroundColor: '#f0fdf4' }}>
                    <div className="rounded-circle p-3 d-inline-block mb-3" style={{ backgroundColor: '#059669' }}>
                      <CheckCircle size={24} className="text-white" />
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: '#1e293b' }}>100% Free</h4>
                    <p className="text-muted">Create unlimited cover letters without any cost or hidden fees.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-4 rounded-4 h-100" style={{ backgroundColor: '#fef3c7' }}>
                    <div className="rounded-circle p-3 d-inline-block mb-3" style={{ backgroundColor: '#d97706' }}>
                      <Lightbulb size={24} className="text-white" />
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: '#1e293b' }}>AI-Powered</h4>
                    <p className="text-muted">Advanced algorithms ensure your letter is professional and effective.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-4 rounded-4 h-100" style={{ backgroundColor: '#f8fafc' }}>
                    <div className="rounded-circle p-3 d-inline-block mb-3" style={{ backgroundColor: '#1e40af' }}>
                      <Award size={24} className="text-white" />
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: '#1e293b' }}>Industry-Specific</h4>
                    <p className="text-muted">Tailored content for different job categories and industries.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-5" style={{ backgroundColor: '#1e293b' }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <h5 className="fw-bold mb-3 fs-4">Cover Letter Generator</h5>
              <p className="mb-4 text-white-50 lh-lg">
                Create professional cover letters instantly with our free AI-powered tool. Stand out from the competition and land your dream job.
              </p>
            </div>
            <div className="col-md-6">
              <h6 className="fw-semibold mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">About Us</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Privacy Policy</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Terms of Service</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <hr className="my-4 border-white-50" />
          <div className="text-center">
            <p className="mb-0 text-white-50">&copy; 2024 Cover Letter Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .form-control:focus,
        .form-select:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25) !important;
        }
        
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
        }
        
        .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        
        .card {
          transition: all 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
        }
        
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem !important;
          }
          
          .lead {
            font-size: 1.1rem !important;
          }
          
          .btn-lg {
            padding: 0.75rem 2rem !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;