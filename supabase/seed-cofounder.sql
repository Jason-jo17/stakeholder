-- Seed Data for Cofounder Module Resources (Schema Aligned)

-- 1. Testing Labs
INSERT INTO "TestingLab" (id, name, location, state, description, "sectorSpecialization", "trlLevelSupported", "equipment", "certifications", "estimatedCost", "contactEmail", "website", "updatedAt")
VALUES
('lab_nitk', 'NITK Surathkal Research Labs', 'Surathkal, Mangalore', 'Karnataka', 'State-of-the-art research facilities at NITK.', '["Deeptech", "Energy", "Agritech"]', '[1, 2, 3, 4, 5, 6, 7]', '["Material Testing", "Environmental Analysis", "Structural Testing", "NDT Equipment"]', '["ISO/IEC 17025"]', '₹10,000 - ₹50,000', 'dean.rd@nitk.edu.in', 'https://www.nitk.ac.in', NOW()),
('lab_vgitl', 'V&G Industrial Testing Laboratories', 'Baikampady, Mangalore', 'Karnataka', 'Specialized industrial testing and inspection services.', '["Energy", "Smartcities", "Deeptech"]', '[4, 5, 6, 7, 8]', '["Radiographic Testing", "Ultrasonic Testing", "Magnetic Particle", "Dye Penetrant", "Mechanical Testing", "Chemical Analysis"]', '["NABL", "ISO/IEC 17025"]', '₹5,000 - ₹30,000', 'info@vgitl.com', 'https://vgitl.com', NOW()),
('lab_sine', 'IIT Bombay SINE Testing Facility', 'Powai, Mumbai', 'Maharashtra', 'Incubation and testing labs for advanced technology startups.', '["Deeptech", "Health", "Energy"]', '[2, 3, 4, 5, 6]', '["Prototyping Lab", "PCB Fabrication", "3D Printing", "Hardware Testing"]', '["NABL", "DSIR Recognized"]', '₹15,000 - ₹75,000', 'contact@sineiitb.org', 'https://sineiitb.org', NOW()),
('lab_nal', 'CSIR-National Aerospace Laboratories', 'Bangalore', 'Karnataka', 'National lab for aerospace research and development.', '["Deeptech", "Energy"]', '[5, 6, 7, 8, 9]', '["Wind Tunnels", "Structural Testing", "Materials Characterization", "Flight Simulators"]', '["NABL", "ISO 9001"]', '₹50,000 - ₹5,00,000', 'director@nal.res.in', 'https://www.nal.res.in', NOW()),
('lab_iitm', 'IIT Madras Research Park Testing Labs', 'Chennai', 'Tamil Nadu', 'Industry-academia collaboration hub with advanced testing labs.', '["Deeptech", "Health", "AI"]', '[3, 4, 5, 6, 7, 8]', '["AI/ML Infrastructure", "Biotech Labs", "Hardware Prototyping", "Materials Testing"]', '["NABL", "DSIR"]', '₹20,000 - ₹1,00,000', 'incubation@researchpark.iitm.ac.in', 'https://researchpark.iitm.ac.in', NOW()),
('lab_cpri', 'CPRI Bangalore', 'Bangalore', 'Karnataka', 'Central Power Research Institute - Electrical power research.', '["Energy"]', '[4, 5, 6, 7, 8, 9]', '["High Voltage Testing", "Power Quality Analyzers", "Solar PV Testing", "Battery Testing"]', '["NABL", "ISO/IEC 17025", "BIS"]', '₹25,000 - ₹2,00,000', 'diroffice@cpri.in', 'https://www.cpri.in', NOW());

