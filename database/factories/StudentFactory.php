<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Student>
 */
class StudentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Student>
     */
    protected $model = Student::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $year = now()->year;
        $randomId = fake()->randomNumber(6, false);

        return [
            'student_number' => sprintf('%d-%06d', $year, $randomId),
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
        ];
    }
}
