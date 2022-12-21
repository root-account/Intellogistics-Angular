<?php
namespace App\Mail;

use App\Qoutes;
use App\Packages;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ReminderEmail extends Mailable {

    use Queueable,
        SerializesModels;

    public $qoutes;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Qoutes $qoutes)
    {
        $this->qoutes = $qoutes;
    }

    //build the message.
    public function build() {
        return $this->view('reminder-email');
    }
}
