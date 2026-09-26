export type ProjectStatus = 'ON TRACK' | 'AT RISK' | 'DELAYED';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type AvailabilityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export type TaskWorkflowStatus =
  | 'Deployed'
  | 'In development'
  | 'Review required'
  | 'New'
  | 'Completed'
  | 'In Progress'
  | 'Not Started'
  | 'Blocked';

export interface TaskComment {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  timestamp: string;
}

export interface Subtask {
  id: string;
  name: string;
  assignee: string;
  assigneeAvatar?: string;
  status: TaskWorkflowStatus;
  startDate?: string;
  dueDate?: string;
  effortHours?: number;
  duration?: string;
}

export interface Task {
  id: string;
  name: string;
  assignee: string;
  assigneeAvatar?: string;
  status: TaskWorkflowStatus | string;
  blocked: boolean;
  deadline?: string;
  startDate?: string;
  dueDate?: string;
  role?: string;
  duration?: string;
  effortHours?: number;
  timeSpentHours?: number;
  subtasks?: Subtask[];
  comments?: TaskComment[];
  dependencies?: string[]; // IDs of predecessor tasks
}

export interface AutomationRule {
  id: string;
  title: string;
  trigger: string;
  action: string;
  active: boolean;
  category: 'Risk' | 'Status' | 'Talent' | 'Integration';
}

export interface Milestone {
  name: string;
  progress: number;
  status: 'Completed' | 'In Progress' | 'Not Started';
}

export interface ResourceGap {
  role: string;
  required: number;
  available: number;
}

export interface Project {
  id: number;
  name: string;
  manager: string;
  progress: number;
  expectedProgress: number;
  deadline: string;
  startDate: string;
  budget: number;
  budgetUsed: number;
  team: number;
  status: ProjectStatus;
  description: string;
  category: 'E-Commerce' | 'FinTech' | 'Healthcare' | 'Logistics' | 'Enterprise' | 'AI & IoT';
  tasks: Task[];
  milestones: Milestone[];
  resourceGaps: ResourceGap[];
  priority: 'Critical' | 'High' | 'Medium' | 'Standard';
  lastUpdateSource?: string;
  lastUpdateText?: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  skills: string[];
  experienceYears: number;
  pastProjectsCount: number;
  pastProjectNames: string[];
  availability: AvailabilityLevel;
  workload: number; // percentage e.g. 85, 120
  monthlyCost: number;
  currentProject: string;
  avatarBg: string;
}

export interface RiskFactor {
  label: string;
  detail: string;
  weight: number;
  percent: number;
}

export interface RiskAnalysis {
  riskScore: number;
  riskLevel: RiskLevel;
  predictedDelay: number;
  factors: RiskFactor[];
}

export interface RescueOption {
  id: number;
  title: string;
  description: string;
  riskBefore: number;
  riskAfter: number;
  delayBefore: number;
  delayAfter: number;
  cost: number;
}

export interface DataSource {
  id: string;
  name: string;
  category: string;
  icon: string;
  connected: boolean;
  scopedPermissions: string[];
  allowedCount: number;
  totalCount: number;
  lastSync: string;
  isBrand?: boolean;
}

export interface ExtractedUpdate {
  id: string;
  source: string;
  channel: string;
  rawMessage: string;
  extractedProject: string;
  extractedTask: string;
  extractedStatus: 'Pending' | 'In Progress' | 'Completed' | 'Blocked';
  estimatedDelay: string;
  riskImpact: RiskLevel;
  timestamp: string;
  senderRole: string;
}

export interface HistoricalProjectTeam {
  id: string;
  projectName: string;
  category: string;
  completionDate: string;
  successRating: number; // out of 5
  durationMonths: number;
  teamRoles: {
    role: string;
    employeeName: string;
    employeeId: string;
    contribution: string;
  }[];
}

export interface UserSession {
  loggedIn: boolean;
  name: string;
  email: string;
  roleTitle: string;
  persona: 'director' | 'manager' | 'talent_lead';
}
