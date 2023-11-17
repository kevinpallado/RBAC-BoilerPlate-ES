<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
// models
use App\Models\SystemActions;
use App\Models\SystemPages;
use Modules\SystemSettings\User\Models\SystemUser;
use App\Models\SystemUserAccess;
use Modules\SystemSettings\UserGroup\Models\SystemUserGroups;

class RBACSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $actions = ['read','store','update','delete','print'];
        $pages = [
            [
                'module' => 'Students',
                'page' => 'Enrollment',
                'student' => true
            ],
            [
                'module' => 'Students',
                'page' => 'Assessment and Billing',
                'student' => true
            ],
            [
                'module' => 'Students',
                'page' => 'Evaluation',
                'student' => true
            ],
            [
                'module' => 'Students',
                'page' => 'Grades',
                'student' => true
            ],
            [
                'module' => 'Students',
                'page' => 'Subjects Enrolled',
                'student' => true
            ],
            [
                'module' => 'Settings',
                'page' => 'User Group',
            ],
            [
                'module' => 'Settings',
                'page' => 'Users',
            ]
        ];
        $groups = ['Administrator','Students','Faculty','Developer','Customer'];
        $users = [
            [
                'name' => 'Test Developer',
                'email' => 'testdeveloper@mailtrap.io',
                'password' => Hash::make('123456'),
                'administrator' => true,
                'beneficiary' => false,
                'benefactor' => true,
                'university_id' => 00000,
            ],
            [
                'name' => 'Nadzmar Hajal',
                'email' => 'hajal@gmail.com',
                'password' => Hash::make('123456'),
                'administrator' => false,
                'beneficiary' => true,
                'benefactor' => false,
                'university_id' => 20200010859,
            ]
        ];

        foreach($actions as $action) {
            SystemActions::updateOrCreate(
                ['name' => $action],
                [
                    'name' => $action,
                    'slug' => $action
                ]
            );
        }

        foreach($groups as $group) {
            SystemUserGroups::updateOrCreate(
                ['name' => $group],
                [
                    'name' => $group,
                    'slug' => $group
                ]
            );
        }

        foreach($pages as $page) {
            $pageInfo = SystemPages::updateOrCreate(
                ['module' => $page['module'], 'page' => $page['page']],
                [
                    'module' => $page['module'],
                    'module_slug' => $page['module'],
                    'page' => $page['page'],
                    'page_slug' => $page['page']
                ]
            );

            if(array_key_exists('student', $page)) {
                foreach($actions as $action) {
                    SystemUserAccess::updateOrCreate(
                        ['access_type' => 'group', 'access_id' => SystemUserGroups::where("name", 'Students')->value('id'), 'page_id' => $pageInfo->id, 'action' => $action],
                        ['access_type' => 'group', 'access_id' => SystemUserGroups::where("name", 'Students')->value('id'), 'page_id' => $pageInfo->id, 'action' => $action]
                    );
                }
            } else {
                foreach($actions as $action) {
                    SystemUserAccess::updateOrCreate(
                        ['access_type' => 'group', 'access_id' => SystemUserGroups::where("name", 'Administrator')->value('id'), 'page_id' => $pageInfo->id, 'action' => $action],
                        ['access_type' => 'group', 'access_id' => SystemUserGroups::where("name", 'Administrator')->value('id'), 'page_id' => $pageInfo->id, 'action' => $action]
                    );
                }
            }
        }

        foreach($users as $user) {
            SystemUser::updateOrCreate(
                ['name' => $user['name'], 'email' => $user['email']],
                [
                    'name' => $user['name'], 
                    'email' => $user['email'],
                    'password' => $user['password'],
                    'administrator' => $user['administrator'],
                    'university_id' => $user['university_id'],
                    'group_id' => $this->userIdentification($user['administrator'], $user['benefactor'],$user['beneficiary'])
                ]
            );
        }
    }

    public function userIdentification($admin, $benefactor, $beneficiary) {
        if($admin) {
            return SystemUserGroups::where("name", 'Administrator')->value('id');
        } else if(!$admin && $benefactor) {
            return SystemUserGroups::where("name", 'Faculty')->value('id');
        } else if(!$admin && !$benefactor && $beneficiary) {
            return SystemUserGroups::where("name", 'Students')->value('id');
        }
    }
}
