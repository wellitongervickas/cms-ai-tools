export enum ResumeOptmizedFor {
  ATS = "ats",
  HR = "hr",
  BOTH = "both",
}

export const getResumeOptmizedForOptions = () => {
  return [
    {
      value: ResumeOptmizedFor.ATS,
      label: "ATS",
    },
    {
      value: ResumeOptmizedFor.HR,
      label: "HR",
    },
    {
      value: ResumeOptmizedFor.BOTH,
      label: "Both",
    },
  ];
};

export enum ResumeExportFormat {
  MARKDOWN = "markdown",
}

export const getResumeExportFormatOptions = () => {
  return [
    {
      value: ResumeExportFormat.MARKDOWN,
      label: "Markdown",
    },
  ];
};

export enum ResumeExportType {
  PLAIN_TEXT = "plainText",
}

export const getResumeExportTypeOptions = () => {
  return [
    {
      value: ResumeExportType.PLAIN_TEXT,
      label: "Plain Text",
    },
  ];
};

export enum ResumeImportType {
  PLAIN_TEXT = "plainText",
}

export const getResumeImportTypeOptions = () => {
  return [
    {
      value: ResumeImportType.PLAIN_TEXT,
      label: "Plain Text",
    },
  ];
};

export enum ResumeExportStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

export const getResumeExportStatusOptions = () => {
  return [
    {
      value: ResumeExportStatus.PENDING,
      label: "Pending",
    },
    {
      value: ResumeExportStatus.COMPLETED,
      label: "Completed",
    },
    {
      value: ResumeExportStatus.FAILED,
      label: "Failed",
    },
  ];
};

export enum ResumeContactType {
  TEXT = "text",
  EMAIL = "email",
  PHONE = "phone",
  LINK = "link",
}

export const getResumeContactTypeOptions = () => {
  return [
    {
      value: ResumeContactType.TEXT,
      label: "Text",
    },
    {
      value: ResumeContactType.EMAIL,
      label: "Email",
    },
    {
      value: ResumeContactType.PHONE,
      label: "Phone",
    },
    {
      value: ResumeContactType.LINK,
      label: "Link",
    },
  ];
};

export enum ResumeExperienceType {
  FULL_TIME = "fullTime",
  PART_TIME = "partTime",
  FREELANCE = "freelance",
  CONTRACT = "contract",
  INTERNSHIP = "internship",
}

export const getResumeExperienceTypeOptions = () => {
  return [
    {
      value: ResumeExperienceType.FULL_TIME,
      label: "Full Time",
    },
    {
      value: ResumeExperienceType.PART_TIME,
      label: "Part Time",
    },
    {
      value: ResumeExperienceType.FREELANCE,
      label: "Freelance",
    },
    {
      value: ResumeExperienceType.CONTRACT,
      label: "Contract",
    },
    {
      value: ResumeExperienceType.INTERNSHIP,
      label: "Internship",
    },
  ];
};

export enum ResumeLanguageLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  NATIVE = "native",
}

export const getResumeLanguageLevelOptions = () => {
  return [
    {
      value: ResumeLanguageLevel.BEGINNER,
      label: "Beginner",
    },
    {
      value: ResumeLanguageLevel.INTERMEDIATE,
      label: "Intermediate",
    },
    {
      value: ResumeLanguageLevel.ADVANCED,
      label: "Advanced",
    },
    {
      value: ResumeLanguageLevel.NATIVE,
      label: "Native",
    },
  ];
};

export enum ResumeSkillCategory {
  PROGRAMMING = "programming",
  DESIGN = "design",
  MARKETING = "marketing",
  SALES = "sales",
  BUSINESS = "business",
  FINANCE = "finance",
  EDUCATION = "education",
  OTHER = "other",
}

