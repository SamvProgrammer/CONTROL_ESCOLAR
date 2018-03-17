<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MostrarMensaje extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mostrar:mensaje';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $ds = DIRECTORY_SEPARATOR;
        $host = env('DB_HOST');
        $username = env('DB_USERNAME');
        $password = env('DB_PASSWORD');
        $database = env('DB_DATABASE');
        
        $ts = time();
        $path = database_path() . $ds . 'backups' . $ds . date('Y', $ts) . $ds . date('m', $ts) . $ds . date('d', $ts) . $ds;
        $file = date('Y-m-d-His', $ts) . '-dump-' . $database . '.sql';
       // $command = sprintf('c:\xampp\mysql\bin\mysqldump -h %s -u %s -p\'%s\' %s > %s', $host, $username, $password, $database, $path . $file);
        //$command = sprintf('mysqldump -h 127.0.0.1 -u root -p %s > %s', $database, $path . $file);
         $command = sprintf('c:\xampp\mysql\bin\mysqldump -h %s -u \'%s\' %s > %s', $host, $username,$database, $path . $file);

        if (!is_dir($path)) {
            mkdir($path, 0755, true);
        }
        exec($command);
    }
}
