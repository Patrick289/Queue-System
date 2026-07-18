import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Props {
    user: User;
}

export default function UserEdit({ user }: Props) {
    const { data, setData, patch, delete: destroy, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('users.update', user.id));
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this user?')) {
            destroy(route('users.destroy', user.id));
        }
    };

    return (
        <>
            <Head title="Edit User" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Edit User</h1>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete User
                    </Button>
                </div>

                <Card className="p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
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
                                required
                            />
                            <InputError message={errors.email} />
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
                                {processing ? 'Saving...' : 'Save Changes'}
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