-- 2. Makerspaces
INSERT INTO "Makerspace" (id, name, location, state, description, equipment, "sectorFocus", "membershipOptions", "availability", "contactEmail", "website", "updatedAt")
VALUES
('make_ktech', 'K-Tech Innovation Hub CIF Mangaluru', 'Mangalore', 'Karnataka', 'Comprehensive makerspace for hardware prototyping.', '["Metal Working Shop", "Wood Working Shop", "3D Printers", "Laser Cutters", "Electronics Lab", "PCB Prototyping"]', '["Deeptech", "Electronics"]', '{"monthly": "₹3,000", "quarterly": "₹8,000", "annual": "₹25,000"}', 'available', 'steam@ikpknowledgepark.com', 'https://ikpknowledgepark.com/k-tech-innovation-hub-cif/', NOW()),
('make_stpi', 'STPI Mangaluru Makerspace', 'Mangalore', 'Karnataka', 'Technology focused makerspace for software and IoT.', '["Co-working Space", "IT Infrastructure", "Satellite Earth Station", "High-Speed Internet"]', '["IT", "IoT"]', '{"monthly": "₹2,500", "quarterly": "₹6,500", "annual": "₹20,000"}', 'available', 'ravindra.aroor@stpi.in', 'https://stpi.in', NOW()),
('make_asylum', 'Maker''s Asylum Mumbai', 'Mumbai', 'Maharashtra', 'A community makerspace for tinkering and industrial design.', '["CNC Router", "Laser Cutter", "3D Printers", "Woodworking Tools", "Electronics Bench", "Textile Machines"]', '["Design", "Hardware"]', '{"monthly": "₹5,000", "quarterly": "₹13,000", "annual": "₹45,000"}', 'available', 'hello@makersasylum.com', 'https://makersasylum.com', NOW()),
('make_workbench', 'WorkBench Projects Bangalore', 'Bangalore', 'Karnataka', 'Hardware focused makerspace for prototyping and product development.', '["3D Printers", "PCB Fabrication", "Soldering Stations", "Oscilloscopes", "Power Supplies", "Hand Tools"]', '["Hardware", "IoT"]', '{"monthly": "₹4,000", "quarterly": "₹10,000", "annual": "₹35,000"}', 'available', 'info@workbenchprojects.com', 'https://workbenchprojects.com', NOW()),
('make_fablab', 'Fablab Kerala (MakerVillage)', 'Kochi', 'Kerala', 'Industrial grade makerspace and hardware incubator.', '["SMT Line", "CNC Machines", "3D Printers", "Reflow Ovens", "Testing Equipment", "Clean Room"]', '["Electronics", "Deeptech"]', '{"monthly": "₹6,000", "quarterly": "₹16,000", "annual": "₹55,000"}', 'available', 'info@makervillage.in', 'https://makervillage.in', NOW());

-- 3. Funding Opportunities
INSERT INTO "FundingOpportunity" (id, title, description, "organizationName", "type", "fundingSize", "applicationDeadline", "trlEligibility", "applicationUrl", "sectorFocus", "updatedAt")
VALUES
('fund_sisfs', 'Startup India Seed Fund Scheme (SISFS)', 'Flagship seed fund for Indian startups to provide financial assistance for proof of concept, prototype development, product trials, and market entry.', 'DPIIT, Ministry of Commerce', 'government_grant', '₹20L - ₹50L', NULL, '["2", "3", "4", "5"]', 'https://seedfund.startupindia.gov.in/', '["all"]', NOW()),
('fund_elevate', 'Karnataka Elevate Program', 'Grant-in-aid for deeptech and tech-based startups in Karnataka.', 'Department of Electronics, IT, BT - Karnataka', 'government_grant', 'Up to ₹1 crore', '2026-02-17T00:00:00Z', '["3", "4", "5", "6", "7"]', 'https://startup.karnataka.gov.in/elevate', '["deeptech", "energy", "health"]', NOW()),
('fund_hpcl', 'HPCL HP Udgam', 'Funding for innovative startups in the energy and oil sector.', 'Hindustan Petroleum Corporation Limited', 'csr_fund', 'Up to ₹2.5 crore', '2026-02-28T00:00:00Z', '["4", "5", "6", "7"]', 'https://www.hpcl.co.in/upgam', '["energy"]', NOW()),
('fund_big', 'BIRAC BIG (Biotechnology Ignition Grant)', 'Funding for biotech entrepreneurs to stimulate commercialization of research discoveries.', 'BIRAC, DBT', 'government_grant', '₹50L - ₹1 crore', NULL, '["3", "4", "5"]', 'https://birac.nic.in/big.php', '["health"]', NOW()),
('fund_itnt', 'Tamil Nadu Technology Hub (iTNT Hub)', 'Support for deeptech startups in Tamil Nadu.', 'Tamil Nadu Technology Hub', 'government_grant', 'Amount Not Specified', '2026-02-17T00:00:00Z', '["3", "4", "5", "6"]', 'https://startuptn.in/itnt', '["all"]', NOW()),
('fund_bbc', 'Bangalore Bioinnovation Centre (BBC)', 'Incubation and funding for life sciences startups.', 'Bangalore Bioinnovation Centre', 'challenge_based', 'Amount varies', '2026-02-16T00:00:00Z', '["3", "4", "5", "6", "7"]', 'https://bangalorebioinnovationcentre.org/', '["health"]', NOW());

