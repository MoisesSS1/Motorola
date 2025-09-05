export type QueueAllInSubQueue = {
    _id: string;
    name: string;
    parentQueueId: string | null;
    subQueues: QueueAllInSubQueue[];
};

