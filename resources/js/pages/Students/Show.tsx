import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Student {
    id: number;
    student_number: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    department: string | null;
    program: string | null;
    date_of_birth: string | null;
    gender: string | null;
    address: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    student: Student;
}

export default function StudentShow({ student }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this student?')) {
            destroy(route('students.destroy', student.id));
        }
    };

    return (
        <>
            <Head title={`${student.first_name} ${student.last_name}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        {student.first_name} {student.last_name}
                    </h1>
                    <div className="flex gap-4">
                        <Link href={route('students.edit', student.id)}>
                            <Button>Edit</Button>
                        </Link>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </div>

                <Card className="p-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-gray-600">Student Number</h3>
                            <p className="text-lg font-mono">{student.student_number}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-600">Email</h3>
                            <p className="text-lg">{student.email}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-600">Phone</h3>
                            <p className="text-lg">{student.phone || '-'}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-600">Gender</h3>
                            <p className="text-lg">{student.gender || '-'}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-600">Department</h3>
                            <p className="text-lg">{student.department || '-'}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-600">Program</h3>
                            <p className="text-lg">{student.program || '-'}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-600">Date of Birth</h3>
                            <p className="text-lg">{student.date_of_birth || '-'}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-600">Status</h3>
                            <p className="text-lg">
                                <span
                                    className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                                        student.is_active
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    {student.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </p>
                        </div>

                        {student.address && (
                            <div className="col-span-2">
                                <h3 className="font-semibold text-gray-600">Address</h3>
                                <p className="text-lg whitespace-pre-wrap">{student.address}</p>
                            </div>
                        )}
                    </div>
                </Card>

                <Card className="p-6 bg-gray-50">
                    <h3 className="font-semibold text-gray-600 mb-4">Metadata</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-600">Created:</p>
                            <p>{new Date(student.created_at).toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Updated:</p>
                            <p>{new Date(student.updated_at).toLocaleString()}</p>
                        </div>
                    </div>
                </Card>

                <Link href={route('students.index')}>
                    <Button variant="outline">Back to Students</Button>
                </Link>
            </div>
        </>
    );
}
