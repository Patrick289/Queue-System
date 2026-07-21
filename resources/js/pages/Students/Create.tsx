import { Head, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function StudentCreate() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        student_number: '',
        phone: '',
        department: '',
        program: '',
        date_of_birth: '',
        gender: '',
        address: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('students.store'));
    };

    return (
        <>
            <Head title="Register New Student" />

            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Register New Student</h1>

                <Card className="p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="first_name">First Name</Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData('first_name', e.target.value)
                                    }
                                    placeholder="John"
                                    required
                                />
                                <InputError message={errors.first_name} />
                            </div>

                            <div>
                                <Label htmlFor="last_name">Last Name</Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData('last_name', e.target.value)
                                    }
                                    placeholder="Doe"
                                    required
                                />
                                <InputError message={errors.last_name} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="student_number">
                                    ID Number
                                </Label>
                                <Input
                                    id="student_number"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]{6}"
                                    maxLength={6}
                                    name="student_number"
                                    value={data.student_number}
                                    onChange={(e) =>
                                        setData(
                                            'student_number',
                                            e.target.value
                                                .replace(/\D/g, '')
                                                .slice(0, 6),
                                        )
                                    }
                                    placeholder="000001"
                                    required
                                />
                                <InputError message={errors.student_number} />
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    placeholder="+1 (555) 000-0000"
                                />
                                <InputError message={errors.phone} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="department">Department</Label>
                                <Input
                                    id="department"
                                    name="department"
                                    value={data.department}
                                    onChange={(e) =>
                                        setData('department', e.target.value)
                                    }
                                    placeholder="Computer Science"
                                />
                                <InputError message={errors.department} />
                            </div>

                            <div>
                                <Label htmlFor="program">Program</Label>
                                <Input
                                    id="program"
                                    name="program"
                                    value={data.program}
                                    onChange={(e) =>
                                        setData('program', e.target.value)
                                    }
                                    placeholder="Bachelor of Science"
                                />
                                <InputError message={errors.program} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="date_of_birth">
                                    Date of Birth
                                </Label>
                                <Input
                                    id="date_of_birth"
                                    type="date"
                                    name="date_of_birth"
                                    value={data.date_of_birth}
                                    onChange={(e) =>
                                        setData('date_of_birth', e.target.value)
                                    }
                                />
                                <InputError message={errors.date_of_birth} />
                            </div>

                            <div>
                                <Label htmlFor="gender">Gender</Label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={data.gender}
                                    onChange={(e) =>
                                        setData('gender', e.target.value)
                                    }
                                    className="w-full rounded border border-gray-300 px-3 py-2"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <InputError message={errors.gender} />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="address">Address</Label>
                            <textarea
                                id="address"
                                name="address"
                                value={data.address}
                                onChange={(e) =>
                                    setData('address', e.target.value)
                                }
                                placeholder="Full Address"
                                rows={4}
                                className="w-full rounded border border-gray-300 px-3 py-2"
                            />
                            <InputError message={errors.address} />
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? 'Registering...'
                                    : 'Register Student'}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
}
