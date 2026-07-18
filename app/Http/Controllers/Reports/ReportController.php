<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\Queue;
use App\Models\Report;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::with('user')
            ->orderByDesc('generated_at')
            ->paginate(15);

        return Inertia::render('Reports/Index', [
            'reports' => $reports,
        ]);
    }

    public function create()
    {
        return Inertia::render('Reports/Create');
    }

    public function generateStudentsReport(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'filters' => 'nullable|array',
        ]);

        $query = Student::query();

        if (isset($validated['filters'])) {
            if (isset($validated['filters']['department'])) {
                $query->where('department', $validated['filters']['department']);
            }
            if (isset($validated['filters']['is_active'])) {
                $query->where('is_active', $validated['filters']['is_active']);
            }
        }

        $data = $query->get(['id', 'student_number', 'first_name', 'last_name', 'email', 'department', 'is_active'])->toArray();

        $report = Report::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'type' => 'students',
            'filters' => $validated['filters'] ?? [],
            'data' => $data,
            'generated_at' => now(),
        ]);

        return redirect()->route('reports.show', $report)->with('message', 'Report generated successfully.');
    }

    public function generateQueuesReport(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $data = Queue::with('positions.student')
            ->get()
            ->map(fn ($queue) => [
                'id' => $queue->id,
                'name' => $queue->name,
                'status' => $queue->status,
                'total_positions' => $queue->positions->count(),
                'waiting_count' => $queue->positions->where('status', 'waiting')->count(),
                'completed_count' => $queue->positions->where('status', 'completed')->count(),
            ])
            ->toArray();

        $report = Report::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'type' => 'queues',
            'data' => $data,
            'generated_at' => now(),
        ]);

        return redirect()->route('reports.show', $report)->with('message', 'Report generated successfully.');
    }

    public function show(Report $report)
    {
        return Inertia::render('Reports/Show', [
            'report' => $report->load('user'),
        ]);
    }

    public function destroy(Report $report)
    {
        $this->authorize('delete', $report);
        $report->delete();

        return redirect()->route('reports.index')->with('message', 'Report deleted successfully.');
    }
}
