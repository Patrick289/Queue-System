<?php

namespace App\Http\Controllers\Students;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::paginate(15);

        return Inertia::render('Students/Index', [
            'students' => $students,
        ]);
    }

    public function create()
    {
        return Inertia::render('Students/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'student_number' => ['required', 'string', 'regex:/^\d{6}$/', 'unique:students,student_number'],
            'phone' => 'nullable|string|max:20',
            'department' => 'nullable|string|max:255',
            'program' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

        // Check for duplicate records
        $existingStudent = Student::where('first_name', $validated['first_name'])
            ->where('last_name', $validated['last_name'])
            ->first();

        if ($existingStudent) {
            return back()->withErrors(['student_number' => 'Student record already exists.']);
        }

        $validated['is_active'] = true;

        Student::create($validated);

        return redirect()->route('students.index')->with('message', 'Student registered successfully.');
    }

    public function show(Student $student)
    {
        return Inertia::render('Students/Show', [
            'student' => $student,
        ]);
    }

    public function edit(Student $student)
    {
        return Inertia::render('Students/Edit', [
            'student' => $student,
        ]);
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email,'.$student->id,
            'phone' => 'nullable|string|max:20',
            'department' => 'nullable|string|max:255',
            'program' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

        $student->update($validated);

        return redirect()->route('students.show', $student)->with('message', 'Student updated successfully.');
    }

    public function search(Request $request)
    {
        $query = $request->input('q');

        if (! $query || strlen($query) < 2) {
            return Inertia::render('Students/Search', ['results' => []]);
        }

        $results = Student::whereLike('student_number', "%$query%")
            ->orWhereLike('first_name', "%$query%")
            ->orWhereLike('last_name', "%$query%")
            ->orWhereLike('email', "%$query%")
            ->limit(50)
            ->get();

        return Inertia::render('Students/Search', [
            'results' => $results,
            'query' => $query,
        ]);
    }

    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->route('students.index')->with('message', 'Student deleted successfully.');
    }
}