-- 4. Pitching Events
INSERT INTO "PitchingEvent" (id, title, "description", "type", "eventDate", "location", "sectorFocus", "status", "registrationUrl", "prizePool", "attendees", "updatedAt")
VALUES
('pitch_yc', 'YC Demo Day Spring 2026', 'Y Combinator''s flagship demo day.', 'demo_day', '2026-03-15T00:00:00Z', 'Mountain View (Virtual)', '["all"]', 'open', 'https://www.ycombinator.com/apply', NULL, '500+ investors', NOW()),
('pitch_techstars', 'TechStars Energy Demo Day 2026', 'Energy and climate tech focused demo day.', 'demo_day', '2026-04-02T00:00:00Z', 'Bangalore', '["energy"]', 'open', 'https://www.techstars.com/accelerators/energy', NULL, '200+ corporates', NOW()),
('pitch_nass', 'NASSCOM DeepTech Pitch Day', 'Pitch competition for AI, IoT, and DeepTech.', 'pitch_competition', '2026-05-10T00:00:00Z', 'Hyderabad', '["deeptech"]', 'upcoming', 'https://nasscom.in/10000startups', '₹50 lakhs total', '150+ investors', NOW()),
('pitch_thub', 'T-Hub Healthcare Innovation Summit', 'Healthcare and MedTech pitch event.', 'investor_meetup', '2026-06-08T00:00:00Z', 'Hyderabad', '["health"]', 'upcoming', 'https://t-hub.co/events', '₹25 lakhs', '350+ stakeholders', NOW()),
('pitch_elevate', 'Elevate Startup Conclave', 'Karnataka''s flagship startup event.', 'demo_day', '2026-07-20T00:00:00Z', 'Bangalore', '["all"]', 'upcoming', 'https://startup.karnataka.gov.in/elevate', '₹1 crore grant pool', '500+ stakeholders', NOW());

-- 5. Incubators
INSERT INTO "Incubator" (id, name, "location", "type", "description", "sectorFocus", "fundingSupport", "fundingAmount", "status", "applicationUrl", "updatedAt")
VALUES
('inc_nitk', 'NITK STEP (NITK Surathkal)', 'Surathkal, Mangalore', 'incubator', 'Technology incubators at NITK. Alumni: Practo, Delhivery.', '["deeptech", "health", "fintech"]', true, '₹5L - ₹25L seed funding', 'accepting', 'https://step.nitk.ac.in', NOW()),
('inc_mutbi', 'MUTBI - Manipal Universal Technology Business Incubator', 'Manipal', 'incubator', 'DST-funded TBI at MAHE. Focus on IT, Healthcare.', '["health", "agritech", "energy"]', true, 'Up to ₹10 lakh', 'accepting', 'https://mutbi.org', NOW()),
('inc_sine', 'SINE IIT Bombay', 'Mumbai', 'incubator', 'Society for Innovation and Entrepreneurship. Alumni: LogiNext.', '["deeptech", "health", "energy"]', true, '₹10L - ₹50L seed funding', 'accepting', 'https://sineiitb.org', NOW()),
('inc_ciie', 'CIIE.CO (IIM Ahmedabad)', 'Ahmedabad', 'accelerator', 'Innovation Continuum. Alumni: Innov8, MoneyView.', '["fintech", "agritech", "energy", "health"]', true, '₹15L - ₹1 crore', 'accepting', 'https://ciie.co', NOW()),
('inc_thub', 'T-Hub Hyderabad', 'Hyderabad', 'incubator', 'India''s largest startup incubator. Corporate partnerships.', '["deeptech", "fintech", "agritech"]', true, '₹10L - ₹50L', 'accepting', 'https://t-hub.co', NOW()),
('inc_iitm', 'IIT Madras Incubation Cell', 'Chennai', 'incubator', 'DeepTech and Hardware incubator. Alumni: Ather Energy.', '["deeptech", "health", "energy"]', true, '₹15L - ₹75L', 'accepting', 'https://researchpark.iitm.ac.in', NOW()),
('inc_villgro', 'Villgro Innovations Foundation', 'Chennai', 'incubator', 'Social enterprises. Alumni: Ambee, Embrace.', '["health", "energy", "agritech"]', true, '₹5L - ₹30L', 'accepting', 'https://villgro.org', NOW()),
('inc_nsrcel', 'NSRCEL (IIM Bangalore)', 'Bangalore', 'incubator', 'Startup incubator with mentorship network.', '["all"]', false, NULL, 'accepting', 'https://nsrcel.org', NOW()),
('inc_aic', 'AIC - Shiv Nadar University', 'Greater Noida', 'incubator', 'Atal Incubation Centre with venture challenge.', '["all"]', true, '₹5L - ₹1 crore', 'accepting', 'https://incubator.snu.edu.in', NOW()),
('inc_social', 'Social Alpha', 'Bangalore', 'incubator', 'Science and tech for social impact.', '["health", "energy", "agritech"]', true, '₹10L - ₹50L', 'accepting', 'https://socialalpha.org', NOW());

