export type Job = {
    id: number;
    title: string;
    category: string;
    description: string;
    requirements: string;
    package: string;
    location: string;
    type: string;
    status: string;
    createdAt: string;
};

export const jobs: Job[] = [
    {
        id: 1,
        title: 'Sales and Client Relations Executive',
        category: 'Sales',
        description: 'Drive customer engagement and support sales for bespoke tailoring and ready-to-wear collections.',
        requirements: 'Strong communication, customer service experience, and passion for fashion retail.',
        package: 'Negotiable, plus incentives',
        location: 'Hyderabad',
        type: 'Full Time',
        status: 'Open',
        createdAt: '2026-03-20T09:00:00Z',
    },
    {
        id: 2,
        title: 'Tailoring Production Coordinator',
        category: 'Operations',
        description: 'Manage production timelines, sample coordination, and quality checks across tailoring workflows.',
        requirements: 'Experience with garment production, excellent organization, and vendor coordination skills.',
        package: 'Competitive salary',
        location: 'Hyderabad',
        type: 'Full Time',
        status: 'Open',
        createdAt: '2026-03-18T08:30:00Z',
    },
    {
        id: 3,
        title: 'E-Commerce Content Specialist',
        category: 'Marketing',
        description: 'Create product content, manage catalog updates, and support digital campaigns for the website.',
        requirements: 'Strong writing skills, familiarity with fashion e-commerce, and attention to visual detail.',
        package: 'Market-aligned salary',
        location: 'Remote / Karachi',
        type: 'Part Time',
        status: 'Open',
        createdAt: '2026-03-22T11:15:00Z',
    },
    {
        id: 4,
        title: 'Design Assistant',
        category: 'Design',
        description: 'Assist the design team with fabric sourcing, mood board creation, and sample styling.',
        requirements: 'Creative mindset, knowledge of fabrics, and proficiency with design tools.',
        package: 'Attractive stipend + growth opportunities',
        location: 'Hyderabad',
        type: 'Internship',
        status: 'Open',
        createdAt: '2026-03-25T10:00:00Z',
    },
    {
        id: 5,
        title: 'Customer Experience Coordinator',
        category: 'Customer Service',
        description: 'Support clients through the tailoring journey and ensure exceptional in-store service.',
        requirements: 'Excellent communication skills and a customer-first attitude.',
        package: 'Fixed salary with performance bonus',
        location: 'Hyderabad',
        type: 'Full Time',
        status: 'Open',
        createdAt: '2026-03-26T14:00:00Z',
    },
];
