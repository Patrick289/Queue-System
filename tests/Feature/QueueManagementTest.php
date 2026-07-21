<?php

namespace Tests\Feature;

use App\Models\Queue;
use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class QueueManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_add_a_student_to_a_queue(): void
    {
        $user = User::factory()->create();
        $queue = Queue::create([
            'name' => 'Registrar',
            'status' => 'active',
        ]);
        $student = Student::create([
            'student_number' => now()->year.'-000001',
            'first_name' => 'Juan',
            'last_name' => 'Dela Cruz',
            'email' => 'juan@example.com',
        ]);

        $response = $this->actingAs($user)->post(route('queues.add-student', $queue), [
            'student_number' => '000001',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('message', 'Student added to queue.');
        $this->assertDatabaseHas('queue_positions', [
            'queue_id' => $queue->id,
            'student_id' => $student->id,
            'position' => 1,
            'status' => 'waiting',
        ]);
    }

    public function test_student_number_must_contain_exactly_six_digits(): void
    {
        $user = User::factory()->create();
        $queue = Queue::create([
            'name' => 'Registrar',
            'status' => 'active',
        ]);

        $response = $this->actingAs($user)
            ->from(route('queues.show', $queue))
            ->post(route('queues.add-student', $queue), [
                'student_number' => '1000000',
            ]);

        $response->assertRedirect(route('queues.show', $queue));
        $response->assertSessionHasErrors('student_number');
        $this->assertDatabaseCount('queue_positions', 0);
    }
}
