import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';

export default function UserCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('users.store'));
    };

    return (
        <>
            <Head title="Create User" />

            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Create New User</h1>

                <Card className="p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="John Doe"
                                required
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="john@example.com"
                                required
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div>
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="role">Role</Label>
                            <select
                                id="role"
                                name="role"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="w-full rounded border border-gray-300 px-3 py-2"
                            >
                                <option value="user">User</option>
                                <option value="staff">Staff</option>
                                <option value="admin">Admin</option>
                            </select>
                            <InputError message={errors.role} />
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create User'}
                            </Button>
                            <Button variant="outline" onClick={() => window.history.back()}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
}