-- 6. Experts
INSERT INTO "Expert" (id, name, "specialization", "domain", "rating", "sessionsCompleted", "availability", "hourlyRate", "subsidized", "contactEmail", "updatedAt")
VALUES
('exp_reg', 'Dr. Regulatory Compliance Expert', 'FDA, CDSCO, Medical Device Regulations', '["Regulatory", "Compliance"]', 4.8, 45, 'available', 5000, false, 'regulatory@expertnetwork.in', NOW()),
('exp_ip', 'Patent Attorney - IP Specialist', 'Patent Filing, Trademark', '["IP", "Legal"]', 4.9, 78, 'limited', 6000, false, 'ip@expertnetwork.in', NOW()),
('exp_energy', 'Energy Systems Consultant', 'Smart Grid, Renewable Energy', '["Technical", "Energy"]', 4.7, 32, 'available', 4500, true, 'energy@expertnetwork.in', NOW()),
('exp_ai', 'AI/ML Technical Advisor', 'Machine Learning, Deep Learning', '["Technical", "AI"]', 4.9, 120, 'limited', 7000, false, 'ai@expertnetwork.in', NOW()),
('exp_fin', 'FinTech Compliance Officer', 'RBI Guidelines, KYC/AML', '["Regulatory", "Compliance", "FinTech"]', 4.6, 56, 'available', 5500, false, 'fintech@expertnetwork.in', NOW()),
('exp_prod', 'Product Development Mentor', 'MVP Development, UX Design', '["Technical", "Product"]', 4.8, 89, 'available', 4000, true, 'product@expertnetwork.in', NOW()),
('exp_gtm', 'Go-to-Market Strategy Expert', 'B2B Sales, Channel Partnerships', '["Business", "GTM"]', 4.7, 67, 'available', 5000, true, 'gtm@expertnetwork.in', NOW()),
('exp_sec', 'Cybersecurity Architect', 'Security Audits, Penetration Testing', '["Technical", "Security"]', 4.9, 43, 'limited', 6500, false, 'security@expertnetwork.in', NOW());

