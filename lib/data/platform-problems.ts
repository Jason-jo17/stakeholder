export interface PlatformProblem {
    id: string;
    title: string;
    description: string;
    sectors: string[];
    regions: { district: string; city?: string; state?: string; pincode?: string }[];
    thumbnail?: string;
    fullData?: any;

    // New detailed fields
    created_at?: string;
    updated_at?: string;
    what_is_the_problem?: { blocks: any[]; version?: string; time?: number };
    why_is_it_a_problem?: { blocks: any[]; version?: string; time?: number };
    when_and_where_does_problem_occur?: { blocks: any[]; version?: string; time?: number };
    who_are_facing?: { blocks: any[]; version?: string; time?: number };
    existing_solution?: { blocks: any[]; version?: string; time?: number };
    stakeholders_complaint?: { blocks: any[]; version?: string; time?: number };
    market_size?: { blocks: any[]; version?: string; time?: number };
    technologies?: string[];
    domains?: string[];
    sdgs?: string[];
    additional_info?: { blocks: any[]; version?: string; time?: number };
    visible?: boolean;
    created_by?: string;
    published?: string;
}

export const PLATFORM_PROBLEMS: PlatformProblem[] = [
    {
        id: "5ebbeeb9-4afc-4863-9e6f-16f027eb5419",
        created_at: "2025-10-11T12:44:29.909448+05:30",
        updated_at: "2025-10-27T11:39:34.177565+05:30",
        title: "Enhancing Crowd Safety and Experience during the Dasara Jamboo Savari Procession",
        description: "The Dasara Jamboo Savari in Mysore attracts millions of spectators each year. Managing such a massive crowd within a confined urban area poses severe challenges in crowd control, emergency response, and visitor experience.",
        thumbnail: "https://blr1.digitaloceanspaces.com/inpulse-prod/problem-statements/5ebbeeb9-4afc-4863-9e6f-16f027eb5419/istockphoto-801856450-612x612.jpg",
        what_is_the_problem: {
            "time": 1761375451853,
            "blocks": [
                {
                    "id": "8APldBuN1o",
                    "data": {
                        "text": "The Dasara Jamboo Savari in Mysore attracts millions of spectators each year, gathering along the city streets and near the Mysore Palace to witness the royal procession. Managing such a massive crowd within a confined urban area poses severe challenges in crowd control, emergency response, and visitor experience. The lack of real-time information flow, poor coordination between security and medical teams, and absence of smart crowd management systems increase the risk of accidents, stampedes, and distress during emergencies."
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        why_is_it_a_problem: {
            "time": 1761545328143,
            "blocks": [
                {
                    "id": "fekOFq2gIT",
                    "data": {
                        "text": "Safety risk: Inability to detect and control overcrowding can lead to accidents, panic, or stampedes."
                    },
                    "type": "paragraph"
                },
                {
                    "id": "pUt9-Wd1T5",
                    "data": {
                        "text": "Delayed response: Lack of real-time situational awareness slows down emergency aid and evacuation.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "n7aTfeJsfv",
                    "data": {
                        "text": "Visitor dissatisfaction: Many spectators face long waiting times, poor visibility, and confusion about entry/exit points.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "ABFkDsbVT6",
                    "data": {
                        "text": "Operational inefficiency: Coordination between departments (police, fire, medical, volunteers) is reactive rather than data-driven.\n"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        when_and_where_does_problem_occur: {
            "time": 1761545336913,
            "blocks": [
                {
                    "id": "G5sPvE4mSo",
                    "data": {
                        "text": "\u003cb\u003eWhen\u003c/b\u003e: "
                    },
                    "type": "paragraph"
                },
                {
                    "id": "nYtBBjtwuf",
                    "data": {
                        "text": "Every year during the Dasara festival, especially on Vijayadashami Day, during the Jamboo Savari procession.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "OYTJBofNBm",
                    "data": {
                        "text": "\u003cb\u003eWhere:\u003c/b\u003e"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "Ghr_tEoUdR",
                    "data": {
                        "text": "Procession route: From Mysore Palace to Bannimantap.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "--wTGTH6Pb",
                    "data": {
                        "meta": {},
                        "items": [
                            {
                                "meta": {},
                                "items": [],
                                "content": "High-density zones: Palace entrance, Sayyaji Rao Road, Chamaraja Circle, and Bannimantap Grounds."
                            }
                        ],
                        "style": "unordered"
                    },
                    "type": "list"
                }
            ],
            "version": "2.30.7"
        },
        who_are_facing: {
            "time": 1761545346076,
            "blocks": [
                {
                    "id": "gMMiSF6ORI",
                    "data": {
                        "text": "Spectators: Facing overcrowding, confusion, and limited viewing access.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "I4GQ7O6HI-",
                    "data": {
                        "text": "Authorities: Struggling to ensure crowd safety, manage traffic diversions, and coordinate emergency response.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "pXr5eLG4Dw",
                    "data": {
                        "text": "Vendors and local businesses: Affected by poor logistics and unclear zone demarcation.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "-h5EDUwNXk",
                    "data": {
                        "text": "Event organizers: Challenged by lack of integrated real-time monitoring tool\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "PACzSEFLHz",
                    "data": {
                        "text": "Emergency responders: Limited access routes and communication delays.\n"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        existing_solution: {
            "time": 1761545354993,
            "blocks": [
                {
                    "id": "8CuzqEJFqg",
                    "data": {
                        "text": "Deployment of police and volunteer teams for manual crowd control.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "0nrK0HVkE5",
                    "data": {
                        "text": "CCTV surveillance at key locations.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "eDDqy1BTz_",
                    "data": {
                        "text": "Announcements through loudspeakers for crowd management.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "Q6sp5qqT2H",
                    "data": {
                        "text": "Static barricading and predefined entry/exit routes.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "dI_VaZb7YC",
                    "data": {
                        "text": "Use of drones for limited aerial surveillance.\n"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        stakeholders_complaint: {
            "time": 1761545362959,
            "blocks": [
                {
                    "id": "oNoh_jOGja",
                    "data": {
                        "text": "Spectators: Overcrowded viewing points, lack of shade, water, and information on where to stand.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "pMpSSzvAm_",
                    "data": {
                        "text": "Authorities: Lack of data-driven crowd density mapping or predictive control systems.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "CHK2bzsVTm",
                    "data": {
                        "text": "Emergency teams: Difficulties in navigating through dense crowds and reaching affected zones quickly.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "hPNr7SNY-N",
                    "data": {
                        "text": "Vendors: Poorly planned stall placements leading to congestion and limited customer flow.\n"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        market_size: {
            "time": 1761545369678,
            "blocks": [
                {
                    "id": "PIjN0o6nzq",
                    "data": {
                        "text": "Mysore Dasara attracts ₹500+ crore in tourism-related economic activity annually.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "FItqNmIe6G",
                    "data": {
                        "text": "The event management and smart city crowd control technology market in India is growing at 12–15% CAGR, with increasing adoption of AI-based public safety solutions in urban festivals and pilgrimages (e.g., Kumbh Mela).\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "KcY1qvTMLi",
                    "data": {
                        "text": "Significant opportunity for GovTech startups, IoT-based safety systems, and real-time monitoring solutions.\n"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        sectors: ["Tourism \u0026 Hospitality"],
        technologies: [
            "Heritage \u0026 Culture",
            "Travel \u0026 Tourism",
            "Transportation \u0026 Logistics"
        ],
        domains: [
            "Design \u0026 User Experience (UX)",
            "Systems/Infrastructure",
            "Software",
            "Hardware Electronics"
        ],
        sdgs: [
            "GOAL 3: Good Health and Well-being",
            "GOAL 9: Industry, Innovation and Infrastructure",
            "GOAL 11: Sustainable Cities and Communities",
            "GOAL 16: Peace and Justice Strong Institutions"
        ],
        additional_info: {
            "time": 1761545320110,
            "blocks": [
                {
                    "id": "yC36Kb4Lf4",
                    "data": {
                        "text": "The procession covers approximately 5 km from Mysore Palace to Bannimantap Grounds.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "x37dHpBRiL",
                    "data": {
                        "text": "Key issues include overcrowded viewing zones, restricted mobility for emergency vehicles, communication breakdowns, and limited access to basic amenities (like water, restrooms, and first aid).\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "MmKLmF-FVn",
                    "data": {
                        "text": "Despite heavy police deployment, manual crowd monitoring and one-way communication systems limit responsiveness.\n"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        visible: true,
        created_by: "129289ad-f508-4a10-b33c-f65da86af8d1",
        published: "published",
        regions: [
            {
                "district": "MYSORE",
                "city": "Mysore",
                "state": "KARNATAKA",
                "pincode": ""
            }
        ]
    },
    {
        id: "c3ac0854-8d76-465f-ada5-ee5d81d8731d",
        created_at: "2025-10-11T19:00:20.254858+05:30",
        updated_at: "2025-10-27T11:41:02.686604+05:30",
        title: "Protecting Kokkare Bellur’s Wetland Ecosystems and Pelican Colonies through Sustainable Water and Habitat Management",
        description: "Mandya’s renowned Kokkare Bellur village, a vital wetland ecosystem, is witnessing a sharp decline in its spot-billed pelican population.",
        thumbnail: "https://blr1.digitaloceanspaces.com/inpulse-prod/problem-statements/c3ac0854-8d76-465f-ada5-ee5d81d8731d/american-white-pelican-barry-blog-post.jpg",
        what_is_the_problem: {
            "time": 1761538939902,
            "blocks": [
                {
                    "id": "eCl6Uuyf6x",
                    "data": {
                        "text": "Mandya’s renowned Kokkare Bellur village, a vital wetland ecosystem and one of India’s rare community-led bird sanctuaries, is witnessing a sharp decline in its spot-billed pelican population. The wetlands that sustain these birds are drying up due to prolonged droughts, erratic rainfall, and increased water extraction for agriculture. Additionally, pollution from agricultural runoff and sewage discharge contaminates the water, affecting both the birds’ health and the aquatic ecosystem they depend on."
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        why_is_it_a_problem: {
            "time": 1761545411227,
            "blocks": [
                {
                    "id": "XoCm2lb3ED",
                    "data": {
                        "text": "This problem has ecological, social, and economic implications:"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "UymLEipRNr",
                    "data": {
                        "text": "Ecological: The loss of wetland biodiversity disrupts local ecosystems and affects other dependent species.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "wPIJWUHsKn",
                    "data": {
                        "text": "Social: The local community, once proud custodians of these birds, now faces reduced eco-tourism income and cultural disconnection.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "IDdFc53aPj",
                    "data": {
                        "text": "Economic: Decline in eco-tourism and birdwatching activities directly impacts local livelihoods.\nIf the degradation continues, Kokkare Bellur’s identity as a successful model of community-led conservation could be lost."
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        when_and_where_does_problem_occur: {
            "time": 1761545417123,
            "blocks": [
                {
                    "id": "0GOSL4cjrI",
                    "data": {
                        "text": "The issue is most severe during summer months (March–June) when water levels drop drastically."
                    },
                    "type": "paragraph"
                },
                {
                    "id": "Sl7vJutF7k",
                    "data": {
                        "text": "Wetland areas around Kokkare Bellur and adjoining lakes (e.g., Maddur Kere, Bellur Kere) experience seasonal drying and pollution buildup."
                    },
                    "type": "paragraph"
                },
                {
                    "id": "mu29WzDaH9",
                    "data": {
                        "text": "The impact worsens during years of low monsoon rainfall or delayed inflows from the Cauvery irrigation canals."
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        who_are_facing: {
            "time": 1761545431590,
            "blocks": [
                {
                    "id": "ThH0QKxskp",
                    "data": {
                        "text": "Local villagers who depend on eco-tourism and cultural identity tied to bird conservation."
                    },
                    "type": "paragraph"
                },
                {
                    "id": "ejui8HvscY",
                    "data": {
                        "text": "Pelican and stork populations, suffering from habitat loss and disease.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "haXpYDFNzS",
                    "data": {
                        "text": "Environmental authorities struggling to maintain water quality and ecological balance."
                    },
                    "type": "paragraph"
                },
                {
                    "id": "NCkb0FSBRk",
                    "data": {
                        "text": "Tourists and researchers facing reduced opportunities for education and nature study.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "EAA32fSwGg",
                    "data": {
                        "text": "Farmers nearby wetlands, affected by poor water quality and ecosystem decline.\n"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        existing_solution: {
            "time": 1761545438106,
            "blocks": [
                {
                    "id": "uc_Z9b5dqu",
                    "data": {
                        "text": "Community protection programs by the Forest Department and NGOs.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "ubtIRjUCH8",
                    "data": {
                        "text": "Government incentives for villagers participating in bird conservation.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "10uY29Hege",
                    "data": {
                        "text": "Rainwater harvesting and lake rejuvenation initiatives (in limited areas).\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "6p8v4FJh-R",
                    "data": {
                        "text": "Awareness and eco-tourism campaigns promoting Kokkare Bellur’s significance.\n"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        stakeholders_complaint: {
            "time": 1761545453708,
            "blocks": [
                {
                    "id": "QC2MMwsVII",
                    "data": {
                        "text": "Inconsistent water management — desilting and rejuvenation done irregularly.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "NpjJzQJrOL",
                    "data": {
                        "text": "Lack of real-time ecological monitoring for pollution or bird health.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "ph5KnzUl7y",
                    "data": {
                        "text": "Insufficient coordination between local panchayats, irrigation departments, and forest officials.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "-tYLB5YMPB",
                    "data": {
                        "text": "Limited funding and training for villagers to continue conservation independently.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "EPQjdsbHSf",
                    "data": {
                        "text": "Pollution from nearby farms and settlements remains unregulated.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "p2L-w93P_Z",
                    "data": {
                        "text": "No early warning systems for drought or disease outbreaks among bird colonies.\n"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        market_size: {
            "time": 1761545459644,
            "blocks": [
                {
                    "id": "IDhFmF35Qp",
                    "data": {
                        "text": "Wetland conservation and eco-tourism represent an emerging green economy segment."
                    },
                    "type": "paragraph"
                },
                {
                    "id": "N2brMyA4TL",
                    "data": {
                        "text": "Eco-tourism in Karnataka attracts over 5 million domestic visitors annually.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "qH-x1Qnvqt",
                    "data": {
                        "text": "Developing Mandya’s wetlands into sustainable tourism zones could generate local employment and attract state and CSR funding.\n"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "k-ve4MSamg",
                    "data": {
                        "text": "The wildlife monitoring technology market (IoT, drones, sensors) is projected to grow beyond USD 1.5 billion globally by 2030, providing opportunities for scalable conservation solutions."
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        sectors: ["Agriculture & Forestry"],
        technologies: ["Other"],
        domains: ["Systems/Infrastructure", "Miscellaneous"],
        sdgs: [
            "GOAL 6: Clean Water and Sanitation",
            "GOAL 11: Sustainable Cities and Communities",
            "GOAL 13: Climate Action",
            "GOAL 14: Life Below Water",
            "GOAL 15: Life on Land"
        ],
        additional_info: {
            "time": 1761538946619,
            "blocks": [
                {
                    "id": "Z_jSGLERju",
                    "data": {
                        "text": "Kokkare Bellur is famous for the harmonious coexistence between villagers and migratory birds. Traditionally, villagers have protected the birds and received government support through conservation schemes. However, climate change, reduced inflows to wetlands, and water mismanagement have led to shrinking nesting areas."
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        regions: [{ district: "MANDYA", city: "Mandya" }]
    },
    {
        id: "fa9e6ffc-73bd-4c5f-b2f4-1085c0788955",
        created_at: "2025-10-29T10:42:45.306869+05:30",
        updated_at: "2025-10-29T11:40:21.611417+05:30",
        title: "Mitigating Urban Flash Flooding in Bengaluru’s Vulnerable Neighbourhoods",
        description: "In HBR Layout and BTM Layout of Bengaluru, even light to moderate rainfall now leads to severe flooding.",
        thumbnail: "https://blr1.digitaloceanspaces.com/inpulse-prod/problem-statements/fa9e6ffc-73bd-4c5f-b2f4-1085c0788955/4.jpg",
        what_is_the_problem: {
            "time": 1761714555195,
            "blocks": [
                {
                    "id": "IyQhwOEtpB",
                    "data": {
                        "text": "How might we design integrated, data-driven, and community-focused flood management systems to prevent recurrent waterlogging and sewage-mixed flooding in Bengaluru’s residential areas?"
                    },
                    "type": "paragraph"
                },
                {
                    "id": "p9SCgH7B6Y",
                    "data": {
                        "text": "In HBR Layout (5th Block) and BTM Layout of Bengaluru, even light to moderate rainfall (30–40 mm) now leads to severe flooding, with blocked stormwater drains, encroached lakes, and poor drainage connectivity turning neighbourhoods into temporary water basins."
                    },
                    "type": "paragraph"
                },
                {
                    "id": "KEvsHcwerX",
                    "data": {
                        "text": "Recurring urban flash floods in Bengaluru are caused by inefficient stormwater management, sewage overflow, and unchecked encroachments, leading to frequent property damage, water contamination, and fatalities."
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        why_is_it_a_problem: {
            "time": 1761718158662,
            "blocks": [
                {
                    "id": "emDqqLr7DV",
                    "data": {
                        "text": "Public Safety Threat: Flood-related electrocutions and accidents have claimed multiple lives in recent years."
                    },
                    "type": "paragraph"
                },
                {
                    "id": "arqQhGV2Cs",
                    "data": {
                        "text": "Health Hazard: Floodwaters contaminated with sewage cause outbreaks of waterborne diseases."
                    },
                    "type": "paragraph"
                },
                {
                    "id": "S7oVeSho5U",
                    "data": {
                        "text": "Economic Damage: Repeated flooding damages property, vehicles, and local businesses."
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        when_and_where_does_problem_occur: {
            "time": 1761714610634,
            "blocks": [
                {
                    "id": "YmErKpakVa",
                    "data": {
                        "text": "The issue occurs seasonally during pre-monsoon and monsoon rains (April–October) in low-lying and poorly drained localities such as HBR Layout, BTM Layout, Koramangala, and Mahadevapura zones."
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        who_are_facing: {
            "time": 1761718191082,
            "blocks": [
                {
                    "id": "NKRJnxSsjN",
                    "data": {
                        "text": "Primary Stakeholders: Residents, local communities, street vendors, BBMP staff."
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        existing_solution: {
            "time": 1761718199874,
            "blocks": [
                {
                    "id": "f2XaWE2jjJ",
                    "data": {
                        "text": "Desilting and clearing of major stormwater drains by BBMP"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        stakeholders_complaint: {
            "time": 1761718208973,
            "blocks": [
                {
                    "id": "LJuFx1ndk_",
                    "data": {
                        "text": "“BBMP only clears drains after flooding — not before.”"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        market_size: {
            "time": 1761718216845,
            "blocks": [
                {
                    "id": "__FwXCmI9h",
                    "data": {
                        "text": "India’s urban flood management market is estimated at ₹8,000–₹10,000 crore, driven by Smart City, AMRUT 2.0, and climate resilience projects."
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        sectors: ["Construction", "Healthcare", "Energy", "Roads \u0026 Highways"],
        technologies: [],
        domains: ["Data/Analytics", "Software", "Automation \u0026 Robotics", "Systems/Infrastructure"],
        sdgs: [
            "GOAL 3: Good Health and Well-being",
            "GOAL 6: Clean Water and Sanitation",
            "GOAL 9: Industry, Innovation and Infrastructure",
            "GOAL 11: Sustainable Cities and Communities",
            "GOAL 13: Climate Action"
        ],
        additional_info: {
            "time": 1761714585678,
            "blocks": [
                {
                    "id": "3hDhYG1fPZ",
                    "data": {
                        "text": "Bengaluru’s urban flooding risk has intensified due to loss of natural drainage paths and lake interconnectivity. Over 45% of the city’s stormwater drains are partially or fully encroached."
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.30.7"
        },
        regions: [{ district: "BANGALORE", city: "Bangalore" }]
    }
];

// Mock Stakeholders derived from the user's image
export const MOCK_STAKEHOLDERS = [
    {
        id: "st_1",
        user: { name: "Darshan H V" },
        organization: "District Administration",
        designation: "District Commissioner",
        problemStatements: [1, 2, 3, 4],
        solutions: [1, 2, 3],
        latitude: 12.9141,
        longitude: 74.8560 // Mangalore
    },
    {
        id: "st_2",
        user: { name: "Vice-Chancellor" },
        organization: "Keladi Shivappa Nayaka University",
        designation: "Vice Chancellor",
        problemStatements: [1, 2, 3],
        solutions: [1, 2],
        latitude: 13.9299,
        longitude: 75.5681 // Shimoga
    },
    {
        id: "st_3",
        user: { name: "Managing Director" },
        organization: "SCDCC Bank (Dakshina Kannada)",
        designation: "Managing Director",
        problemStatements: [1, 2, 3],
        solutions: [1, 2],
        latitude: 12.8700,
        longitude: 74.8800 // Mangalore
    },
    {
        id: "st_4",
        user: { name: "District Development Manager" },
        organization: "NABARD Karnataka",
        designation: "District Development Manager",
        problemStatements: [1, 2, 3, 4],
        solutions: [1],
        latitude: 12.9716,
        longitude: 77.5946 // Bangalore
    },
    {
        id: "st_5",
        user: { name: "Joint Director" },
        organization: "Department of Agriculture",
        designation: "Joint Director",
        problemStatements: [1, 2],
        solutions: [1, 2],
        latitude: 12.9800,
        longitude: 77.6000 // Bangalore
    },
    {
        id: "st_6",
        user: { name: "Dr. Devaraja T.N." },
        organization: "Krishi Vigyan Kendra Dakshina Kannada",
        designation: "Senior Scientist & Head",
        problemStatements: [1, 2],
        solutions: [1],
        latitude: 12.8900,
        longitude: 74.8400 // Mangalore
    },
    {
        id: "st_7",
        user: { name: "Dr. M.V. Nagaraja" },
        organization: "Krishi Vigyan Kendra Hassan",
        designation: "Senior Scientist & Head",
        problemStatements: [1, 2],
        solutions: [1],
        latitude: 13.0033,
        longitude: 76.1004 // Hassan
    },
    {
        id: "st_8",
        user: { name: "Managing Director" },
        organization: "Hassan DCC Bank",
        designation: "Managing Director",
        problemStatements: [1, 2],
        solutions: [1],
        latitude: 13.0100,
        longitude: 76.0900 // Hassan
    },
    {
        id: "st_9",
        user: { name: "Deputy Director" },
        organization: "Department of Horticulture",
        designation: "Deputy Director",
        problemStatements: [1, 2],
        solutions: [1],
        latitude: 12.3051,
        longitude: 76.6551 // Mysore
    },
    {
        id: "st_10",
        user: { name: "Mysore City Police Commissioner" },
        organization: "Police Department",
        designation: "Commissioner",
        problemStatements: [1, 5],
        solutions: [],
        latitude: 12.3115,
        longitude: 76.6651 // Mysore
    },
    {
        id: "st_11",
        user: { name: "Dasara Event Coordinator" },
        organization: "Tourism Department",
        designation: "Coordinator",
        problemStatements: [1],
        solutions: [],
        latitude: 12.3000,
        longitude: 76.6400 // Mysore Palace vicinty
    },
    {
        id: "st_12",
        user: { name: "Local Shop Owners Association" },
        organization: "Merchant Association",
        designation: "President",
        problemStatements: [1],
        solutions: [],
        latitude: 12.3080,
        longitude: 76.6480 // Market area
    }
];

export const FILTER_OPTIONS = {
    domains: [
        "Automation & Robotics",
        "Data/Analytics",
        "Design & User Experience (UX)",
        "Hardware Electronics",
        "Mechanical",
        "Miscellaneous",
        "Service based",
        "Software",
        "Systems/Infrastructure"
    ],
    regions: [
        { state: "KARNATAKA", district: "BANGALORE", city: "Bangalore" },
        { state: "KARNATAKA", district: "DAKSHINA KANNADA", city: "" },
        { state: "KARNATAKA", district: "DAKSHINA KANNADA", city: "Mangalore" },
        { state: "KARNATAKA", district: "MANDYA", city: "Mandya" },
        { state: "KARNATAKA", district: "MYSORE", city: "Mysore" },
        { state: "KARNATAKA", district: "MYSORE", city: "Nanjangud" },
        { state: "KARNATAKA", district: "TUMKUR", city: "" },
        { state: "KARNATAKA", district: "TUMKUR", city: "Tumkur" }
    ],
    sdgs: [
        "GOAL 10: Reduced Inequality",
        "GOAL 11: Sustainable Cities and Communities",
        "GOAL 12: Responsible Consumption and Production",
        "GOAL 13: Climate Action",
        "GOAL 14: Life Below Water",
        "GOAL 15: Life on Land",
        "GOAL 16: Peace and Justice Strong Institutions",
        "GOAL 17: Partnerships to achieve the Goal",
        "GOAL 1: No Poverty",
        "GOAL 2: Zero Hunger",
        "GOAL 3: Good Health and Well-being",
        "GOAL 4: Quality Education",
        "GOAL 5: Gender Equality",
        "GOAL 6: Clean Water and Sanitation",
        "GOAL 7: Affordable and Clean Energy",
        "GOAL 8: Decent Work and Economic Growth",
        "GOAL 9: Industry, Innovation and Infrastructure"
    ],
    sectors: [
        "Agriculture & Forestry",
        "Auto Components",
        "Automobile",
        "Aviation",
        "Ayush",
        "Banking",
        "Chemical",
        "Construction",
        "E-waste",
        "Education",
        "Electronic Systems",
        "Energy",
        "Financial Services and Insurance (BFSI)",
        "Fisheries & Aquaculture",
        "Food Processing",
        "Healthcare",
        "Media",
        "Medical Devices",
        "Other",
        "Paper & Packaging",
        "Pharmaceutical",
        "Ports & Shipping",
        "Renewable Energy",
        "Retail & E-commerce",
        "Roads & Highways",
        "Telecom",
        "Textile & Apparel",
        "Tourism & Hospitality"
    ],
    technologies: [
        "Agriculture",
        "BioTech",
        "Blockchain & Cybersecurity",
        "Embedded Systems",
        "Fitness & Sports",
        "Food Tech",
        "HealthTech",
        "Heritage & Culture",
        "MedTech",
        "Other",
        "Renewable",
        "Robotics & Drones",
        "Rural Development",
        "Smart Automation",
        "Transportation & Logistics",
        "Travel & Tourism"
    ]
};

export function getPlatformProblem(id: string) {
    const p = PLATFORM_PROBLEMS.find(p => p.id === id);
    if (!p) return null;

    // Simulate mapping random stakeholders to the problem
    // In a real app this would be a DB relation. 
    // We'll pick a deterministic subset based on the ID char code sum
    const shuffledStakeholders = [...MOCK_STAKEHOLDERS].sort((a, b) => (a.id.localeCompare(b.id) + id.length) % 3 - 1);
    const selectedStakeholders = shuffledStakeholders.slice(0, 6); // Take first 6 as linked

    return {
        id: p.id,
        code: `EXT-${p.id.slice(0, 4).toUpperCase()}`,
        title: p.title,
        description: p.description,
        severity: "Medium",
        domain: p.sectors[0] || 'General',
        districts: p.regions.map(r => r.district),
        affectedPopulation: null,
        status: "active",
        createdAt: p.created_at || new Date().toISOString(),
        updatedAt: p.updated_at || new Date().toISOString(),
        stakeholders: selectedStakeholders,
        solutions: MOCK_PROJECTS.filter(proj => {
            // Specific logic for Dasara problem
            if (p.id === '5ebbeeb9-4afc-4863-9e6f-16f027eb5419') {
                return proj.project.title.toLowerCase().includes('crowd') || proj.project.title.toLowerCase().includes('dasara') || proj.project.title.toLowerCase().includes('jamboo');
            }
            // For other problems, show nothing for now or generic logic
            return false;
        }).map(mp => ({
            id: mp.project.id,
            title: mp.project.title,
            description: "",
            status: mp.project.status,
            budget: null,
            thumbnail: mp.project.thumbnail,
            author: mp.user.name,
            sectors: mp.project.sectors
        })),
        rootCauses: [],
        sectors: p.sectors.map(s => ({ name: s, slug: s.toLowerCase().replace(/ /g, '-') })),
        // Detailed fields
        what_is_the_problem: p.what_is_the_problem,
        why_is_it_a_problem: p.why_is_it_a_problem,
        when_and_where_does_problem_occur: p.when_and_where_does_problem_occur,
        who_are_facing: p.who_are_facing,
        existing_solution: p.existing_solution,
        stakeholders_complaint: p.stakeholders_complaint,
        market_size: p.market_size,
        technologies: p.technologies,
        domains: p.domains,
        sdgs: p.sdgs,
        additional_info: p.additional_info,
        thumbnail: p.thumbnail,
        regions: p.regions,
    };
}

// Mock solutions for the detailed problem
export const MOCK_PROJECTS = [
    {
        project: {
            id: "86b21308-2467-41a1-9712-e75b173ffae6",
            title: "Crowd safety manegement app",
            thumbnail: "https://blr1.digitaloceanspaces.com/inpulse-prod/projects/86b21308-2467-41a1-9712-e75b173ffae6/cover-1768269545087.png",
            status: "published",
            technologies: ["Travel & Tourism"],
            sectors: ["Tourism & Hospitality"],
        },
        user: { name: "POOJA B M" }
    },
    {
        project: {
            id: "d8bfca58-7825-4172-8e25-8aa4c4bf66ba",
            title: "Enhancing crowd safety and experience during jambo savari procission ",
            thumbnail: "https://blr1.digitaloceanspaces.com/inpulse-prod/projects/d8bfca58-7825-4172-8e25-8aa4c4bf66ba/cover-1768227757542.png",
            status: "published",
            technologies: ["Heritage & Culture"],
            sectors: ["Roads & Highways"],
        },
        user: { name: "ANANYA S" }
    },
    {
        project: {
            id: "144bc41e-3aa2-4fd7-91e0-9e51fa7805fb",
            title: "Enhancing crowd safety and experience during the dasara jambo savari procession ",
            thumbnail: "https://blr1.digitaloceanspaces.com/inpulse-prod/projects/144bc41e-3aa2-4fd7-91e0-9e51fa7805fb/cover-1768225367565.png",
            status: "published",
            technologies: ["Travel & Tourism"],
            sectors: ["Tourism & Hospitality"],
        },
        user: { name: "HARSHITHA C L" }
    },
    {
        project: {
            id: "bc6032fa-1f28-45e3-bad6-a1f4239df61a",
            title: "Enhancing Crowd Safety and Experience during the Dasara Jamboo Savari Procession",
            thumbnail: "https://blr1.digitaloceanspaces.com/inpulse-prod/projects/bc6032fa-1f28-45e3-bad6-a1f4239df61a/cover-1768214923966.png",
            status: "published",
            technologies: ["Heritage & Culture"],
            sectors: ["Roads & Highways"],
        },
        user: { name: "ANKITA" }
    },
    {
        project: {
            id: "120498d6-497d-47ed-bb48-e3acb1e085c3",
            title: "Enhancing the crowd safety and experience during dasara jamboo savari procession ",
            thumbnail: "https://blr1.digitaloceanspaces.com/inpulse-prod/projects/120498d6-497d-47ed-bb48-e3acb1e085c3/cover-1768211109526.png",
            status: "published",
            technologies: ["Other"],
            sectors: ["Other"],
        },
        user: { name: "DEEPIKA V S" }
    },
    {
        project: {
            id: "7f8682e1-f0b2-4707-a7f2-807bafc7a2d8",
            title: "MySafety - A Guide for your Safety",
            thumbnail: "https://blr1.digitaloceanspaces.com/inpulse-prod/projects/7f8682e1-f0b2-4707-a7f2-807bafc7a2d8/cover-1768209478295.png",
            status: "published",
            technologies: ["Smart Education"],
        },
        user: { name: "MOHAMMED ALI" }
    }
];
