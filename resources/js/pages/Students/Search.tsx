import { Head, Link, useForm } from '@inertiajs/react';
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
    results: Student[];
    query: string;
}

export default function StudentSearch({ results, query }: Props) {
    const [searchQuery, setSearchQuery] = useState(query);
    const { post } = useForm({ q: searchQuery });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('students.search'), {
            onSuccess: () => {},
        });
    };

    return (
        <>
            <Head title="Search Students" />

            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Search Students</h1>

                <Card className="p-6">
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <Input
                            placeholder="Search by student number, name, or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            minLength={2}
                        />
                        <Button type="submit">Search</Button>
                    </form>
                </Card>

                {results.length > 0 ? (
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Found {results.length} result{results.length !== 1 ? 's' : ''}
                        </h2>
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
                                    {results.map((student) => (
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
                ) : query ? (
                    <Card className="p-6 bg-blue-50 border border-blue-200">
                        <p className="text-blue-800">No students found for "{query}"</p>
                    </Card>
                ) : (
                    <Card className="p-6 bg-gray-50 border border-gray-200">
                        <p className="text-gray-600">Enter a search term to find students</p>
                    </Card>
                )}
            </div>
        </>
    );
}
