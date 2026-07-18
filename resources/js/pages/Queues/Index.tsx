import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Queue {
    id: number;
    name: string;
    description: string | null;
    status: string;
    max_capacity: number | null;
    positions_count: number;
}

interface Props {
    queues: {
        data: Queue[];
        links: any;
        meta: any;
    };
}

export default function QueueIndex({ queues }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'paused':
                return 'bg-yellow-100 text-yellow-800';
            case 'inactive':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Head title="Queues" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Queues</h1>
                </div>

                <Card className="p-6">
                    <div className="grid gap-6">
                        {queues.data.length > 0 ? (
                            queues.data.map((queue) => (
                                <div
                                    key={queue.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">{queue.name}</h3>
                                            {queue.description && (
                                                <p className="text-gray-600 text-sm mt-1">{queue.description}</p>
                                            )}
                                            <div className="mt-4 flex gap-6 text-sm">
                                                <div>
                                                    <span className="text-gray-600">Total Positions:</span>
                                                    <span className="font-semibold ml-2">{queue.positions_count}</span>
                                                </div>
                                                {queue.max_capacity && (
                                                    <div>
                                                        <span className="text-gray-600">Max Capacity:</span>
                                                        <span className="font-semibold ml-2">{queue.max_capacity}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 items-end">
                                            <span
                                                className={`inline-block px-3 py-1 text-xs rounded font-semibold ${getStatusColor(
                                                    queue.status
                                                )}`}
                                            >
                                                {queue.status.charAt(0).toUpperCase() + queue.status.slice(1)}
                                            </span>
                                            <Link href={route('queues.show', queue.id)}>
                                                <Button variant="outline" size="sm">
                                                    View Queue
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 text-center py-8">No queues available</p>
                        )}
                    </div>
                </Card>
            </div>
        </>
    );
}
