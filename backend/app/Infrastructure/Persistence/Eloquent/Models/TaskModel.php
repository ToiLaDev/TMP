<?php

namespace App\Infrastructure\Persistence\Eloquent\Models;

use Illuminate\Database\Eloquent\Model;

class TaskModel extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tasks';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'due_date',
        'priority',
        'status',
        'project_id',
    ];

    public function project()
    {
        return $this->belongsTo(ProjectModel::class);
    }
}
