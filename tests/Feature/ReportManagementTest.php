<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReportManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_generate_student_and_queue_reports(): void
    {
        $user = User::factory()->create();

        $studentResponse = $this->actingAs($user)->post(route('reports.generate-students'), [
            'title' => 'Students Report',
            'filters' => [],
        ]);

        $studentResponse->assertRedirect();
        $this->assertDatabaseHas('reports', [
            'user_id' => $user->id,
            'title' => 'Students Report',
            'type' => 'students',
        ]);

        $queueResponse = $this->actingAs($user)->post(route('reports.generate-queues'), [
            'title' => 'Queues Report',
        ]);

        $queueResponse->assertRedirect();
        $this->assertDatabaseHas('reports', [
            'user_id' => $user->id,
            'title' => 'Queues Report',
            'type' => 'queues',
        ]);
    }
}
