<?php

namespace Tests\Feature\Students;

use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudentStoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_users_can_register_a_student()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('students.store'), [
            'first_name' => 'patrick',
            'last_name' => 'ADALID',
            'email' => 'test1@gmail.com',
            'phone' => '0219209102',
            'department' => 'BSIT',
            'program' => 'BSITEMC',
            'date_of_birth' => '2004-12-21',
            'gender' => 'Male',
            'address' => 'DAVAO CITY',
        ]);

        $response->assertRedirect(route('students.index'));
        $response->assertSessionHas('message', 'Student registered successfully.');

        $this->assertDatabaseHas('students', [
            'first_name' => 'patrick',
            'last_name' => 'ADALID',
            'email' => 'test1@gmail.com',
            'is_active' => true,
        ]);

        $student = Student::firstWhere('email', 'test1@gmail.com');
        $this->assertNotNull($student->student_number);
    }

    public function test_guests_cannot_register_a_student()
    {
        $response = $this->post(route('students.store'), [
            'first_name' => 'patrick',
            'last_name' => 'ADALID',
            'email' => 'test1@gmail.com',
        ]);

        $response->assertRedirect(route('login'));
        $this->assertDatabaseCount('students', 0);
    }
}
