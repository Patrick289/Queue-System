import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Student {
    id: number;
    student_number: string;
    first_name: string;
    last_name: string;
}

interface QueuePosition {
    id: number;
    position: number;
    status: string;
    student: Student;
    joined_at: string;
    started_at: string | null;
    completed_at: string | null;
}

interface Queue {
    id: number;
    name: string;
    description: string | null;
    status: string;
}

interface Props {
    queue: Queue;
    positions: {
        data: QueuePosition[];
        links: any;
        meta: any;
    };
}

export default function QueueShow({ queue, positions }: Props) {
    const {
        data: addStudentData,
        setData: setAddStudentData,
        post: addStudent,
        processing: isAddingStudent,
        errors: addStudentErrors,
        reset: resetAddStudent,
    } = useForm({ student_number: '' });
    const { patch: updateStatus } = useForm();
    const { delete: removeFromQueue } = useForm();

    const handleAddStudent = (e: React.FormEvent) => {
        e.preventDefault();
        addStudent(route('queues.add-student', queue.id), {
            onSuccess: () => resetAddStudent(),
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'waiting':
                return 'bg-blue-100 text-blue-800';
            case 'in_progress':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Head title={queue.name} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{queue.name}</h1>
                        {queue.description && (
                            <p className="mt-2 text-gray-600">
                                {queue.description}
                            </p>
                        )}
                    </div>
                    <span
                        className={`inline-block rounded px-4 py-2 font-semibold ${
                            queue.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : queue.status === 'paused'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                        }`}
                    >
                        {queue.status.charAt(0).toUpperCase() +
                            queue.status.slice(1)}
                    </span>
                </div>

                <Card className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">
                        Add Student to Queue
                    </h2>
                    <form onSubmit={handleAddStudent} className="space-y-2">
                        <div className="flex gap-4">
                            <Input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]{6}"
                                maxLength={6}
                                placeholder="Enter 6-digit student number"
                                value={addStudentData.student_number}
                                onChange={(e) =>
                                    setAddStudentData(
                                        'student_number',
                                        e.target.value
                                            .replace(/\D/g, '')
                                            .slice(0, 6),
                                    )
                                }
                                required
                            />
                            <Button type="submit" disabled={isAddingStudent}>
                                {isAddingStudent ? 'Adding...' : 'Add to Queue'}
                            </Button>
                        </div>
                        <InputError message={addStudentErrors.student_number} />
                    </form>
                </Card>

                <Card className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">
                        Queue Positions ({positions.data.length})
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-2 text-left">
                                        Position
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Student
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Student Number
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Status
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Joined At
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {positions.data.map((position) => (
                                    <tr
                                        key={position.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2 font-semibold">
                                            {position.position}
                                        </td>
                                        <td className="px-4 py-2">
                                            {position.student.first_name}{' '}
                                            {position.student.last_name}
                                        </td>
                                        <td className="px-4 py-2 font-mono text-sm">
                                            {position.student.student_number}
                                        </td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`inline-block rounded px-2 py-1 text-xs ${getStatusColor(
                                                    position.status,
                                                )}`}
                                            >
                                                {position.status.replace(
                                                    '_',
                                                    ' ',
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-sm">
                                            {new Date(
                                                position.joined_at,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="flex gap-2">
                                                {position.status !==
                                                    'completed' && (
                                                    <>
                                                        {position.status ===
                                                            'waiting' && (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        route(
                                                                            'queue-positions.update',
                                                                            position.id,
                                                                        ),
                                                                        {
                                                                            data: {
                                                                                status: 'in_progress',
                                                                            },
                                                                        },
                                                                    )
                                                                }
                                                            >
                                                                Start
                                                            </Button>
                                                        )}
                                                        {position.status ===
                                                            'in_progress' && (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        route(
                                                                            'queue-positions.update',
                                                                            position.id,
                                                                        ),
                                                                        {
                                                                            data: {
                                                                                status: 'completed',
                                                                            },
                                                                        },
                                                                    )
                                                                }
                                                            >
                                                                Complete
                                                            </Button>
                                                        )}
                                                    </>
                                                )}
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                'Remove this student from queue?',
                                                            )
                                                        ) {
                                                            removeFromQueue(
                                                                route(
                                                                    'queue-positions.delete',
                                                                    position.id,
                                                                ),
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Link href={route('queues.index')}>
                    <Button variant="outline">Back to Queues</Button>
                </Link>
            </div>
        </>
    );
}
