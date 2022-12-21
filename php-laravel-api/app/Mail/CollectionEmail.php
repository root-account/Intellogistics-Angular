<?php
namespace App\Mail;

use App\Qoutes;
use App\Packages;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class CollectionEmail extends Mailable {

    use Queueable,
        SerializesModels;

    public $qoutes;
    public $packages;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Qoutes $qoutes, Packages $packages)
    {
        $this->qoutes = $qoutes;
        $this->packages = $packages;
    }

    //build the message.
    public function build() {
        return $this->view('collection-email');
    }
}
