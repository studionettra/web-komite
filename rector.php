<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;
use Rector\Set\ValueObject\SetList;

return static function (RectorConfig $rectorConfig): void {
    $rectorConfig->paths([
        __DIR__.'/app',
        __DIR__.'/routes',
    ]);

    // Define what rule sets will be applied
    $rectorConfig->sets([
        SetList::TYPE_DECLARATION,
    ]);
};
