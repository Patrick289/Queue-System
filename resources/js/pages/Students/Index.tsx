import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

interface Student {
    id: number;
    student_number: string;
    first_name: string;
    last_name: string;
    email: string;
    department: string | null;
    is_active: boolean;
}

interface Props {
    students: {
        data: Student[];
        links: any;
        meta: any;
    };
}

export default function StudentIndex({ students }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Search functionality would be implemented here
    };

    return (
        <>
            <Head title="Students" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Students</h1>
                    <Link href={route('students.create')}>
                        <Button>Register New Student</Button>
                    </Link>
                </div>

                <Card className="p-6">
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <Input
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button type="submit">Search</Button>
                    </form>
                </Card>

                <Card className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-2 text-left">Student Number</th>
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Email</th>
                                    <th className="px-4 py-2 text-left">Department</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.data.map((student) => (
                                    <tr key={student.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2 font-mono text-sm">{student.student_number}</td>
                                        <td className="px-4 py-2">
                                            {student.first_name} {student.last_name}
                                        </td>
                                        <td className="px-4 py-2">{student.email}</td>
                                        <td className="px-4 py-2">{student.department || '-'}</td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`inline-block px-2 py-1 text-xs rounded ${
                                                    student.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {student.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <Link href={route('students.show', student.id)}>
                                                <Button variant="outline" size="sm">
                                                    View
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </>
    );
}
