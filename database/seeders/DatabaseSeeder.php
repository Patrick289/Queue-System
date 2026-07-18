<?php

namespace Database\Seeders;

use App\Models\Queue;
use App\Models\QueuePosition;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Create staff user
        User::factory()->staff()->create([
            'name' => 'Staff User',
            'email' => 'staff@example.com',
        ]);

        // Create test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create sample students manually
        for ($i = 0; $i < 20; $i++) {
            Student::create([
                'student_number' => sprintf('%d-%06d', now()->year, $i + 1),
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'email' => fake()->unique()->safeEmail(),
                'phone' => fake()->phoneNumber(),
                'department' => fake()->randomElement(['Computer Science', 'Business', 'Engineering', 'Education', 'Science']),
                'program' => fake()->randomElement(['Bachelor of Science', 'Bachelor of Arts', 'Bachelor of Engineering']),
                'date_of_birth' => fake()->dateTimeBetween('-25 years', '-18 years')->format('Y-m-d'),
                'gender' => fake()->randomElement(['Male', 'Female', 'Other']),
                'address' => fake()->address(),
                'is_active' => true,
            ]);
        }

        // Create sample queues
        $registrationQueue = Queue::create([
            'name' => 'Registration Queue',
            'description' => 'Student registration and enrollment queue',
            'max_capacity' => 30,
            'status' => 'active',
        ]);

        $supportQueue = Queue::create([
            'name' => 'Student Support Queue',
            'description' => 'Student support and assistance queue',
            'max_capacity' => 20,
            'status' => 'active',
        ]);

        $counselingQueue = Queue::create([
            'name' => 'Counseling Queue',
            'description' => 'Academic and personal counseling queue',
            'max_capacity' => 15,
            'status' => 'active',
        ]);

        // Add students to queues
        $students = Student::all();
        foreach ($students->take(10) as $index => $student) {
            QueuePosition::create([
                'queue_id' => $registrationQueue->id,
                'student_id' => $student->id,
                'position' => $index + 1,
                'status' => 'waiting',
                'joined_at' => now(),
            ]);
        }

        foreach ($students->slice(10, 5) as $index => $student) {
            QueuePosition::create([
                'queue_id' => $supportQueue->id,
                'student_id' => $student->id,
                'position' => $index + 1,
                'status' => 'waiting',
                'joined_at' => now(),
            ]);
        }

        foreach ($students->slice(15, 5) as $index => $student) {
            QueuePosition::create([
                'queue_id' => $counselingQueue->id,
                'student_id' => $student->id,
                'position' => $index + 1,
                'status' => 'waiting',
                'joined_at' => now(),
            ]);
        }
    }
}
