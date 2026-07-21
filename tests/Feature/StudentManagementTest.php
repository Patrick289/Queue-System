<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class StudentManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_register_and_view_students(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('students.store'), [
            'first_name' => 'Juan',
            'last_name' => 'Dela Cruz',
            'student_number' => '123456',
            'phone' => '09171234567',
            'department' => 'Engineering',
            'program' => 'Computer Science',
            'date_of_birth' => '2004-01-15',
            'gender' => 'Male',
            'address' => 'Manila',
        ]);

        $response->assertRedirect(route('students.index'));
        $this->assertDatabaseHas('students', [
            'first_name' => 'Juan',
            'last_name' => 'Dela Cruz',
            'email' => null,
            'student_number' => '123456',
            'is_active' => true,
        ]);

        $this->actingAs($user)
            ->get(route('students.index'))
            ->assertOk();
    }

    public function test_authenticated_user_can_open_and_submit_student_search(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('students.search'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Students/Search')
                ->has('results', 0));

        $this->actingAs($user)
            ->get(route('students.search', ['q' => 'missing']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Students/Search')
                ->where('query', 'missing')
                ->has('results', 0));
    }
}
