<?php

namespace Modules\Registrar\Registrations\Models;

use Illuminate\Database\Eloquent\Model;

class RegisterLoadTags extends Model
{
    protected $table = 'regloadtags';
    protected $primaryKey = 'RegTagID';
    protected $fillable = array(
        'TagCode',
        'TagDescription'
    );
}