import * as z from "zod"

export const basicInfoSchema = z.object({
    name: z.string().min(2, "Name is required"),
    designation: z.string().min(2, "Designation is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
    district: z.enum([
        'Dakshina Kannada',
        'Udupi',
        'Mysuru',
        'Mandya',
        'Hassan',
        'Chikkamagaluru',
        'Kodagu',
        'Chamarajanagar',
        'Shivamogga'
    ]),
    taluk: z.string().optional(),
    village: z.string().optional(),
    organization: z.string().optional(),
    organizationType: z.enum([
        'Government',
        'NGO',
        'Private',
        'Academic',
        'Cooperative',
        'Community',
        'Research',
        'Financial'
    ]).optional(),
    department: z.string().optional(),
    bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
    // Avatar handling would be separate (file upload)
})

export const professionalSchema = z.object({
    expertise: z.array(z.string()).min(1, "Select at least one area of expertise"),
    specializations: z.array(z.string()).optional(),
    certifications: z.array(z.string()).optional(),
    yearsExperience: z.coerce.number().min(0).max(100).optional(),
    education: z.array(z.string()).optional(),
    // Career history as JSON or separate array of objects
})

export const locationContactSchema = z.object({
    address: z.string().optional(),
    pincode: z.string().regex(/^\d{6}$/, "Invalid Pincode").optional(),
    latitude: z.coerce.number().optional(),
    longitude: z.coerce.number().optional(),
    officePhone: z.string().optional(),
    whatsapp: z.string().optional(),
    linkedIn: z.string().url("Invalid URL").optional().or(z.literal("")),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
})

// Combined schema for the full form
export const stakeholderFormSchema = basicInfoSchema
    .merge(professionalSchema)
    .merge(locationContactSchema)
// Add other schemas as needed