export const getResumeSkillCategoryOptions = () => {
  return [
    {
      value: ResumeSkillCategory.PROGRAMMING,
      label: "Programming",
    },
    {
      value: ResumeSkillCategory.DESIGN,
      label: "Design",
    },
    {
      value: ResumeSkillCategory.MARKETING,
      label: "Marketing",
    },
    {
      value: ResumeSkillCategory.SALES,
      label: "Sales",
    },
    {
      value: ResumeSkillCategory.BUSINESS,
      label: "Business",
    },
    {
      value: ResumeSkillCategory.FINANCE,
      label: "Finance",
    },
    {
      value: ResumeSkillCategory.EDUCATION,
      label: "Education",
    },
    {
      value: ResumeSkillCategory.OTHER,
      label: "Other",
    },
  ];
};

export enum ResumeTechnologyType {
  FRAMEWORK = "framework",
  LANGUAGE = "language",
  LIBRARY = "library",
  PROTOCOL = "protocol",
  PLATFORM = "platform",
  DATABASE = "database",
  CLOUD = "cloud",
  DEVOPS = "devops",
  TESTING = "testing",
  SECURITY = "security",
  AI = "ai",
  MACHINE_LEARNING = "machine_learning",
  DATA_SCIENCE = "data_science",
  BIG_DATA = "big_data",
  BLOCKCHAIN = "blockchain",
  INTERNET_OF_THINGS = "internet_of_things",
  ROBOTICS = "robotics",
  OTHER = "other",
}

export const getResumeTechnologyTypeOptions = () => {
  return [
    {
      value: ResumeTechnologyType.FRAMEWORK,
      label: "Framework",
    },
    {
      value: ResumeTechnologyType.LANGUAGE,
      label: "Language",
    },
    {
      value: ResumeTechnologyType.LIBRARY,
      label: "Library",
    },
    {
      value: ResumeTechnologyType.PROTOCOL,
      label: "Protocol",
    },
    {
      value: ResumeTechnologyType.PLATFORM,
      label: "Platform",
    },
    {
      value: ResumeTechnologyType.DATABASE,
      label: "Database",
    },
    {
      value: ResumeTechnologyType.CLOUD,
      label: "Cloud",
    },
    {
      value: ResumeTechnologyType.DEVOPS,
      label: "DevOps",
    },
    {
      value: ResumeTechnologyType.TESTING,
      label: "Testing",
    },
    {
      value: ResumeTechnologyType.SECURITY,
      label: "Security",
    },
    {
      value: ResumeTechnologyType.AI,
      label: "AI",
    },
    {
      value: ResumeTechnologyType.MACHINE_LEARNING,
      label: "Machine Learning",
    },
    {
      value: ResumeTechnologyType.DATA_SCIENCE,
      label: "Data Science",
    },
    {
      value: ResumeTechnologyType.BIG_DATA,
      label: "Big Data",
    },
    {
      value: ResumeTechnologyType.BLOCKCHAIN,
      label: "Blockchain",
    },
    {
      value: ResumeTechnologyType.INTERNET_OF_THINGS,
      label: "Internet of Things",
    },
    {
      value: ResumeTechnologyType.ROBOTICS,
      label: "Robotics",
    },
    {
      value: ResumeTechnologyType.OTHER,
      label: "Other",
    },
  ];
};

export enum ResumeToolCategory {
  FINANCIAL = "financial",
  MARKETING = "marketing",
  SALES = "sales",
  BUSINESS = "business",
  FINANCE = "finance",
  EDUCATION = "education",
  OTHER = "other",
}

export const getResumeToolCategoryOptions = () => {
  return [
    {
      value: ResumeToolCategory.FINANCIAL,
      label: "Financial",
    },
    {
      value: ResumeToolCategory.MARKETING,
      label: "Marketing",
    },
    {
      value: ResumeToolCategory.SALES,
      label: "Sales",
    },
    {
      value: ResumeToolCategory.BUSINESS,
      label: "Business",
    },
    {
      value: ResumeToolCategory.FINANCE,
      label: "Finance",
    },
    {
      value: ResumeToolCategory.EDUCATION,
      label: "Education",
    },
    {
      value: ResumeToolCategory.OTHER,
      label: "Other",
    },
  ];
};
