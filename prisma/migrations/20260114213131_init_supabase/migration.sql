-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STAKEHOLDER', 'STUDENT', 'MANAGER', 'ADMIN', 'RESEARCHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "passwordHash" TEXT,
    "avatar" TEXT,
    "phone" TEXT,
    "alternatePhone" TEXT,
    "preferredLanguage" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StakeholderProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "alternateDesignations" TEXT[],
    "organization" TEXT,
    "organizationType" TEXT,
    "department" TEXT,
    "bio" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" TEXT,
    "education" TEXT[],
    "expertise" TEXT[],
    "specializations" TEXT[],
    "certifications" TEXT[],
    "yearsExperience" INTEGER,
    "careerHistory" JSONB,
    "teamSize" INTEGER,
    "teamComposition" JSONB,
    "budget" DOUBLE PRECISION,
    "jurisdiction" TEXT[],
    "decisionMakingAuthority" TEXT,
    "keyResponsibilities" TEXT[],
    "reportingTo" TEXT,
    "district" TEXT NOT NULL,
    "taluk" TEXT,
    "village" TEXT,
    "address" TEXT,
    "landmark" TEXT,
    "pincode" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "coverageDistricts" TEXT[],
    "coverageTaluks" TEXT[],
    "coverageVillages" TEXT[],
    "serviceRadius" INTEGER,
    "officePhone" TEXT,
    "officeMobile" TEXT,
    "officeEmail" TEXT,
    "officeAddress" TEXT,
    "personalMobile" TEXT,
    "personalEmail" TEXT,
    "whatsapp" TEXT,
    "telegram" TEXT,
    "linkedIn" TEXT,
    "twitter" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "researchGate" TEXT,
    "googleScholar" TEXT,
    "website" TEXT,
    "organizationWebsite" TEXT,
    "preferredContactMethod" TEXT,
    "availableHours" TEXT,
    "tags" TEXT[],
    "keywords" TEXT[],
    "communityAffiliation" TEXT,
    "casteCommunity" TEXT,
    "languagesSpoken" TEXT[],
    "culturalContext" TEXT,
    "landHolding" DOUBLE PRECISION,
    "cropsCultivated" TEXT[],
    "farmingType" TEXT,
    "irrigationSource" TEXT[],
    "boatType" TEXT,
    "fishingLicense" TEXT,
    "catchType" TEXT[],
    "serviceType" TEXT,
    "patientsServed" INTEGER,
    "healthFacility" TEXT,
    "tribe" TEXT,
    "tribalCard" TEXT,
    "forestRights" TEXT,
    "ngoRegistration" TEXT,
    "ngoDarpanId" TEXT,
    "donorAgencies" TEXT[],
    "employeeId" TEXT,
    "cadre" TEXT,
    "postingHistory" JSONB,
    "transferDate" TIMESTAMP(3),
    "populationServed" INTEGER,
    "geographicReach" TEXT,
    "annualBeneficiaries" INTEGER,
    "keyAchievements" TEXT[],
    "awards" TEXT[],
    "publications" TEXT[],
    "infrastructure" TEXT[],
    "vehiclesOwned" TEXT[],
    "technologyAccess" TEXT[],
    "fundingSource" TEXT[],
    "annualBudget" DOUBLE PRECISION,
    "partnerOrganizations" TEXT[],
    "networkMemberships" TEXT[],
    "collaborationInterest" TEXT[],
    "mentoringCapability" BOOLEAN NOT NULL DEFAULT false,
    "trainingCapability" BOOLEAN NOT NULL DEFAULT false,
    "topChallenges" TEXT[],
    "resourceNeeds" TEXT[],
    "capacityGaps" TEXT[],
    "priorityAreas" TEXT[],
    "innovationsPracticed" TEXT[],
    "successStories" TEXT[],
    "replicableModels" TEXT[],
    "verificationStatus" TEXT NOT NULL DEFAULT 'pending',
    "verificationDate" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "verificationNotes" TEXT,
    "dataQualityScore" INTEGER,
    "lastVerified" TIMESTAMP(3),
    "dataSource" TEXT,
    "collectedBy" TEXT,
    "collectionMethod" TEXT,
    "addedBy" TEXT,
    "totalInteractions" INTEGER NOT NULL DEFAULT 0,
    "lastInteraction" TIMESTAMP(3),
    "engagementScore" INTEGER,
    "responseRate" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StakeholderProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sector" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "parentId" TEXT,
    "problemCount" INTEGER NOT NULL DEFAULT 0,
    "stakeholderCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemStatement" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "districts" TEXT[],
    "taluks" TEXT[],
    "villages" TEXT[],
    "domain" TEXT NOT NULL,
    "subDomain" TEXT,
    "tags" TEXT[],
    "keywords" TEXT[],
    "affectedPopulation" INTEGER,
    "affectedDemographic" TEXT,
    "currentImpact" TEXT,
    "projectedImpact" TEXT,
    "rootCauses" TEXT[],
    "contributingFactors" TEXT[],
    "barriers" TEXT[],
    "historicalContext" TEXT,
    "quantitativeData" JSONB,
    "dataSource" TEXT,
    "lastUpdated" TIMESTAMP(3),
    "primaryStakeholders" TEXT[],
    "affectedGroups" TEXT[],
    "documents" TEXT[],
    "references" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'active',
    "priority" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProblemStatement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solution" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "approach" TEXT,
    "methodology" TEXT,
    "components" TEXT[],
    "timeline" TEXT,
    "phases" JSONB,
    "milestones" TEXT[],
    "budget" DOUBLE PRECISION,
    "budgetBreakdown" JSONB,
    "humanResources" TEXT[],
    "technicalResources" TEXT[],
    "infrastructure" TEXT[],
    "leadOrganization" TEXT,
    "implementingPartners" TEXT[],
    "fundingPartners" TEXT[],
    "technicalPartners" TEXT[],
    "pilotResults" TEXT,
    "evidence" TEXT[],
    "metrics" TEXT,
    "successIndicators" TEXT[],
    "expectedImpact" TEXT,
    "actualImpact" TEXT,
    "beneficiaries" INTEGER,
    "geographicReach" TEXT[],
    "scalabilityAssessment" TEXT,
    "replicationPotential" TEXT,
    "adaptationGuidelines" TEXT,
    "risks" TEXT[],
    "mitigationStrategies" TEXT[],
    "lessonsLearned" TEXT,
    "bestPractices" TEXT[],
    "documentation" TEXT[],
    "tags" TEXT[],
    "proposedBy" TEXT,
    "proposedDate" TIMESTAMP(3),
    "lastReviewed" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Solution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportingOrg" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "type" TEXT NOT NULL,
    "subType" TEXT,
    "description" TEXT,
    "mission" TEXT,
    "vision" TEXT,
    "founded" INTEGER,
    "registrationNumber" TEXT,
    "ngoDarpanId" TEXT,
    "website" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "alternatePhone" TEXT,
    "district" TEXT,
    "address" TEXT,
    "pincode" TEXT,
    "state" TEXT,
    "country" TEXT NOT NULL DEFAULT 'India',
    "ceo" TEXT,
    "founder" TEXT,
    "keyContacts" JSONB,
    "geographicReach" TEXT[],
    "annualBudget" DOUBLE PRECISION,
    "teamSize" INTEGER,
    "beneficiariesServed" INTEGER,
    "supportsStages" TEXT[],
    "focusSectors" TEXT[],
    "focusProblems" TEXT[],
    "resourcesOffered" TEXT[],
    "programsOffered" TEXT[],
    "servicesOffered" TEXT[],
    "fundingRange" TEXT,
    "fundingType" TEXT[],
    "applicationProcess" TEXT,
    "eligibilityCriteria" TEXT,
    "facilities" TEXT[],
    "equipment" TEXT[],
    "digitalResources" TEXT[],
    "projectsSupported" INTEGER,
    "successStories" TEXT[],
    "notableAlumni" TEXT[],
    "awards" TEXT[],
    "partnerOrganizations" TEXT[],
    "networkMemberships" TEXT[],
    "accreditations" TEXT[],
    "applicationDeadlines" JSONB,
    "applicationUrl" TEXT,
    "contactForApplication" TEXT,
    "selectionProcess" TEXT,
    "documents" TEXT[],
    "reports" TEXT[],
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedDate" TIMESTAMP(3),
    "dataQuality" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupportingOrg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportingOrgRelation" (
    "id" TEXT NOT NULL,
    "stakeholderId" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "relationshipType" TEXT NOT NULL,
    "role" TEXT,
    "notes" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "projectsCollaborated" TEXT[],
    "fundingReceived" DOUBLE PRECISION,
    "supportReceived" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupportingOrgRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StakeholderLink" (
    "id" TEXT NOT NULL,
    "stakeholderAId" TEXT NOT NULL,
    "stakeholderBId" TEXT NOT NULL,
    "linkType" TEXT NOT NULL,
    "strength" INTEGER NOT NULL,
    "description" TEXT,
    "notes" TEXT,
    "commonProblems" TEXT[],
    "commonSolutions" TEXT[],
    "sharedProjects" TEXT[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "lastInteraction" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StakeholderLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "institution" TEXT,
    "program" TEXT,
    "year" INTEGER,
    "rollNumber" TEXT,
    "projectName" TEXT,
    "projectDescription" TEXT,
    "focusArea" TEXT,
    "focusSectors" TEXT[],
    "teamSize" INTEGER,
    "teamMembers" JSONB,
    "workingOnProblems" TEXT[],
    "managerId" TEXT,
    "stage" TEXT,
    "milestones" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValueProposition" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "customerJobs" TEXT[],
    "pains" TEXT[],
    "gains" TEXT[],
    "painRelievers" TEXT[],
    "gainCreators" TEXT[],
    "productsServices" TEXT[],
    "problemStatement" TEXT,
    "proposedSolution" TEXT,
    "targetStakeholder" TEXT,
    "validationStatus" TEXT NOT NULL DEFAULT 'draft',
    "validationNotes" TEXT,
    "validatedBy" TEXT,
    "validatedDate" TIMESTAMP(3),
    "feedback" JSONB,
    "iterationNumber" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ValueProposition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManagerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organization" TEXT,
    "role" TEXT,
    "bio" TEXT,
    "expertise" TEXT[],
    "maxMentees" INTEGER,
    "focusSectors" TEXT[],
    "focusProblems" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManagerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearcherProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "institution" TEXT,
    "department" TEXT,
    "researchArea" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearcherProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interaction" (
    "id" TEXT NOT NULL,
    "initiatorId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "stakeholderId" TEXT,
    "type" TEXT NOT NULL,
    "channel" TEXT,
    "subject" TEXT,
    "notes" TEXT,
    "duration" INTEGER,
    "location" TEXT,
    "outcome" TEXT,
    "actionItems" TEXT[],
    "nextSteps" TEXT[],
    "followUpDate" TIMESTAMP(3),
    "followUpCompleted" BOOLEAN NOT NULL DEFAULT false,
    "documents" TEXT[],
    "photos" TEXT[],
    "recordings" TEXT[],
    "summary" TEXT,
    "keyPoints" TEXT[],
    "sentiment" TEXT,
    "topics" TEXT[],
    "effectiveness" INTEGER,
    "feedback" TEXT,
    "scheduledAt" TIMESTAMP(3),
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "noteType" TEXT,
    "tags" TEXT[],
    "stakeholderId" TEXT,
    "problemId" TEXT,
    "solutionId" TEXT,
    "folder" TEXT,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "sharedWith" TEXT[],
    "visibility" TEXT NOT NULL DEFAULT 'private',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarEvent" (
    "id" TEXT NOT NULL,
    "organizerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "eventType" TEXT NOT NULL,
    "participantIds" TEXT[],
    "stakeholderIds" TEXT[],
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    "allDay" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "locationDetails" TEXT,
    "isVirtual" BOOLEAN NOT NULL DEFAULT false,
    "meetingLink" TEXT,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "reminders" JSONB,
    "interactionId" TEXT,
    "transcriptId" TEXT,
    "recurring" BOOLEAN NOT NULL DEFAULT false,
    "recurrenceRule" TEXT,
    "notes" TEXT,
    "attachments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CalendarEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transcript" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "transcriptType" TEXT NOT NULL,
    "stakeholderId" TEXT,
    "calendarEventId" TEXT,
    "participants" JSONB,
    "interviewer" TEXT,
    "interviewee" TEXT,
    "originalFile" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER,
    "fileName" TEXT NOT NULL,
    "rawText" TEXT,
    "processedText" TEXT,
    "processingStatus" TEXT NOT NULL DEFAULT 'pending',
    "processingError" TEXT,
    "summary" TEXT,
    "keyPoints" TEXT[],
    "topics" TEXT[],
    "actionItems" TEXT[],
    "insights" TEXT[],
    "quotes" TEXT[],
    "recordedDate" TIMESTAMP(3),
    "duration" INTEGER,
    "language" TEXT NOT NULL DEFAULT 'en',
    "quality" TEXT,
    "tags" TEXT[],
    "sectors" TEXT[],
    "problemAreas" TEXT[],
    "uploadedBy" TEXT NOT NULL,
    "visibility" TEXT NOT NULL DEFAULT 'private',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transcript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VectorEmbedding" (
    "id" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "transcriptId" TEXT,
    "text" TEXT NOT NULL,
    "embedding" DOUBLE PRECISION[],
    "metadata" JSONB,
    "chunkIndex" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VectorEmbedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchReport" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "reportType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "scope" JSONB,
    "districts" TEXT[],
    "timeFrame" JSONB,
    "researchQuestions" TEXT[],
    "methodology" TEXT,
    "executiveSummary" TEXT,
    "introduction" TEXT,
    "findings" TEXT,
    "analysis" TEXT,
    "recommendations" TEXT[],
    "conclusions" TEXT,
    "keyFindings" TEXT[],
    "stakeholdersAnalyzed" INTEGER,
    "interactionsAnalyzed" INTEGER,
    "transcriptsAnalyzed" INTEGER,
    "dataSources" TEXT[],
    "generatedByAI" BOOLEAN NOT NULL DEFAULT false,
    "aiModel" TEXT,
    "humanReviewed" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT NOT NULL,
    "contributors" TEXT[],
    "researcherId" TEXT,
    "publishedDate" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "pdfUrl" TEXT,
    "attachments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SectorToStakeholderProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SectorToStakeholderProfile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_SectorToSolution" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SectorToSolution_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProblemStatementToSector" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProblemStatementToSector_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProblemStatementToStakeholderProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProblemStatementToStakeholderProfile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProblemStatementToSolution" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProblemStatementToSolution_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_SolutionToStakeholderProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SolutionToStakeholderProfile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_SolutionToSupportingOrg" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SolutionToSupportingOrg_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ResearchReportToSector" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ResearchReportToSector_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "StakeholderProfile_userId_key" ON "StakeholderProfile"("userId");

-- CreateIndex
CREATE INDEX "StakeholderProfile_district_idx" ON "StakeholderProfile"("district");

-- CreateIndex
CREATE INDEX "StakeholderProfile_verificationStatus_idx" ON "StakeholderProfile"("verificationStatus");

-- CreateIndex
CREATE INDEX "StakeholderProfile_organizationType_idx" ON "StakeholderProfile"("organizationType");

-- CreateIndex
CREATE UNIQUE INDEX "Sector_name_key" ON "Sector"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Sector_slug_key" ON "Sector"("slug");

-- CreateIndex
CREATE INDEX "Sector_slug_idx" ON "Sector"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProblemStatement_code_key" ON "ProblemStatement"("code");

-- CreateIndex
CREATE INDEX "ProblemStatement_severity_idx" ON "ProblemStatement"("severity");

-- CreateIndex
CREATE INDEX "ProblemStatement_domain_idx" ON "ProblemStatement"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "Solution_code_key" ON "Solution"("code");

-- CreateIndex
CREATE INDEX "Solution_status_idx" ON "Solution"("status");

-- CreateIndex
CREATE INDEX "Solution_type_idx" ON "Solution"("type");

-- CreateIndex
CREATE INDEX "SupportingOrg_type_idx" ON "SupportingOrg"("type");

-- CreateIndex
CREATE INDEX "SupportingOrg_district_idx" ON "SupportingOrg"("district");

-- CreateIndex
CREATE UNIQUE INDEX "SupportingOrgRelation_stakeholderId_orgId_key" ON "SupportingOrgRelation"("stakeholderId", "orgId");

-- CreateIndex
CREATE INDEX "StakeholderLink_linkType_idx" ON "StakeholderLink"("linkType");

-- CreateIndex
CREATE UNIQUE INDEX "StakeholderLink_stakeholderAId_stakeholderBId_key" ON "StakeholderLink"("stakeholderAId", "stakeholderBId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_userId_key" ON "StudentProfile"("userId");

-- CreateIndex
CREATE INDEX "ValueProposition_studentId_idx" ON "ValueProposition"("studentId");

-- CreateIndex
CREATE INDEX "ValueProposition_validationStatus_idx" ON "ValueProposition"("validationStatus");

-- CreateIndex
CREATE UNIQUE INDEX "ManagerProfile_userId_key" ON "ManagerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ResearcherProfile_userId_key" ON "ResearcherProfile"("userId");

-- CreateIndex
CREATE INDEX "Interaction_initiatorId_idx" ON "Interaction"("initiatorId");

-- CreateIndex
CREATE INDEX "Interaction_targetId_idx" ON "Interaction"("targetId");

-- CreateIndex
CREATE INDEX "Interaction_stakeholderId_idx" ON "Interaction"("stakeholderId");

-- CreateIndex
CREATE INDEX "Interaction_occurredAt_idx" ON "Interaction"("occurredAt");

-- CreateIndex
CREATE INDEX "Interaction_type_idx" ON "Interaction"("type");

-- CreateIndex
CREATE INDEX "Note_authorId_idx" ON "Note"("authorId");

-- CreateIndex
CREATE INDEX "CalendarEvent_organizerId_idx" ON "CalendarEvent"("organizerId");

-- CreateIndex
CREATE INDEX "CalendarEvent_startTime_idx" ON "CalendarEvent"("startTime");

-- CreateIndex
CREATE INDEX "CalendarEvent_status_idx" ON "CalendarEvent"("status");

-- CreateIndex
CREATE INDEX "Transcript_stakeholderId_idx" ON "Transcript"("stakeholderId");

-- CreateIndex
CREATE INDEX "Transcript_processingStatus_idx" ON "Transcript"("processingStatus");

-- CreateIndex
CREATE INDEX "Transcript_recordedDate_idx" ON "Transcript"("recordedDate");

-- CreateIndex
CREATE INDEX "VectorEmbedding_sourceId_idx" ON "VectorEmbedding"("sourceId");

-- CreateIndex
CREATE INDEX "VectorEmbedding_sourceType_idx" ON "VectorEmbedding"("sourceType");

-- CreateIndex
CREATE INDEX "ResearchReport_status_idx" ON "ResearchReport"("status");

-- CreateIndex
CREATE INDEX "ResearchReport_reportType_idx" ON "ResearchReport"("reportType");

-- CreateIndex
CREATE INDEX "ResearchReport_publishedDate_idx" ON "ResearchReport"("publishedDate");

-- CreateIndex
CREATE INDEX "_SectorToStakeholderProfile_B_index" ON "_SectorToStakeholderProfile"("B");

-- CreateIndex
CREATE INDEX "_SectorToSolution_B_index" ON "_SectorToSolution"("B");

-- CreateIndex
CREATE INDEX "_ProblemStatementToSector_B_index" ON "_ProblemStatementToSector"("B");

-- CreateIndex
CREATE INDEX "_ProblemStatementToStakeholderProfile_B_index" ON "_ProblemStatementToStakeholderProfile"("B");

-- CreateIndex
CREATE INDEX "_ProblemStatementToSolution_B_index" ON "_ProblemStatementToSolution"("B");

-- CreateIndex
CREATE INDEX "_SolutionToStakeholderProfile_B_index" ON "_SolutionToStakeholderProfile"("B");

-- CreateIndex
CREATE INDEX "_SolutionToSupportingOrg_B_index" ON "_SolutionToSupportingOrg"("B");

-- CreateIndex
CREATE INDEX "_ResearchReportToSector_B_index" ON "_ResearchReportToSector"("B");

-- AddForeignKey
ALTER TABLE "StakeholderProfile" ADD CONSTRAINT "StakeholderProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StakeholderProfile" ADD CONSTRAINT "StakeholderProfile_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportingOrgRelation" ADD CONSTRAINT "SupportingOrgRelation_stakeholderId_fkey" FOREIGN KEY ("stakeholderId") REFERENCES "StakeholderProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportingOrgRelation" ADD CONSTRAINT "SupportingOrgRelation_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "SupportingOrg"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StakeholderLink" ADD CONSTRAINT "StakeholderLink_stakeholderAId_fkey" FOREIGN KEY ("stakeholderAId") REFERENCES "StakeholderProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StakeholderLink" ADD CONSTRAINT "StakeholderLink_stakeholderBId_fkey" FOREIGN KEY ("stakeholderBId") REFERENCES "StakeholderProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "ManagerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValueProposition" ADD CONSTRAINT "ValueProposition_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValueProposition" ADD CONSTRAINT "ValueProposition_targetStakeholder_fkey" FOREIGN KEY ("targetStakeholder") REFERENCES "StakeholderProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManagerProfile" ADD CONSTRAINT "ManagerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearcherProfile" ADD CONSTRAINT "ResearcherProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_stakeholderId_fkey" FOREIGN KEY ("stakeholderId") REFERENCES "StakeholderProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarEvent" ADD CONSTRAINT "CalendarEvent_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_stakeholderId_fkey" FOREIGN KEY ("stakeholderId") REFERENCES "StakeholderProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VectorEmbedding" ADD CONSTRAINT "VectorEmbedding_transcriptId_fkey" FOREIGN KEY ("transcriptId") REFERENCES "Transcript"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchReport" ADD CONSTRAINT "ResearchReport_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchReport" ADD CONSTRAINT "ResearchReport_researcherId_fkey" FOREIGN KEY ("researcherId") REFERENCES "ResearcherProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectorToStakeholderProfile" ADD CONSTRAINT "_SectorToStakeholderProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectorToStakeholderProfile" ADD CONSTRAINT "_SectorToStakeholderProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "StakeholderProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectorToSolution" ADD CONSTRAINT "_SectorToSolution_A_fkey" FOREIGN KEY ("A") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectorToSolution" ADD CONSTRAINT "_SectorToSolution_B_fkey" FOREIGN KEY ("B") REFERENCES "Solution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemStatementToSector" ADD CONSTRAINT "_ProblemStatementToSector_A_fkey" FOREIGN KEY ("A") REFERENCES "ProblemStatement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemStatementToSector" ADD CONSTRAINT "_ProblemStatementToSector_B_fkey" FOREIGN KEY ("B") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemStatementToStakeholderProfile" ADD CONSTRAINT "_ProblemStatementToStakeholderProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "ProblemStatement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemStatementToStakeholderProfile" ADD CONSTRAINT "_ProblemStatementToStakeholderProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "StakeholderProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemStatementToSolution" ADD CONSTRAINT "_ProblemStatementToSolution_A_fkey" FOREIGN KEY ("A") REFERENCES "ProblemStatement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemStatementToSolution" ADD CONSTRAINT "_ProblemStatementToSolution_B_fkey" FOREIGN KEY ("B") REFERENCES "Solution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SolutionToStakeholderProfile" ADD CONSTRAINT "_SolutionToStakeholderProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Solution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SolutionToStakeholderProfile" ADD CONSTRAINT "_SolutionToStakeholderProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "StakeholderProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SolutionToSupportingOrg" ADD CONSTRAINT "_SolutionToSupportingOrg_A_fkey" FOREIGN KEY ("A") REFERENCES "Solution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SolutionToSupportingOrg" ADD CONSTRAINT "_SolutionToSupportingOrg_B_fkey" FOREIGN KEY ("B") REFERENCES "SupportingOrg"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResearchReportToSector" ADD CONSTRAINT "_ResearchReportToSector_A_fkey" FOREIGN KEY ("A") REFERENCES "ResearchReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResearchReportToSector" ADD CONSTRAINT "_ResearchReportToSector_B_fkey" FOREIGN KEY ("B") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;
