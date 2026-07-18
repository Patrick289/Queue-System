<?php

namespace App\Http\Controllers\Queues;

use App\Http\Controllers\Controller;
use App\Models\Queue;
use App\Models\QueuePosition;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QueueController extends Controller
{
    public function index()
    {
        $queues = Queue::withCount('positions')->paginate(15);

        return Inertia::render('Queues/Index', [
            'queues' => $queues,
        ]);
    }

    public function show(Queue $queue)
    {
        $positions = $queue->positions()
            ->with('student')
            ->orderBy('position')
            ->paginate(20);

        return Inertia::render('Queues/Show', [
            'queue' => $queue,
            'positions' => $positions,
        ]);
    }

    public function addStudent(Request $request, Queue $queue)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
        ]);

        // Check if student is already in queue
        $existingPosition = QueuePosition::where('queue_id', $queue->id)
            ->where('student_id', $validated['student_id'])
            ->whereIn('status', ['waiting', 'in_progress'])
            ->first();

        if ($existingPosition) {
            return back()->withErrors(['student_id' => 'Student is already in this queue.']);
        }

        $nextPosition = QueuePosition::where('queue_id', $queue->id)
            ->max('position') + 1;

        QueuePosition::create([
            'queue_id' => $queue->id,
            'student_id' => $validated['student_id'],
            'position' => $nextPosition,
            'status' => 'waiting',
            'joined_at' => now(),
        ]);

        return back()->with('message', 'Student added to queue.');
    }

    public function updatePosition(Request $request, QueuePosition $position)
    {
        $validated = $request->validate([
            'status' => 'required|in:waiting,in_progress,completed,cancelled',
        ]);

        $updates = ['status' => $validated['status']];

        if ($validated['status'] === 'in_progress') {
            $updates['started_at'] = now();
        } elseif ($validated['status'] === 'completed') {
            $updates['completed_at'] = now();
        }

        $position->update($updates);

        return back()->with('message', 'Queue position updated.');
    }

    public function removeFromQueue(QueuePosition $position)
    {
        $queue = $position->queue;
        $position->delete();

        // Reorder remaining positions
        $remainingPositions = QueuePosition::where('queue_id', $queue->id)
            ->where('status', '!=', 'completed')
            ->orderBy('position')
            ->get();

        foreach ($remainingPositions as $index => $pos) {
            $pos->update(['position' => $index + 1]);
        }

        return back()->with('message', 'Student removed from queue.');
    }
}
