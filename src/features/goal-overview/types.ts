export const MilestoneStatus = {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed'
} as const;

export type MilestoneStatus = typeof MilestoneStatus[keyof typeof MilestoneStatus];

export interface Milestone {
    id: string;
    title: string;
    status: MilestoneStatus;
    createdAt: Date;
    updatedAt: Date;
}

// Mock data for testing milestones
export const mockMilestones: Milestone[] = [
    {
        id: '1',
        title: 'Read 3 books by March',
        status: MilestoneStatus.COMPLETED,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-15')
    },
    {
        id: '2',
        title: 'Read 6 books by June',
        status: MilestoneStatus.IN_PROGRESS,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-04-01')
    },
    {
        id: '3',
        title: 'Read 10 books by December',
        status: MilestoneStatus.NOT_STARTED,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
    }
];