-- 7. Government Schemes
INSERT INTO "GovernmentScheme" (id, title, "description", "type", "benefitAmount", "sectorFocus", "eligibilityCriteria", "status", "deadline", "applicationUrl", "updatedAt")
VALUES
('sch_sisfs', 'Startup India Seed Fund Scheme', 'Proof-of-concept validation grants.', 'startup_india', '₹20L grant + ₹50L debt', '["all"]', '{"age": "Startup < 2 years", "stage": "Idea to Revenue"}', 'active', NULL, 'https://seedfund.startupindia.gov.in/', NOW()),
('sch_tax', 'Section 80-IAC Tax Holiday', '3-year income tax exemption.', 'tax_benefit', '100% tax exemption', '["all"]', '{"age": "<10 years", "turnover": "<100cr"}', 'active', '2030-03-31T00:00:00Z', 'https://www.startupindia.gov.in/', NOW()),
('sch_elevate', 'Karnataka Elevate Scheme', 'Grant-in-aid for deeptech and tech-based startups in Karnataka.', 'state_scheme', 'Up to ₹1 crore', '["deeptech", "energy", "health"]', '{"location": "Karnataka", "stage": "Prototype"}', 'active', '2026-02-17T00:00:00Z', 'https://startup.karnataka.gov.in/elevate', NOW()),
('sch_pli', 'PLI Scheme - Electronics', 'Production Linked Incentive.', 'pli_scheme', '4-6% of production value', '["deeptech", "energy"]', '{"sector": "Electronics"}', 'active', NULL, 'https://www.meity.gov.in/esdm/pli', NOW()),
('sch_sipp', 'SIPP - IP Protection', 'Rebate on patent filing fees.', 'startup_india', '80% fee rebate', '["all"]', '{"recognition": "DPIIT"}', 'active', NULL, 'https://www.startupindia.gov.in/', NOW()),
('sch_big', 'BIRAC BIG', 'Biotech Ignition Grant.', 'capital_subsidy', '₹50L - ₹1 crore', '["health"]', '{"sector": "Biotech"}', 'active', NULL, 'https://birac.nic.in/big.php', NOW()),
('sch_samridh', 'SAMRIDH - AIM', 'Matching equity funding.', 'startup_india', 'Up to ₹1 crore', '["all"]', '{"impact": "Social"}', 'active', NULL, 'https://aim.gov.in/samridh.php', NOW());

-- 8. Sector APIs
INSERT INTO "SectorAPI" (id, name, "category", "sector", "description", "apiType", "sandboxUrl", "documentationUrl", "sandboxReady", "authRequired", "rateLimits", "updatedAt")
VALUES
('api_abdm', 'ABDM Health Records API', 'Core Clinical APIs', 'healthtech', 'Access patient health records (FHIR).', 'REST', 'https://sandbox.abdm.gov.in/', 'https://sandbox.abdm.gov.in/docs/', true, true, '{"rpm": 60, "rpd": 10000}', NOW()),
('api_fhir', 'FHIR API', 'Interoperability Standards', 'healthtech', 'Health records exchange.', 'REST', 'https://hapi.fhir.org/baseR4', 'https://www.hl7.org/fhir/', true, false, NULL, NOW()),
('api_upi', 'UPI API', 'Payment APIs', 'fintech', 'Unified Payments Interface.', 'REST', 'https://www.npci.org.in/upi-developer', 'https://www.npci.org.in/', true, true, '{"rpm": 100, "rpd": 50000}', NOW()),
('api_ekyc', 'Aadhaar eKYC API', 'KYC & Identity', 'fintech', 'Aadhaar authentication.', 'REST', 'https://uidai.gov.in/', 'https://uidai.gov.in/', true, true, '{"rpm": 30, "rpd": 500}', NOW()),
('api_digi', 'DigiLocker API', 'Document Management', 'fintech', 'Access digital documents.', 'REST', 'https://api.digitallocker.gov.in/', 'https://api.digitallocker.gov.in/', true, true, NULL, NOW()),
('api_imd', 'IMD Weather Data API', 'Weather & Climate', 'agritech', 'Weather forecast data.', 'REST', 'https://mausam.imd.gov.in/', 'https://www.imdpune.gov.in/', false, true, NULL, NOW()),
('api_mandi', 'Mandi Price API', 'Market Data', 'agritech', 'Daily commodity prices.', 'REST', 'https://api.data.gov.in/', 'https://data.gov.in/', true, true, '{"rpm": 10, "rpd": 1000}', NOW()),
('api_isro', 'ISRO Bhuvan Imagery API', 'Satellite & Remote Sensing', 'agritech', 'Satellite imagery & NDVI.', 'REST', 'https://bhuvan-app1.nrsc.gov.in/', 'https://bhuvan.nrsc.gov.in/', true, true, NULL, NOW()),
('api_city', 'Smart City Traffic Data API', 'Urban Mobility', 'smartcities', 'Real-time traffic data.', 'REST', NULL, 'https://smartnet.niua.org/', false, true, NULL, NOW()),
('api_cerc', 'CERC Grid Data API', 'Grid Monitoring', 'energy', 'Grid frequency and load data.', 'REST', 'https://www.cercind.gov.in/', 'https://www.cercind.gov.in/', false, false, NULL, NOW());
