import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Zap, FileText, Settings, BarChart3, Search } from 'lucide-react';
import { dashboard } from '@/routes';

export default function Dashboard() {
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
        {
            title: 'User Management',
            description: 'Manage system users and roles',
            href: route('users.index'),
            icon: Settings,
            color: 'bg-red-100 text-red-600',
        },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-bold">Student Queue Management System</h1>
                    <p className="text-gray-600 mt-2">Welcome to the system dashboard</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.title} href={item.href}>
                                <Card className="p-6 hover:shadow-lg transition h-full">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.title}</h3>
                                            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                                        </div>
                                        <div className={`p-3 rounded-lg ${item.color}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Button variant="outline" size="sm" className="w-full">
                                            Open
                                        </Button>
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                    <h2 className="text-lg font-semibold text-blue-900 mb-4">System Overview</h2>
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <BarChart3 className="w-8 h-8 text-blue-600 mb-2" />
                            <p className="text-sm text-blue-600 font-semibold">Manage Operations</p>
                            <p className="text-xs text-blue-600 mt-1">Register, track, and manage students and queues</p>
                        </div>
                        <div>
                            <FileText className="w-8 h-8 text-blue-600 mb-2" />
                            <p className="text-sm text-blue-600 font-semibold">Generate Reports</p>
                            <p className="text-xs text-blue-600 mt-1">Create detailed reports for analysis</p>
                        </div>
                        <div>
                            <Settings className="w-8 h-8 text-blue-600 mb-2" />
                            <p className="text-sm text-blue-600 font-semibold">Admin Controls</p>
                            <p className="text-xs text-blue-600 mt-1">Manage users and system settings</p>
                        </div>
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
