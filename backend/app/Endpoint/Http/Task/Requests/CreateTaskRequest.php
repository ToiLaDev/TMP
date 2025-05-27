<?php

declare(strict_types=1);

namespace App\Endpoint\Http\Task\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'       => 'required|string|max:255',
            'priority'    => 'required|string|in:low,medium,high',
            'status'      => 'required|string|in:active,inactive',
            'project_id' => 'required|integer|exists:projects,id',
            'due_date'    => 'nullable|date_format:Y-m-d H:i:s',
        ];
    }
}