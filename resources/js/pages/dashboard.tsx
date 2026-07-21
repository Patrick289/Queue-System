import { Head, Link, usePage } from '@inertiajs/react';
import {
    Users,
    Zap,
    FileText,
    Settings,
    BarChart3,
    Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { dashboard } from '@/routes';

export default function Dashboard() {
    const { auth } = usePage().props;
    const isAdmin = auth.user?.role === 'admin';
    const menuItems = [
        {
            title: 'Students',
            description: 'Manage and register students',
            href: route('students.index'),
            icon: Users,
            color: 'bg-blue-100 text-blue-600',
        },
        {
            title: 'Search Students',
            description: 'Find students by number or name',
            href: route('students.search'),
            icon: Search,
            color: 'bg-green-100 text-green-600',
        },
        {
            title: 'Queues',
            description: 'Manage student queues and positions',
            href: route('queues.index'),
            icon: Zap,
            color: 'bg-purple-100 text-purple-600',
        },
        {
            title: 'Reports',
            description: 'Generate and view system reports',
            href: route('reports.index'),
            icon: FileText,
            color: 'bg-orange-100 text-orange-600',
        },
        ...(isAdmin
            ? [
                  {
                      title: 'User Management',
                      description: 'Manage system users and roles',
                      href: route('users.index'),
                      icon: Settings,
                      color: 'bg-red-100 text-red-600',
                  },
              ]
            : []),
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-bold">
                        Student Queue Management System
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Welcome to the system dashboard
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link key={item.title} href={item.href}>
                                <Card className="h-full p-6 transition hover:shadow-lg">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                {item.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div
                                            className={`rounded-lg p-3 ${item.color}`}
                                        >
                                            <Icon className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                        >
                                            Open
                                        </Button>
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                <Card className="border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                    <h2 className="mb-4 text-lg font-semibold text-blue-900">
                        System Overview
                    </h2>
                    <div
                        className={`grid gap-6 ${isAdmin ? 'grid-cols-3' : 'grid-cols-2'}`}
                    >
                        <div>
                            <BarChart3 className="mb-2 h-8 w-8 text-blue-600" />
                            <p className="text-sm font-semibold text-blue-600">
                                Manage Operations
                            </p>
                            <p className="mt-1 text-xs text-blue-600">
                                Register, track, and manage students and queues
                            </p>
                        </div>
                        <div>
                            <FileText className="mb-2 h-8 w-8 text-blue-600" />
                            <p className="text-sm font-semibold text-blue-600">
                                Generate Reports
                            </p>
                            <p className="mt-1 text-xs text-blue-600">
                                Create detailed reports for analysis
                            </p>
                        </div>
                        {isAdmin && (
                            <div>
                                <Settings className="mb-2 h-8 w-8 text-blue-600" />
                                <p className="text-sm font-semibold text-blue-600">
                                    Admin Controls
                                </p>
                                <p className="mt-1 text-xs text-blue-600">
                                    Manage users and system settings
                                </p>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
